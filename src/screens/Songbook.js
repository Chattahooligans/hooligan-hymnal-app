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

import { NavigationActions } from 'react-navigation';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Colors, FontSizes, Layout } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import TableOfContents from './TableOfContents';

import Songs from '../data/songs.json';
import SongbookManifest from '../data/songbook.json';

let songViews = [];
let pageCount = 0;
SongbookManifest.chapters.forEach(chapterChild => {
  //console.log(chapterChild.chapter_title);
  chapterChild.songs.forEach(songChild => {
    try {
      let item = Songs.filter(song => song.guid === songChild.guid)[0];
      item.chapter_title = chapterChild.chapter_title;
      pageCount++;
      songViews.push(
        <View key={item.guid} chapter_title={chapterChild.chapter_title}>
          <SongView song={item} />
          <Text style={{textAlign: 'right', backgroundColor: '#FFFFFF', marginTop: 0, marginLeft: 8, marginRight: 8, marginBottom: 8, padding: 8}}>{pageCount}</Text>
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
    return (
      <LoadingPlaceholder>
        <View style={styles.sectionHeader}>
          <RegularText>CHAPTER TITLE HERE, gets update on page turn</RegularText>
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
              style={styles.container}
              horizontal={true}
              pagingEnabled={true}
              onPageSelected={this._handleAndroidPageSelected}
            >
              <View style={styles.container}>
                <Image
                  style={{ width: 400, height: 400 }}
                  source={require('../assets/chattahooligans-songbook-front-cover.png')}
                />
                <Text style={styles.welcome}>Swipe Left/Right to View Songs</Text>
              </View>
              {songViews}
            </ViewPagerAndroid>
          )}
          <RectButton
            style={styles.tocButton}
            onPress={this._handlePressTOCButton}
            underlayColor="#fff">
            <RegularText style={styles.tocButtonText}>
              Table of Contents
            </RegularText>
          </RectButton>
        </View>
      </LoadingPlaceholder>
    );
  }

  _renderSong = ({ item }) => {
    return <SongView song={item} />;
  };

  _handlePressTOCButton = () => {
    this.props.navigation.navigate('TableOfContents');
  };

  _handleAndroidPageSelected = ({event}) => {
    console.log("page selected");
    // TODO: Check chapter_title on the current child <View>
    // IF it exists, set the Title bar at the top
  };
}

const styles = StyleSheet.create({
  tocButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    width: 100+"%",
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
