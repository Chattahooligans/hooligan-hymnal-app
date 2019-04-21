import React from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { find } from 'lodash';
import NavigationOptions from '../config/NavigationOptions';
import { BoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { Colors, FontSizes } from '../constants';

const screenWidth = Dimensions.get('window').width;

class SongRow extends React.Component {
  static navigationOptions = {
    title: 'Table of Contents',
    ...NavigationOptions
  };

  render() {
    const { item: song } = this.props;

    let capoSignal;
    if (song.capoSignal)
      capoSignal = '📢: ' + song.capoSignal;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowData}>
            <RegularText>{song.song_title}</RegularText>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', opacity: 0.5}}>
              <RegularText style={{marginRight: 10}}>
                {capoSignal}
              </RegularText>
              <RegularText style={styles.pageLabel}>
                {song.toc_page_label}
              </RegularText>
            </View>
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
    ToCData: []
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.songs && this.props.songs) {
      this.setData();
    }
  }

  setData = () => {
    let ToCData = [];
    let tocPageLabel = 1;
    this.props.songbook.chapters.forEach(chapterChild => {
      let songList = [];

      chapterChild.songs.forEach(songChild => {
        try {
          let song = {
            _id: songChild._id,
            song_title: this.props.songs.filter(
              song => song._id === songChild._id
            )[0].title,
            capoSignal: this.props.songs.filter(
              song => song._id === songChild._id
            )[0].capoSignal,
            page: tocPageLabel
          };
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

    this.setState({ ToCData });
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
            sections={this.state.ToCData}
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
    return (
      <SongRow
        item={item}
        onPress={this._handlePressRow}
        songbook={this.props.songbook}
        songs={this.props.songs}
      />
    );
  };

  _handlePressRow = item => {
    const song = find(this.props.songs, { _id: item._id });

    // pass item page label to song to include in state
    song.page = item.toc_page_label;

    this.props.setCurrentSong(song, () => {
      this.props.scrollToSong();
      this.setState(previousState => {
        return { currentSong: song };
      });
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
    width: 16,
    textAlign: 'right',
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
