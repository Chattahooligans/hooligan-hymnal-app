import React from 'react';
import {
  Platform,
  Image,
  SectionList,
  StyleSheet,
  View,
  Text,
  Dimensions
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

const screenWidth = Dimensions.get('window').width;

console.log("Songbook ToC json: " + Songbook.songbook_title);

let ToCData = [];
let tocPageLabel = 1;
Songbook.chapters.forEach(chapterChild => {
  let songList = [];

  console.log(chapterChild.chapter_title);
  chapterChild.songs.forEach(songChild => {
    try {
      let song = {
        _id: songChild._id,
        song_title: Songs.filter(song => song._id === songChild._id)[0].title,
        page: tocPageLabel
      };
      console.log(songChild._id + " " + song.song_title);
      // set page label
      song.toc_page_label = tocPageLabel;
      songList.push(song);
      tocPageLabel++;
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
            <RegularText style={styles.pageLabel}>{song.toc_page_label}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class TableOfContentsInline extends React.Component {
  state = {
    
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SectionList
            renderScrollComponent={props => <ScrollView {...props} />}
            stickySectionHeadersEnabled={false}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={ToCData}
            keyExtractor={(item, index) => index}
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
    console.log('ToC inline song.title', song.title, item._id);

    // pass item page label to song to include in state
    song.page = item.toc_page_label;

    state.currentSong = song;

    // scroll to song
    this.props.scrollToSong();

    this.setState(previousState => {
      return { currentSong: song };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingBottom: 8
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageLabel: {
    color: '#999999'
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
