import React from "react";
import {
  ActivityIndicator,
  Animated,
  Linking,
  Platform,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Asset, LinearGradient, Notifications, WebBrowser, Video } from "expo";
import { BigButton } from "../components/BigButton";
import { View as AnimatableView } from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import { getPost, engageNotification } from "../services/feedService";

import AnimatedScrollView from "../components/AnimatedScrollView";
import NavigationBar from "../components/NavigationBar";
import MenuButton from "../components/MenuButton";
import HomeHeroImage from "../components/HomeHeroImage";
import HomeVideoPanel from "../components/HomeVideoPanel";
import SocialButtonPanel from "../components/SocialButtonPanel";
import HomeBannersPanel from "../components/HomeBannersPanel";
import PrideraiserCampaignSummary from "../components/PrideraiserCampaignSummary";
import {
  BoldText,
  MediumText,
  RegularText,
  UnderlineText,
} from "../components/StyledText";
import { ModalLoader } from "../components/ModalLoader";
import Post from "../components/Post";
import { FontSizes, Layout, Colors } from "../constants";
import Constants from "expo-constants";
import { openURL } from "../utils/LinkHelper.js";
import {
  DefaultColors,
  Settings,
  Skin,
  Banners,
  SocialButtons,
  Urls,
} from "../../config";
import i18n from "../i18n";
import { watchPositionAsync } from "expo-location";

class Home extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
    refreshing: false,
    loadingMore: false,
  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      header: null,
    });

    if (this.props.globalData.state.pushToken == null)
      await this.props.globalData.registerForPushNotificationsAsync();

    if (!this.props.globalData.state.loadDataComplete) {
      // shot refresh indicator on initial load
      this.setState({ refreshing: true });
      await this.props.globalData.loadData();
      this.setState({ refreshing: false });
    } else this.onRefresh();

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = async (notification) => {
    //console.log("notification " + notification.origin + ", data: " + JSON.stringify(notification.data))

    if (notification.origin === "selected") {
      // notification was tapped, either from the app already open or from entering the app

      if (notification.data.postId) {
        engageNotification(
          notification.data.postId,
          this.props.globalData.state.pushToken
        );

        try {
          let post = await getPost(notification.data.postId);
          if (post)
            if (post.active)
              this.props.navigation.navigate("SinglePost", { post });
        } catch (e) {
          //
        }
      }

      // classic Song notifications for users without the update, deprecate this soon
      if (notification.data.song) {
        this.props.navigation.navigate("SingleSong", {
          song: notification.data.song,
        });
      }
    } else if (notification.origin === "received") {
      // notification was received, either app was already open or it just opened up but not from the notification
      /*
      if (notification.data.postId) {
        // refresh the feed data itself
        this.onRefresh()

        let post = await getPost(notification.data.postId)
        this.props.navigation.navigate("SinglePost", { post });
      }
      */
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });

    await this.props.globalData.refreshFeed();

    this.setState({ refreshing: false });
  };

  onLoadMore = async () => {
    // don't load more if we're already loading
    if (this.state.loadingMore === false) {
      this.setState({ loadingMore: true });

      await this.props.globalData.loadMoreFeed();

      this.setState({ loadingMore: false });
    }
  };

  render() {
    const { scrollY } = this.state;
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    let heroComponent;
    switch (Settings.Home_HeroContent) {
      case "video":
        heroComponent = <HomeVideoPanel />;
        break;
      case "prideraiser":
        heroComponent = (
          <PrideraiserCampaignSummary key={"prideraiserCampaignSummary"} />
        );
        break;
      case "image":
        heroComponent = <HomeHeroImage />;
        break;
      default:
        heroComponent = null;
    }

    return (
      <View style={{ flex: 1, backgroundColor: Skin.Home_BackgroundColor }}>
        <AnimatedScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 + Layout.notchHeight / 2 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: (event) => {
                if (
                  event.nativeEvent.layoutMeasurement.height +
                    event.nativeEvent.contentOffset.y >
                    event.nativeEvent.contentSize.height - 20 &&
                  event.nativeEvent.contentOffset.y +
                    event.nativeEvent.contentSize.height >
                    event.nativeEvent.contentSize.height
                ) {
                  this.onLoadMore();
                }
              },
            }
          )}
          refreshControl={
            Platform.OS === "ios" ? (
              <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
            ) : (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                progressBackgroundColor={Skin.Home_RefreshBackground_Android}
                colors={[Skin.Home_Refresh_Android]}
              />
            )
          }
        >
          {this.state.refreshing && Platform.OS == "ios" && (
            <View style={{ paddingTop: Constants.statusBarHeight }}>
              <ActivityIndicator
                animating={true}
                size="large"
                color={Skin.Home_LoadMoreActivityIndicator_iOS}
              />
            </View>
          )}

          {heroComponent}

          <DeferredHomeContent
            globalData={this.props.globalData}
            navigation={this.props.navigation}
          />
          <View
            style={{
              flex: 1,
              flexDirection: i18n.getFlexDirection(),
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            {this.state.loadingMore && (
              <ActivityIndicator
                animating={true}
                size="large"
                color={
                  Platform.OS === "ios"
                    ? Skin.Home_LoadMoreActivityIndicator_iOS
                    : Skin.Home_LoadMoreActivityIndicator_Android
                }
              />
            )}
          </View>
          <OverscrollView />
          <ModalLoader
            loading={!this.props.globalData.state.loadDataComplete}
          />
        </AnimatedScrollView>

        <NavigationBar
          renderLeftButton={() => <MenuButton />}
          renderTitle={() => (
            <Image
              source={Skin.Home_NavbarLogo}
              style={{
                height: Layout.headerHeight - Constants.statusBarHeight / 2,
                width: Layout.window.width,
                resizeMode: "contain",
              }}
            />
          )}
          animatedBackgroundOpacity={headerOpacity}
        />
      </View>
    );
  }
}

