import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RegularText } from './StyledText';
import Tags from './Tags';

export default class SongView extends React.Component {
  render() {
    let song = this.props.song;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Text style={styles.title}>{song.title}</Text>
          <Tags tags={song.tags} />
        </View>
        <RegularText>{song.lyrics}</RegularText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingLeft: 4
  },
  icons: {
    backgroundColor: '#FFFFFF',
    padding: 2,
    paddingLeft: 6
  },
  container: {
    flex: 1,
    width: 100 + '%',
    padding: 8
  },
  song: {
    marginTop: 5
  }
});
