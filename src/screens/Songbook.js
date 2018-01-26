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
        <View key={item.guid}>
          <SongView song={item} />
          <Text style={{textAlign: 'right', padding: 8}}>{pageCount}</Text>
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
    title: 'Hooligan Hymnal',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <ClipBorderRadius>
            <RectButton
              style={styles.tocButton}
              onPress={this._handlePressTOCButton}
              underlayColor="#fff"
            >
              <SemiBoldText style={styles.tocButtonText}>
                Table of Contents
              </SemiBoldText>
            </RectButton>
          </ClipBorderRadius>
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
            >
              <View style={styles.container}>
                <Image
                  style={{ width: 400, height: 400 }}
                  source={{
                    uri:
                      'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/13139207_848269078636976_5837517176582356954_n.png?oh=e27168f667887ef71b165c32fff65fb4&oe=5AF26ED8'
                  }}
                />
                <Text style={styles.welcome}>The Chattahooligan Hymnal</Text>
                <Text style={styles.welcome}>Swipe to View Songs</Text>
              </View>
              {songViews}
            </ViewPagerAndroid>
          )}
        </View>
      </LoadingPlaceholder>
    );
  }

  _renderSong = ({ item }) => {
    return <SongView song={item} />;
  };

  _handlePressTOCButton = () => {
    console.log('clicked TOC');
    this.props.navigation.navigate('TableOfContents');
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        {
          borderRadius: BORDER_RADIUS,
          overflow: 'hidden',
          marginTop: 3,
          marginBottom: 3
        },
        style
      ]}
    >
      {children}
    </View>
  );
};
const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  tocButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
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
  }
});