class StaticHomeContent_Buttons extends React.Component {
  _handlePressSongbook = () => {
    this.props.navigation.navigate("Songbook");
  };

  _handlePressRoster = () => {
    this.props.navigation.navigate("Roster");
  };

  render() {
    // "find the menu" instructions polish
    let findTheMenu = i18n.t("screens.home.findthemenu");
    let firstPart = findTheMenu.substring(0, findTheMenu.indexOf("%menuicon%"));
    let secondPart = findTheMenu.substring(
      findTheMenu.indexOf("%menuicon%") + "%menuicon%".length
    );
    let findTheMenuText = (
      <MediumText
        style={{
          color: Skin.Home_FindTheMenuLabel,
          fontSize: FontSizes.bodyLarge,
          marginTop: 5,
        }}
      >
        {firstPart}
        <MaterialCommunityIcons
          name="menu"
          size={FontSizes.bodyLarge}
          style={{ backgroundColor: "transparent", marginRight: 5 }}
        />
        {secondPart}
      </MediumText>
    );

    return (
      <View style={styles.staticButtonsContainer}>
        <BigButton
          buttonStyle={{ backgroundColor: Skin.Home_BigButtonsBackground }}
          tintColor={Skin.Home_BigButtonsLabel}
          label={i18n.t("screens.home.songbook")}
          iconName={Skin.Icon_Songbook}
          onPress={this._handlePressSongbook}
        />
        <BigButton
          buttonStyle={{ backgroundColor: Skin.Home_BigButtonsBackground }}
          tintColor={Skin.Home_BigButtonsLabel}
          label={i18n.t("screens.home.roster")}
          iconName={Skin.Icon_Roster}
          onPress={this._handlePressRoster}
        />
        <View
          style={{
            marginHorizontal: 15,
            flexDirection: i18n.getFlexDirection(),
          }}
        >
          {findTheMenuText}
        </View>
      </View>
    );
  }
}

class StaticHomeContent_Links extends React.Component {
  render() {
    return (
      <View style={styles.staticLinksContainer}>
        <TouchableOpacity
          style={{
            flexDirection: i18n.getFlexDirection(),
            marginHorizontal: 15,
            marginBottom: 10,
          }}
          onPress={() => {
            openURL(Urls.Website);
          }}
        >
          <MediumText style={{ color: Skin.Home_SocialButtons }}>
            {i18n.t("screens.home.visit")}{" "}
          </MediumText>
          <UnderlineText style={{ color: Skin.Home_Website }}>
            {Urls.Website}
          </UnderlineText>
        </TouchableOpacity>
        <SocialButtonPanel
          style={{ paddingHorizontal: 15 }}
          config={SocialButtons}
        />
      </View>
    );
  }
}

class StaticHomeContent extends React.Component {
  render() {
    return (
      <View>
        <StaticHomeContent_Buttons />
        <StaticHomeContent_Links />
      </View>
    );
  }
}

class DeferredHomeContent extends React.Component {
  state = {
    ready: Platform.OS === "android" ? false : true,
  };

  componentDidMount() {
    if (this.state.ready) {
      return;
    }

    setTimeout(() => {
      this.setState({ ready: true });
    }, 200);
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    let scrollItems = [];
    const posts = this.props.globalData.state.feed;
    posts.forEach((post, index) => {
      if (0 === index && Skin.Post_CollapseTextExpandFirstInFeed)
        scrollItems.push(
          <Post
            key={post._id}
            post={post}
            navigation={this.props.navigation}
            expand={true}
          />
        );
      else
        scrollItems.push(
          <Post key={post._id} post={post} navigation={this.props.navigation} />
        );
    });

    // for some reason this doesn't blow up when scrollItems.length is small or zero
    let buttonsIndex = 2;
    let linksIndex = 4;
    scrollItems.splice(
      0,
      0,
      <HomeBannersPanel key={"homeBanners"} config={Banners} />
    );
    scrollItems.splice(
      buttonsIndex,
      0,
      <StaticHomeContent_Buttons
        key={"homeButtons"}
        navigation={this.props.navigation}
      />
    );
    scrollItems.splice(
      linksIndex,
      0,
      <StaticHomeContent_Links key={"homeLinks"} />
    );

    return (
      <AnimatableView animation="fadeIn" useNativeDriver duration={800}>
        {scrollItems}
      </AnimatableView>
    );
  }
}

const OverscrollView = () => (
  <View
    style={{
      position: "absolute",
      top: -400,
      height: 400,
      left: 0,
      right: 0,
      backgroundColor: DefaultColors.HeaderBackground,
    }}
  />
);

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: "flex-end",
    width: 100 + "%",
    marginTop: 5,
  },
  staticButtonsContainer: {
    backgroundColor: DefaultColors.Background,
    marginBottom: Skin.Home_PostMarginVertical,
    paddingBottom: 5,
    marginHorizontal: Skin.Post_ContainerMarginHorizontal,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#eee",
  },
  staticLinksContainer: {
    backgroundColor: DefaultColors.Background,
    marginBottom: Skin.Home_PostMarginVertical,
    paddingVertical: 5,
    marginHorizontal: Skin.Post_ContainerMarginHorizontal,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#eee",
  },
});

export default withUnstated(Home, { globalData: GlobalDataContainer });
