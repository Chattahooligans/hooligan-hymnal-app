import React from 'react';
import {
  Animated,
  Linking,
  Platform,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Asset, LinearGradient, Notifications, WebBrowser, Video } from 'expo';
import { BigButton } from '../components/BigButton';
import { NavigationActions } from 'react-navigation';
import { View as AnimatableView } from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { getPost } from '../services/feedService';

import AnimatedScrollView from '../components/AnimatedScrollView';
import NavigationBar from '../components/NavigationBar';
import MenuButton from '../components/MenuButton';
import VideoBackground from '../components/VideoBackground';
import SocialButtonPanel from '../components/SocialButtonPanel';
import HomeBannersPanel from '../components/HomeBannersPanel';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import Post from '../components/Post';
import { FontSizes, Layout, Colors } from '../constants';
import Constants from 'expo-constants';

import appParams from '../../app.json';

import {
  Palette,
  DefaultColors,
  Skin,
  banners,
  socialButtons,
  WEBSITE_URL,
  HOME_SCREEN_NAVBAR,
  HOME_SCREEN_VIDEO_OVERLAY,
} from '../config/Settings';
import i18n from "../../i18n";
import { watchPositionAsync } from 'expo-location';

class Home extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
    refreshing: false
  };

  static navigationOptions = {
    drawerLabel: i18n.t('navigation.home'),
    header: null
  };

  async componentDidMount() {
    if (!this.props.globalData.state.loadDataComplete)
      await this.props.globalData.loadData();
    else
      this.onRefresh()

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = async (notification) => {
    //console.log("notification " + notification.origin + ", data: " + JSON.stringify(notification.data))

    if (notification.origin === 'selected') {
      // notification was tapped, either from the app already open or from entering the app

      if (notification.data.postId) {
        let post = await getPost(notification.data.postId)
        this.props.navigation.navigate("SinglePost", { post });
      }

      // classic Song notifications for users without the update, deprecate this soon
      if (notification.data.song) {
        this.props.navigation.navigate('SingleSong', {
          song: notification.data.song
        });
      }
    } else if (notification.origin === 'received') {
      // notification was received, either app was already open or it just opened up but not from the notification
      // We don't necessarily want to do anything in this case

      if (notification.data.postId) {
        // refresh the feed data itself
        this.onRefresh()

        let post = await getPost(notification.data.postId)
        this.props.navigation.navigate("SinglePost", { post });
      }
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });

    await this.props.globalData.refreshFeed();

    this.setState({ refreshing: false });
  }

  render() {
    const { scrollY } = this.state;
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, backgroundColor: Skin.Home_BackgroundColor }}>
        <AnimatedScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 + Layout.notchHeight / 2 }}
          scrollEventThrottle={1}
          onScroll={
            Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } }
                }
              ],
              {
                useNativeDriver: true,
                listener: (event) => {
                  if ((event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >
                    (event.nativeEvent.contentSize.height - 20)) &&
                    event.nativeEvent.velocity.y > 0)
                    console.log("At bottom, load the next page of posts (if it's not already loading)")
                }
              }
            )
          }
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
        >
          <View
            style={{
              backgroundColor: Palette.Navy,
              padding: 8,
              paddingTop: Layout.headerHeight - 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={styles.headerVideoLayer}>
              <VideoBackground />
              <View style={styles.headerVideoOverlay} />
            </View>
            <Image
              source={HOME_SCREEN_VIDEO_OVERLAY}
              style={{ height: 100, resizeMode: 'contain', marginTop: 20 }}
              tintColor={DefaultColors.HeaderText}
            />
            <View style={styles.headerContent}>
              <RegularText style={styles.headerText}>
                {appParams.expo.version}
              </RegularText>
            </View>
          </View>

          <DeferredHomeContent globalData={this.props.globalData} />
          <OverscrollView />
        </AnimatedScrollView>

        <NavigationBar
          renderLeftButton={() => <MenuButton />}
          renderTitle={() =>
            <Image
              source={HOME_SCREEN_NAVBAR}
              style={{ height: Layout.headerHeight - (Constants.statusBarHeight / 2), width: Layout.window.width, resizeMode: 'contain' }}
              tintColor={DefaultColors.HeaderText} />
          }
          animatedBackgroundOpacity={headerOpacity}
        />
      </View>
    );
  }
}

class StaticHomeContent_Buttons extends React.Component {
  _handlePressSongbook = () => { this.props.navigation.navigate('Songbook') }

  _handlePressRoster = () => { this.props.navigation.navigate('Roster') }

