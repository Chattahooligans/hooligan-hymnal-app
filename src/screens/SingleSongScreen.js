import React from 'react';
import { View, StyleSheet } from 'react-native';
import SongView from '../components/SongView';

const styles = StyleSheet.create({
  header: {
    fontSize: 12,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// Used for single song viewing without the rest of the songbook
// We'll use this when entering App from the notifcation or from the "Capo Callout" screen
// add a unique header that includes a megaphone icon somewhere?
export default class SingleSongScreen extends React.Component {
  render() {
    let song = this.props.navigation.state.params.song;

    return (
      <View style={styles.container}>
        <SongView
          song={{
            title: song.title,
            lyrics: song.lyrics
          }}
        />
      </View>
    );
  }
}
