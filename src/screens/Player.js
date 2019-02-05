import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View
} from 'react-native';

import SongView from '../components/SongView';
import { Constants, Video } from 'expo';
import FadeIn from 'react-native-fade-in-image';
import ReadMore from 'react-native-read-more-text';
import { BorderlessButton } from 'react-native-gesture-handler';
import { HeaderBackButton } from 'react-navigation';
import { View as AnimatableView } from 'react-native-animatable';
import _ from 'lodash';

import AnimatedScrollView from '../components/AnimatedScrollView';
import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Icons, Layout } from '../constants';
import { RegularText, BoldText, SemiBoldText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import SongCard from '../components/SongCard';

import Songs from '../data/songs.json';

export default class Player extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scrollY: new Animated.Value(0)
  };

  render() {
    let player = this.props.navigation.state.params.player;
    // console.log('player details window for ', player);

    let playerSongs = Songs.filter(song => song.player_id === player._id);
    let playerSongDisplay;

    let playerImage = require('../../assets/chattfc_logo.png');
    if (player.image)
      playerImage = {uri: player.image};

    if (playerSongs.length === 0) {
      playerSongDisplay = (
        <RegularText style={styles.bodyText}>
          We are still working on a song for this player. Want to help? Submit
          an idea!
        </RegularText>
      );
    } else {
      playerSongDisplay = (
        <FlatList
          style={{ backgroundColor: '#A5D8F6' }}
          data={playerSongs}
          renderItem={this._renderSongCard}
          keyExtractor={(item, index) => index}
        />
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
      <View style={{ flex: 1, backgroundColor: '#A5D8F6' }}>
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
              backgroundColor: Colors.green
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
              <FadeIn placeholderStyle={{ backgroundColor: Colors.green }}>
                <Image
                  source={playerImage}
                  style={styles.avatar}
                  resizeMode='contain'
                />
              </FadeIn>
            </Animated.View>
            <View style={{ flexDirection: 'row' }}>
              <BoldText style={styles.headerText}>
                {player.squadNumber}{' '}
              </BoldText>
              <SemiBoldText style={styles.headerText}>
                {player.name}
              </SemiBoldText>
            </View>
            <RegularText style={styles.headerText}>
              {player.position}
            </RegularText>
          </View>
          <AnimatableView
            animation="fadeIn"
            useNativeDriver
            delay={Platform.OS === 'ios' ? 50 : 150}
            duration={500}
            style={styles.content}
          >
            <SemiBoldText style={styles.sectionHeader}>Bio</SemiBoldText>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}
            >
              <RegularText style={styles.bodyText}>{player.bio}</RegularText>
            </ReadMore>

            <BoldText style={styles.sectionHeader}>Player Songs</BoldText>
            {playerSongDisplay}
          </AnimatableView>
        </AnimatedScrollView>

        <NavigationBar
          animatedBackgroundOpacity={headerOpacity}
          style={[
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
                tintColor="#fff"
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
        headerTitle="Player Song"
        navigationToScreen="RosterSingleSong"
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
        <SemiBoldText style={{ color: Colors.green, marginTop: 5 }}>
          Read more
        </SemiBoldText>
      </TouchableOpacity>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <TouchableOpacity
        hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
        onPress={handlePress}
      >
        <SemiBoldText style={{ color: Colors.green, marginTop: 5 }}>
          Show less
        </SemiBoldText>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  headerContainer: {
    backgroundColor: Colors.green,
    paddingTop: Constants.statusBarHeight + Layout.notchHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: FontSizes.subtitle
  },
  talkTitleText: {
    color: '#fff',
    fontSize: FontSizes.title,
    textAlign: 'center',
    marginTop: 10
  },
  sectionHeader: {
    fontSize: FontSizes.bodyTitle,
    marginTop: 15,
    marginBottom: 3
  }
});
