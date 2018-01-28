import React from 'react';
import { Image, SectionList, StyleSheet, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import { Colors, FontSizes, Layout } from '../constants';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Songs from '../data/songs.json';
import Songbook from '../data/songbook.json';
import { conferenceHasEnded } from '../utils/index';
import state from '../state';

import { find, propEq } from 'ramda';

// TODO: On row press, get the related song object by guid using snippet below and pass it to the next screen
//      Songs.filter(song => song.guid === songChild.guid)[0]
// Back Button on the nav bar for this screen, goes back to capo dashboard

//console.log("Songbook ToC json: " + Songbook.songbook_title);
let ToCData = [];
Songbook.chapters.forEach(chapterChild => {
  let songList = [];

  //console.log(chapterChild.chapter_title);
  chapterChild.songs.forEach(songChild => {
    try {
      let song = {
        guid: songChild.guid,
        song_title: Songs.filter(song => song.guid === songChild.guid)[0].title
      };
      //console.log(songChild.guid + " " + song.song_title);
      songList.push(song);
    } catch (err) {
      console.log(songChild.guid + ' not found in songs database');
    }
  });

  if (0 < songList.length) {
    // sort alphabetical within chapter
    songList.sort(function(a, b) {
      return a.song_title > b.song_title
        ? 1
        : b.song_title > a.song_title ? -1 : 0;
    });
    ToCData.push({ title: chapterChild.chapter_title, data: songList });
  }
});

class SongRow extends React.Component {
  static navigationOptions = {
    title: 'Capo Select Song',
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

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class CapoSelectSong extends React.Component {
  static navigationOptions = {
    title: 'Capo Select Song',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <SectionList
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={ToCData}
          keyExtractor={(item, index) => index}
        />
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
    console.log('Row Pressed');
    const song = find(propEq('guid', item.guid), Songs);
    state.currentSong = song;

    console.log("song", song);

    this.props.navigation.navigate('CapoConfirmSend');
  };
}

const styles = StyleSheet.create({
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
