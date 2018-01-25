import React from 'react';
import { Image, SectionList, StyleSheet, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import { Colors } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Songs from '../data/songs.json';
import Songbook from '../data/songbook.json';

// parse songbook json
// this needs to all be dynamic, using chapter_title property as the section heading name
//      and a flexible number of chapters

// pseudocode
// const ToC is some array of { title, songs/data }
// for each chapter {
//      const title = get chapter chapter_title
//      const songs is some array of { guid, title }
//      
//      parse child elements of "song" property in this chapter
//      for each song {
//          guid is directly from songbook.json
//          title is retrieved from songs.json database (sorry about relational data!)
//          
//          add to songs array
//      }
//      
//      add new item to ToC array
//}

// on click on a song row
// search each page in parent.parent component and look for a guid property (yet to be created), snap to that page

//
//  Note: ToC may not live within the pager forever, 
//  it is just hanging out there now.
//  ToC may be a button on this screen or somewhere else
//

const gameSongs = Songs.filter(song => song.category === 'game');
const playerSongs = Songs.filter(song => song.category === 'player');
const teamSongs = Songs.filter(song => song.category === 'team');

const SongData = [
  { data: gameSongs, title: 'Game Songs' },
  { data: playerSongs, title: 'Player Songs' },
  { data: teamSongs, title: 'Team Songs' }
];

class SongRow extends React.Component {
  render() {
    const { item: speaker } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowData}>
            <BoldText>{speaker.name}</BoldText>
            {speaker.organization ? (
              <SemiBoldText>{speaker.organization}</SemiBoldText>
            ) : null}
            <RegularText>{speaker.title}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class TableOfContents extends React.Component {
  static navigationOptions = {
    title: 'Songs',
    headerStyle: { backgroundColor: Colors.green },
    headerTintColor: 'white',
    headerLeft: <MenuButton />,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    }
  };

  render() {
    return (
      <LoadingPlaceholder>
        <SectionList
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={SongData}
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

  _handlePressRow = song => {
    this.props.navigation.navigate('SingleSongScreen', { song });
  };
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
