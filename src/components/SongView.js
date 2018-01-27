import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RegularText } from './StyledText';
import Tags from './Tags';

export default class SongView extends React.Component {
  render() {
    let song = this.props.song;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.reference}>{song.reference_title}</Text>
          <Tags style={styles.icons} tags={song.tags} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.instructions}>{song.instructions}</Text>
          <Text style={styles.lyrics}>{song.lyrics}</Text>
        </View>
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
    paddingLeft: 4,
  },
  reference: {
    fontStyle: 'italic',
    color: '#AAAAAA',
    backgroundColor: '#FFFFFF',
    paddingLeft: 12
  },
  icons: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 6,
  },
  container: {
    flex: 1,
    width: 100 + '%',
    padding: 8,
  },
  instructions: {
    fontStyle: 'italic',
    color: '#AAAAAA',
    backgroundColor: '#FFFFFF',
    paddingLeft: 12
  },
  lyrics: {
    fontSize: 18,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8
  }
});
