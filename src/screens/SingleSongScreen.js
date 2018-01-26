import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import { Colors, Layout } from '../constants';
import MenuButton from '../components/MenuButton';
import { View, StyleSheet, Platform } from 'react-native';
import SongView from '../components/SongView';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import NavigationBar from '../components/NavigationBar';
import { Constants } from 'expo';
import { SavedButtonNavigationItem } from './Details';

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
  static navigationOptions = {
    title: 'Crew',
    headerStyle: { backgroundColor: Colors.green },
    headerTintColor: 'white',
    headerLeft: <MenuButton />,
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    }
  };

  render() {
    let song = this.props.navigation.state.params.song;

    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SongView
            song={{
              title: song.title,
              lyrics: song.lyrics
            }}
          />

          <NavigationBar
            style={[
              Platform.OS === 'android'
                ? { height: Layout.headerHeight + Constants.statusBarHeight }
                : null
            ]}
            renderLeftButton={() => (
              <View
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
                  marginTop: Layout.notchHeight > 0 ? -5 : 0
                }}
              >
                <HeaderBackButton
                  onPress={() => this.props.navigation.goBack()}
                  tintColor="#fff"
                  title={null}
                />
              </View>
            )}
            renderRightButton={() => <SavedButtonNavigationItem talk={song} />}
          />
        </View>
      </LoadingPlaceholder>
    );
  }
}
