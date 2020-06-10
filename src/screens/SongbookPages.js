import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from '../i18n';

class SongbookPages extends React.Component {
  state = {
    chapter_title: defaultChapterTitle,
    tocButtonDisplay: true,
    songViews: [],
    songs: [],
    pageCount: 0
  };

  componentDidMount() {
    let songViews = [];
    let songs = [];
    let pageCount = 0;
    this.props.globalData.state.songbook.chapters.forEach(chapterChild => {
      chapterChild.songs.forEach((songChild, index) => {
        try {
          let item = this.props.globalData.state.songs.filter(song => song._id === songChild._id)[0];
          item.chapter_title = chapterChild.chapter_title;
          pageCount++;
          songs.push({ index: pageCount, song: item });
          songViews.push(
            <View
              key={index + "-" + item._id}
              chapter_title={chapterChild.chapter_title}
              style={{ flex: 1, width: screenWidth, textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>
              <SongView song={item} pageCount={pageCount} />
            </View>
          );
        } catch (err) {
          console.log(songChild._id + ' not found in songs database');
        }
      });
    });

    this.setState({ songViews, songs, pageCount });
  }

  render() {
    console.log("SongbookPages " + JSON.stringify(this.props.route.params))

    return (
      <Text>Songbook Pages</Text>
    );
  }
}

export default withUnstated(SongbookPages, { globalData: GlobalDataContainer });

const styles = StyleSheet.create({

})
