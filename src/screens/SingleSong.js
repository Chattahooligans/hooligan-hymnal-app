import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SongView from '../components/SongView';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#032E55',
    paddingBottom: 8
  }
});

// Used for single song viewing without the rest of the songbook
// We'll use this when entering App from the notifcation or from the "Capo Callout" screen
// add a unique header that includes a megaphone icon somewhere?
export default class SingleSong extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.headerTitle,
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    )
  });

  componentDidMount() {
    const { song } = this.props.navigation.state.params;
    const headerTitle = song && song.title ? song.title : 'Up Next';
    this.props.navigation.setParams({ headerTitle });
  }

  render() {
    let song = this.props.navigation.state.params.song;

    return (
      <View style={styles.container}>
        <SongView
          song={{
            ...song
          }}
        />
      </View>
    );
  }
}
