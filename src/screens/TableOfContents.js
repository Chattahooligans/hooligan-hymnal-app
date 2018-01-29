import React from 'react';
import {
  Platform,
  Image,
  SectionList,
  StyleSheet,
  View,
  Text
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import state from '../state';

import Songs from '../data/songs.json';
import Songbook from '../data/songbook.json';
import { conferenceHasEnded } from '../utils/index';

import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';

import { find, propEq } from 'ramda';

// on click on a song row
// search each page in parent.parent component and look for a _id property (yet to be created), snap to that page

//
//  Note: ToC may not live within the pager forever,
//  it is just hanging out there now.
//  ToC may be a button on this screen or somewhere else
//

//console.log("Songbook ToC json: " + Songbook.songbook_title);
let ToCData = [];
Songbook.chapters.forEach(chapterChild => {
  let songList = [];

  //console.log(chapterChild.chapter_title);
  chapterChild.songs.forEach(songChild => {
    try {
      let song = {
        _id: songChild._id,
        song_title: Songs.filter(song => song._id === songChild._id)[0].title
      };
      //console.log(songChild._id + " " + song.song_title);
      songList.push(song);
    } catch (err) {
      console.log(songChild._id + ' not found in songs database');
    }
  });

  if (0 < songList.length)
    ToCData.push({ title: chapterChild.chapter_title, data: songList });
});

class SongRow extends React.Component {
  static navigationOptions = {
    title: 'Table of Contents',
    ...NavigationOptions
  };

  render() {
    const { item: song } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowData}>
            <RegularText>{song.song_title}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePressTOCButton = () => {
    // TODO: just close this window and go back
    console.log('close this/go back');
  };

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class TableOfContents extends React.Component {
  static navigationOptions = {
    title: 'Songs',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SectionList
            renderScrollComponent={props => <ScrollView {...props} />}
            stickySectionHeadersEnabled={true}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={ToCData}
            keyExtractor={(item, index) => index}
          />
          <NavigationBar
            style={[
              Platform.OS === 'android'
                ? { height: Layout.headerHeight + Constants.statusBarHeight }
                : null
            ]}
            renderLeftButton={() => (
              <View
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
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
          <NavigationBar
            animatedBackgroundOpacity={1}
            style={[
              Platform.OS === 'android'
                ? { height: Layout.headerHeight + Constants.statusBarHeight, flexDirection: 'row' }
                : null,
            ]}
            renderLeftButton={() => (
              <View
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
                  marginTop: Layout.notchHeight > 0 ? -5 : 0
                }}
              >
                <HeaderBackButton
                  onPress={() => this.props.navigation.goBack()}
                  tintColor="#fff"
                />
              </View>
            )}
            renderTitle={() => (
              <Text
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
                  marginTop: Layout.notchHeight > 0 ? -5 : 0,
                  fontFamily: 'open-sans-bold',
                  color: "#FFFFFF",
                  fontSize: 20,
                  paddingHorizontal: 0
                }}
              >
                Table of Contents
              </Text>
            )}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <RegularText>{section.title}</RegularText>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return <SongRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = item => {
    const song = find(propEq('_id', item._id), Songs);
    // console.log('song', song);
    state.currentSong = song;
    this.props.navigation.navigate('Songbook');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingBottom: 8, paddingTop: Layout.headerHeight + Constants.statusBarHeight
  },
  tocButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  row: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row'
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0
  },
  rowData: {
    flex: 1
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  }
});
