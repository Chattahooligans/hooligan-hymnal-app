import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View
} from 'react-native';

import SongView from '../components/SongView';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import FadeIn from 'react-native-fade-in-image';
import ReadMore from 'react-native-read-more-text';
import { BorderlessButton } from 'react-native-gesture-handler';
import { HeaderBackButton } from 'react-navigation';
import { View as AnimatableView } from 'react-native-animatable';
import ParsedText from 'react-native-parsed-text';
import _ from 'lodash';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import AnimatedScrollView from '../components/AnimatedScrollView';
import NavigationBar from '../components/NavigationBar';
import { FontSizes, Icons, Layout } from '../constants';
import { RegularText, BoldText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import SongCard from '../components/SongCard';
import { Skin, DefaultColors, Palette, Settings } from '../config/Settings';
import i18n from "../../i18n";

class Player extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scrollY: new Animated.Value(0),
    playerSongs: []
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.songs &&
      this.props.globalData.state.songs ||
      !prevProps.globalData.state.players &&
      this.props.globalData.state.players
    ) {
      this.setData();
    }
  }

  setData = () => {
    let player = this.props.navigation.state.params.player;
    let playerSongs = [];
    playerSongs = this.props.globalData.state.songs.filter(song => song.player_id === player._id)

    this.setState({ playerSongs });
  }

  render() {
    let player = this.props.navigation.state.params.player;
    // console.log('player details window for ', player);

    let playerSocialDisplay;
    let playerSocialIcons = [];

    if (player.twitter) {
      playerSocialIcons.push(
        <TouchableOpacity
          key={player.twitter}
          onPress={() => {
            //WebBrowser.openBrowserAsync('http://twitter.com/' + player.twitter);
            Linking.openURL('http://twitter.com/' + player.twitter);
          }}
        >
          <Ionicons
            name={'logo-twitter'}
            size={30}
            style={{
              color: 'white',
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'transparent'
            }}
          />
        </TouchableOpacity>
      );
    }
    if (player.instagram) {
      playerSocialIcons.push(
        <TouchableOpacity
          key={player.instagram}
          onPress={() => {
            //WebBrowser.openBrowserAsync('http://instagram.com/' + player.instagram);
            Linking.openURL('http://instagram.com/' + player.instagram);
          }}
        >
          <Ionicons
            name={'logo-instagram'}
            size={30}
            style={{
              color: 'white',
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'transparent'
            }}
          />
        </TouchableOpacity>
      );
    }

    if (playerSocialIcons.length > 0) {
      playerSocialDisplay = <View style={{ flexDirection: 'row' }}>{playerSocialIcons}</View>
    }

    let playerSongDisplay;

    let playerImage = Skin.Player_DefaultImage;
    if (player.defaultImage)
      playerImage = {uri: player.defaultImage};
    if (player.image)
      playerImage = {uri: player.image};

    if (this.state.playerSongs.length === 0) {
      playerSongDisplay = (
        <View>
          <MediumText style={styles.sectionHeader}>{i18n.t('screens.player.playersongs')}</MediumText>
          <RegularText style={styles.bodyText}>
          {i18n.t('screens.player.stilllooking')}
          </RegularText>
        </View>
      );
    } else {
      playerSongDisplay = (
        <View>
          <MediumText style={styles.sectionHeader}>{i18n.t('screens.player.playersongs')}</MediumText>
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
      extrapolate: 'clamp'
    });
    const translateX = 0;
    const translateY = scrollY.interpolate({
      inputRange: [-300, 0, 1],
      outputRange: [-50, 1, 1],
      extrapolate: 'clamp'
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 30, 200],
      outputRange: [0, 0, 1]
    });

    return (
      <View style={{ flex: 1, backgroundColor: Skin.Player_Background }}>
        {Platform.OS === 'ios' ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: -350,
              left: 0,
              right: 0,
              height: 400,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [1, 0, 0]
                  })
                }
              ],
              backgroundColor: Skin.Player_TopContainerBackground
            }}
          />
        ) : null}
        <AnimatedScrollView
          style={{ flex: 1, backgroundColor: 'transparent' }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.headerContainer}>
            <Animated.View
              style={{
                transform: [{ scale }, { translateX }, { translateY }]
              }}
            >
              <FadeIn>
                <Image
                  source={playerImage}
                  style={styles.avatar}
                  resizeMode='contain'
                />
              </FadeIn>
            </Animated.View>
            <View style={{ flexDirection: i18n.getFlexDirection() }}>
              <BoldText style={styles.headerText}>
                {player.squadNumber}{' '}
              </BoldText>
              <MediumText style={styles.headerText}>
                {player.name}
              </MediumText>
              <RegularText> {player.flag}</RegularText>
            </View>
            <RegularText style={styles.headerText}>
              {player.position}
            </RegularText>
            {playerSocialDisplay}
          </View>
          <AnimatableView
            animation="fadeIn"
            useNativeDriver
            delay={Platform.OS === 'ios' ? 50 : 150}
            duration={500}
            style={styles.content}
          >
            <MediumText style={styles.sectionHeader}>{i18n.t('screens.player.bio')}</MediumText>
            <ReadMore
              numberOfLines={Settings.Player_ShowSongs ? 3 : 9999}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}
            >
              <ParsedText 
                parse={
                  [
                    {type: 'url', style: styles.url, onPress: this._urlPress},
                    {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
                    {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
                  ]
                }
                style={styles.bodyText}
                childrenProps
                >
                {i18n.getLocalizedBio(player.bio)}
              </ParsedText>
              <RegularText style={styles.bodyText}></RegularText>
            </ReadMore>
            {Settings.Player_ShowSongs && playerSongDisplay}
          </AnimatableView>
        </AnimatedScrollView>

        <NavigationBar
          animatedBackgroundOpacity={headerOpacity}
          paddingTop={0}
          style={[{paddingTop: 0},
            Platform.OS === 'android'
              ? { height: Layout.headerHeight + Constants.statusBarHeight }
              : null
          ]}
          renderLeftButton={() => (
            <View
              style={{
                // gross dumb things
                paddingTop: Platform.OS === 'android' ? 10 : 0,
                marginTop: Layout.notchHeight > 0 ? -5 : 0
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
        headerTitle={i18n.t('screens.player.playersongheader')}
        navigationToScreen="RosterSingleSong"
        key={item._id}
        song={item}
        style={{ borderBottomWidth: 1, borderColor: '#eee' }}
      />
    );
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <TouchableOpacity
        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
        onPress={handlePress}
      >
        <MediumText style={{ color: Palette.Navy, marginTop: 5 }}>
          {i18n.t('screens.player.readmore')}
        </MediumText>
      </TouchableOpacity>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <TouchableOpacity
        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
        onPress={handlePress}
      >
        <MediumText style={{ color: Palette.Navy, marginTop: 5 }}>
          {i18n.t('screens.player.showless')}
        </MediumText>
      </TouchableOpacity>
    );
  };

  _renderFormatted = (matchingString) => {
    return matchingString.slice(1, matchingString.length-1)
  }
}

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 0,
    marginBottom: 10
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  headerContainer: {
    backgroundColor: Skin.Player_TopContainerBackground,
    paddingTop: Constants.statusBarHeight + Layout.notchHeight,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: DefaultColors.HeaderText,
    fontSize: FontSizes.subtitle
  },
  bodyText: {
    textAlign: i18n.getRTLTextAlign(), 
    writingDirection: i18n.getWritingDirection()
  },
  sectionHeader: {
    fontSize: FontSizes.bodyTitle,
    marginTop: 15,
    marginBottom: 3,
    textAlign: i18n.getRTLTextAlign(), 
    writingDirection: i18n.getWritingDirection()
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default withUnstated(Player, { globalData: GlobalDataContainer });
