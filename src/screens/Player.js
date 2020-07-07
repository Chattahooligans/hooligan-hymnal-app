import React from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from "react-native";

import Constants from "expo-constants";
import FadeIn from "react-native-fade-in-image";
import { HeaderBackButton } from "@react-navigation/stack";
import { View as AnimatableView } from "react-native-animatable";
import ParsedText from "react-native-parsed-text";
import {
  parsePatterns,
  parsedStyles,
  renderBoldItalic,
  onUrlPress,
  onEmailPress,
} from "../components/ParsedTextHelper";
import _ from "lodash";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";

import AnimatedScrollView from "../components/AnimatedScrollView";
import NavigationBar from "../components/NavigationBar";
import { FontSizes, Layout } from "../constants";
import { RegularText, BoldText, MediumText } from "../components/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SongCard from "../components/SongCard";
import { openURL } from "../utils/LinkHelper.js";
import { Skin, DefaultColors, Settings } from "../../config";
import i18n from "../i18n";

class Player extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
    playerSongs: [],
  };

  componentDidMount() {
    /*
    this.props.navigation.setOptions({
      header: null,
    });
    */

    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.songs &&
        this.props.globalData.state.songs) ||
      (!prevProps.globalData.state.players &&
        this.props.globalData.state.players)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let player = this.props.route.params.player;
    let playerSongs = [];
    playerSongs = this.props.globalData.state.songs.filter(
      (song) => song.playerId === player._id
    );

    this.setState({ playerSongs });
  };

  render() {
    let player = this.props.route.params.player;
    // console.log('player details window for ', player);

    let playerSocialDisplay;
    let playerSocialIcons = [];

    let showPlayerSongs = true;
    if (Settings.hasOwnProperty("Player_ShowSongs"))
      showPlayerSongs = Settings.Player_ShowSongs;
    if (
      player.hasOwnProperty("showPlayerSongs") &&
      player.showPlayerSongs == false
    )
      showPlayerSongs = false;

    if (player.twitter) {
      playerSocialIcons.push(
        <TouchableOpacity
          key={"player-twitter-" + player.twitter}
          onPress={() => {
            openURL("http://twitter.com/" + player.twitter);
          }}
        >
          <MaterialCommunityIcons
            name={"twitter"}
            size={30}
            style={{
              color: "white",
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
      );
    }
    if (player.instagram) {
      playerSocialIcons.push(
        <TouchableOpacity
          key={"player-instagram-" + player.instagram}
          onPress={() => {
            openURL("http://instagram.com/" + player.instagram);
          }}
        >
          <MaterialCommunityIcons
            name={"instagram"}
            size={30}
            style={{
              color: "white",
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
      );
    }

    if (playerSocialIcons.length > 0) {
      playerSocialDisplay = (
        <View style={{ flexDirection: i18n.getFlexDirection() }}>
          {playerSocialIcons}
        </View>
      );
    }

    let playerSongDisplay;

    let playerImage = Skin.Player_DefaultImage;
    if (player.defaultImage) playerImage = { uri: player.defaultImage };
    if (player.images && player.images.length > 0)
      playerImage = { uri: player.images[0] };

    if (this.state.playerSongs.length === 0) {
      playerSongDisplay = (
        <View>
          <MediumText style={styles.sectionHeader}>
            {i18n.t("screens.player.playersongs")}
          </MediumText>
          <RegularText style={styles.bodyText}>
            {i18n.t("screens.player.stilllooking")}
          </RegularText>
        </View>
      );
    } else {
      playerSongDisplay = (
        <View>
          <MediumText style={styles.sectionHeader}>
            {i18n.t("screens.player.playersongs")}
          </MediumText>
          <FlatList
            data={this.state.playerSongs}
            renderItem={this._renderSongCard}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }

    const { scrollY } = this.state;
    const scale = scrollY.interpolate({
      inputRange: [-300, 0, 1],
      outputRange: [2, 1, 1],
      extrapolate: "clamp",
    });
    const translateX = 0;
    const translateY = scrollY.interpolate({
      inputRange: [-300, 0, 1],
      outputRange: [-50, 1, 1],
      extrapolate: "clamp",
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 30, 200],
      outputRange: [0, 0, 1],
    });

    return (
      <View style={{ flex: 1, backgroundColor: Skin.Player_Background }}>
        {Platform.OS === "ios" ? (
          <Animated.View
            style={{
              position: "absolute",
              top: -350,
              left: 0,
              right: 0,
              height: 400,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [1, 0, 0],
                  }),
                },
              ],
              backgroundColor: Skin.Player_TopContainerBackground,
            }}
          />
        ) : null}
        <AnimatedScrollView
          style={{ flex: 1, backgroundColor: "transparent" }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.headerContainer}>
            <Animated.View
              style={{
                transform: [{ scale }, { translateX }, { translateY }],
              }}
            >
              <FadeIn>
                <Image
                  source={playerImage}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </FadeIn>
            </Animated.View>
            <View style={{ flexDirection: i18n.getFlexDirection() }}>
              <BoldText style={styles.headerText}>
                {player.squadNumber}{" "}
              </BoldText>
              <MediumText style={styles.headerText}>{player.name}</MediumText>
              <RegularText> {player.flag}</RegularText>
            </View>
            <RegularText style={styles.headerText}>
              {i18n.t("positions." + player.position)}
            </RegularText>
            {playerSocialDisplay}
          </View>
          <AnimatableView
            animation="fadeIn"
            useNativeDriver
            delay={Platform.OS === "ios" ? 50 : 150}
            duration={500}
            style={styles.content}
          >
            <MediumText style={styles.sectionHeader}>
              {i18n.t("screens.player.bio")}
            </MediumText>
            <ParsedText
              parse={[
                { type: "url", style: parsedStyles.url, onPress: onUrlPress },
                {
                  type: "email",
                  style: parsedStyles.url,
                  onPress: onEmailPress,
                },
                {
                  pattern: parsePatterns.bold,
                  style: parsedStyles.bold,
                  renderText: renderBoldItalic,
                },
                {
                  pattern: parsePatterns.italic,
                  style: parsedStyles.italic,
                  renderText: renderBoldItalic,
                },
              ]}
              style={styles.bodyText}
            >
              {i18n.getLocalizedBio(player.bio)}
            </ParsedText>
            {showPlayerSongs && playerSongDisplay}
          </AnimatableView>
        </AnimatedScrollView>

        <NavigationBar
          animatedBackgroundOpacity={headerOpacity}
          paddingTop={0}
          style={[
            { paddingTop: 0 },
            Platform.OS === "android"
              ? { height: Layout.headerHeight + Constants.statusBarHeight }
              : null,
          ]}
          renderLeftButton={() => (
            <View
              style={{
                paddingTop: 10,
                marginTop: Layout.notchHeight > 0 ? -5 : 0,
              }}
            >
              <HeaderBackButton
                onPress={() => this.props.navigation.goBack()}
                tintColor={DefaultColors.HeaderText}
                title={null}
              />
            </View>
          )}
        />
      </View>
    );
  }

  _renderSongCard = ({ item }) => {
    return (
      <SongCard
        navigation={this.props.navigation}
        headerTitle={i18n.t("screens.player.playersongheader")}
        navigationToScreen="SingleSong"
        key={item._id}
        song={item}
        style={{ borderBottomWidth: 1, borderColor: "#eee" }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 0,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: Skin.Player_TopContainerBackground,
    paddingTop: Constants.statusBarHeight + Layout.notchHeight,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: DefaultColors.HeaderText,
    fontSize: FontSizes.subtitle,
  },
  bodyText: {
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection(),
  },
  sectionHeader: {
    fontSize: FontSizes.bodyTitle,
    marginTop: 15,
    marginBottom: 3,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection(),
  },
});

export default withUnstated(Player, { globalData: GlobalDataContainer });
