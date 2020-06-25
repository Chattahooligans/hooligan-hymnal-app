import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SongView from '../components/SongView';
import { HeaderBackButton } from 'react-navigation';
import { Skin, DefaultColors } from '../../config';
import i18n from '../i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Skin.SingleSong_Background,
    paddingBottom: 8
  }
});

// Used for single song viewing without the rest of the songbook
// We'll use this when entering App from the notifcation or from the "Capo Callout" screen
// add a unique header that includes a megaphone icon somewhere?
export default class SingleSong extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({ 
      headerTitle: i18n.t('screens.singlesong.title'),
      headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    })

    const { song } = this.props.route.params;
    // const headerTitle = song && song.title ? song.title : 'Up Next';
    // this.props.navigation.setParams({ headerTitle });
  }

  render() {
    let song = this.props.route.params.song;

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
