import React from 'react';
import {
  ViewPagerAndroid,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native';
import SongView from '../components/SongView';
import { ScrollView } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Colors, FontSizes, Layout } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import TableOfContents from './TableOfContents';

import Songs from '../data/songs.json';
import SongbookManifest from '../data/songbook.json';

import state from '../state';

let songViews = [];
let songs = [];
let pageCount = 0;
SongbookManifest.chapters.forEach(chapterChild => {
  //console.log(chapterChild.chapter_title);
  chapterChild.songs.forEach(songChild => {
    try {
      let item = Songs.filter(song => song.guid === songChild.guid)[0];
      item.chapter_title = chapterChild.chapter_title;
      pageCount++;
      songs.push({ index: pageCount, song: item });
      songViews.push(
        <View key={item.guid} chapter_title={chapterChild.chapter_title}>
          <SongView song={item} />
          <Text
            style={{
              textAlign: 'right',
              backgroundColor: '#FFFFFF',
              marginTop: 0,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              padding: 8
            }}
          >
            {pageCount}
          </Text>
        </View>
      );
    } catch (err) {
      console.log(songChild.guid + ' not found in songs database');
    }
  });
});

// Android uses ViewPagerAndroid
// iOS uses ScrollView with pagingEnabled and horizontal properties
export default class Songbook extends React.Component {
  static navigationOptions = {
    title: 'Songbook',
    ...NavigationOptions
  };

  render() {
    const forcePagingEnabled = true;
    let initialPage = this._currentPage() || 0;
    console.log('currentSong', this._currentSong());
    let chapter = this._currentSong()
      ? this._currentSong().song.chapter_title
      : 'Hooligan Hymnal';
    // let chapter = this._currentSong().chapter;
    return (
      <LoadingPlaceholder>
        <View style={styles.sectionHeader}>
          <Text style={styles.chapterText}>{chapter}</Text>
        </View>
        <View style={styles.container}>
          {Platform.OS === 'ios' ? (
            <LoadingPlaceholder>
              <FlatList
                renderScrollComponent={props => <ScrollView {...props} />}
                renderItem={this._renderSong}
                data={SongbookManifest.chapters}
                keyExtractor={(item, index) => index}
              />
            </LoadingPlaceholder>
          ) : (
            <ViewPagerAndroid
              initialPage={initialPage}
              style={styles.container}
              horizontal={true}
              pagingEnabled={forcePagingEnabled}
              onPageSelected={this._handleAndroidPageSelected}
            >
              <View style={styles.container}>
                <View style={{ flex: 1 }} />
                <Image
                  style={{ width: 400, height: 400 }}
                  source={require('../assets/songbook-front-cover.png')}
                />
                <View style={{ flex: 1 }} />
                <Text style={styles.welcome}>
                  Swipe Left/Right to View Songs
                </Text>
                <View style={{ flex: 1 }} />
              </View>
              {songViews}
            </ViewPagerAndroid>
          )}
          <RectButton
            style={styles.tocButton}
            onPress={this._handlePressTOCButton}
            underlayColor="#fff"
          >
            <Ionicons
                name="md-list"
                size={23}
                style={{
                  color: '#fff',
                  marginTop: 3,
                  marginBottom: 3,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: 'transparent'
                }}
              />
            <RegularText style={styles.tocButtonText}>
              Table of Contents
            </RegularText>
          </RectButton>
        </View>
      </LoadingPlaceholder>
    );
  }

  _currentSong = () => {
    return state.currentSong
      ? songs.filter(song => song.song.guid === state.currentSong.guid)[0]
      : undefined;
  };

  _currentPage = () => {
    return state.currentSong
      ? songs.filter(song => song.song.guid === state.currentSong.guid)[0].index
      : 0;
  };

  _renderSong = ({ item }) => {
    return <SongView song={item} />;
  };

  _handlePressTOCButton = () => {
    this.props.navigation.navigate('TableOfContents');
  };

  _handleAndroidPageSelected = ({ nativeEvent }) => {
    console.log('page selected', nativeEvent.position);
    if (0 < nativeEvent.position)
    {
      console.log("current chapter: " + songs[nativeEvent.position-1].song.chapter_title);
      // TODO: Set something?
    }
    else
    {
      // TODO: Set default "Hooligan Hymnal"
    }
  };
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  },
  chapterText: {
    textAlign: 'center',
    fontFamily: 'open-sans'
  },
  tocButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  tocButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A5D8F6'
  },
  chapterTitle: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  }
});
