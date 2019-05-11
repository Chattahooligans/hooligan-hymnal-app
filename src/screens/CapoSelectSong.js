import React from 'react';
import {
  Image,
  SectionList,
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import { BoldText, MediumText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Songs from '../data/songs.json';
import Songbook from '../data/songbook.json';
import { conferenceHasEnded } from '../utils/index';

import find from 'lodash/find';

import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';

// TODO: On row press, get the related song object by _id using snippet below and pass it to the next screen
//      Songs.filter(song => song._id === songChild._id)[0]
// Back Button on the nav bar for this screen, goes back to capo dashboard

//console.log("Songbook ToC json: " + Songbook.songbook_title);

class SongRow extends React.Component {
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

class CapoSelectSong extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select Song',
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    )
  });

  state = {
    ToCData: []
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.songs &&
      this.props.globalData.state.songs
    ) {
      this.setData();
    }
  }

  setData = () => {
    let ToCData = [];
    this.props.globalData.state.songbook.chapters.forEach(chapterChild => {
      let songList = [];

      chapterChild.songs.forEach(songChild => {
        try {
          let song = {
            _id: songChild._id,
            song_title: this.props.globalData.state.songs.filter(
              song => song._id === songChild._id
            )[0].title
          };
          songList.push(song);
        } catch (err) {
          console.log(songChild._id + ' not found in songs database');
        }
      });

      if (0 < songList.length) {
        // sort alphabetical within chapter
        songList.sort(function(a, b) {
          return a.song_title > b.song_title
            ? 1
            : b.song_title > a.song_title
            ? -1
            : 0;
        });
        ToCData.push({ title: chapterChild.chapter_title, data: songList });
      }
    });

    this.setState({ ToCData });
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={this.state.ToCData}
          keyExtractor={(item, index) => index}
        />
      </View>
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
    const song = find(this.props.globalData.state.songs, { _id: item._id });

    this.props.globalData.setCurrentSong(song);

    this.props.navigation.navigate('CapoConfirmSendSong');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingBottom: 8
  },
  row: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row'
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

export default withUnstated(CapoSelectSong, {
  globalData: GlobalDataContainer
});