  render() {
    // "find the menu" instructions polish
    let findTheMenu = i18n.t('screens.home.findthemenu')
    let firstPart = findTheMenu.substring(0, findTheMenu.indexOf('%menuicon%'))
    let secondPart = findTheMenu.substring(findTheMenu.indexOf('%menuicon%') + '%menuicon%'.length)
    let findTheMenuText = <MediumText style={{ color: Skin.Home_FindTheMenuLabel, fontSize: FontSizes.bodyLarge, marginTop: 5 }}>
      {firstPart}
      <Ionicons
        name="md-menu"
        size={FontSizes.bodyLarge}
        style={{ backgroundColor: 'transparent', marginRight: 5 }} />
      {secondPart}
    </MediumText>

    return (
      <View style={styles.staticButtonsContainer}>
        <BigButton
          style={{ backgroundColor: Skin.Home_BigButtonsBackground }} tintColor={Skin.Home_BigButtonsLabel}
          label={i18n.t('screens.home.songbook')} iconName="md-book"
          onPress={this._handlePressSongbook} />
        <BigButton
          style={{ backgroundColor: Skin.Home_BigButtonsBackground }} tintColor={Skin.Home_BigButtonsLabel}
          label={i18n.t('screens.home.roster')} iconName="md-people"
          onPress={this._handlePressRoster} />
        <View style={{ marginHorizontal: 15, flexDirection: i18n.getFlexDirection() }}>
          {findTheMenuText}
        </View>
      </View>
    )
  }
}

class StaticHomeContent_Links extends React.Component {
  render() {
    return (
      <View style={styles.staticLinksContainer}>
        <TouchableOpacity style={{ flexDirection: i18n.getFlexDirection(), marginHorizontal: 15, marginBottom: 10 }} onPress={() => { Linking.openURL(WEBSITE_URL) }}>
          <MediumText style={{ color: Skin.Home_SocialButtons }}>{i18n.t('screens.home.visit')} </MediumText>
          <UnderlineText style={{ color: Skin.Home_Website }}>{WEBSITE_URL}</UnderlineText>
        </TouchableOpacity>
        <SocialButtonPanel style={{ paddingHorizontal: 15 }} config={socialButtons} />
      </View>
    )
  }
}

class StaticHomeContent extends React.Component {
  render() {
    return (
      <View>
        <StaticHomeContent_Buttons />
        <StaticHomeContent_Links />
      </View>
    )
  }
}

@withNavigation
class DeferredHomeContent extends React.Component {
  state = {
    ready: Platform.OS === 'android' ? false : true
  };

  componentDidMount() {
    if (this.props.globalData.state.pushToken == null)
      this.props.globalData.registerForPushNotificationsAsync();

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
    posts.forEach((post) => {
      let postDisplay = <Post key={post._id} post={post} navigation={this.props.navigation} />
      scrollItems.push(postDisplay);
    })

    // for some reason this doesn't blow up when scrollItems.length is small or zero
    scrollItems.splice(0, 0, <HomeBannersPanel key={"homeBanners"} config={banners} />)
    scrollItems.splice(2, 0, <StaticHomeContent_Buttons key={"homeButtons"} navigation={this.props.navigation} />)
    scrollItems.splice(4, 0, <StaticHomeContent_Links key={"homeLinks"} />)

    //scrollItems.splice(2, 0, <StaticHomeContent />)

    return (
      <AnimatableView animation="fadeIn" useNativeDriver duration={800}>
        {/*
        <HomeBannersPanel config={banners} />
        <UpNext
          songs={this.props.globalData.state.songs}
          songbook={this.props.globalData.state.songbook}
          style={{ marginTop: 20, marginHorizontal: 15, marginBottom: 2 }}
        />
        <StaticHomeContent />
        */}
        {scrollItems}
      </AnimatableView>
    );
  }
}

const OverscrollView = () => (
  <View
    style={{
      position: 'absolute',
      top: -400,
      height: 400,
      left: 0,
      right: 0,
      backgroundColor: Palette.Navy
    }}
  />
);

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
    width: 100 + '%',
    marginTop: 5
  },
  headerVideoLayer: {
    ...StyleSheet.absoluteFillObject
  },
  headerVideoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Palette.Navy,
    opacity: 0.8
  },
  headerText: {
    color: DefaultColors.HeaderText,
    fontSize: 14
  },
  staticButtonsContainer: {
    backgroundColor: Palette.White,
    marginTop: Skin.Home_PostMarginVertical,
    paddingBottom: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#eee"
  },
  staticLinksContainer: {
    backgroundColor: Palette.White,
    marginTop: Skin.Home_PostMarginVertical,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#eee"
  },
});

export default withUnstated(Home, { globalData: GlobalDataContainer });
