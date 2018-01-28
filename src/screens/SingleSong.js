import React from 'react';
import MenuButton from '../components/MenuButton';
import { Text, View, StyleSheet, Platform } from 'react-native';
import SongView from '../components/SongView';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { SavedButtonNavigationItem } from './Details';

import NavigationBar from '../components/NavigationBar';
import { Colors, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#032E55',
    paddingBottom: 8, paddingTop: Layout.headerHeight + Constants.statusBarHeight
  }
});

// Used for single song viewing without the rest of the songbook
// We'll use this when entering App from the notifcation or from the "Capo Callout" screen
// add a unique header that includes a megaphone icon somewhere?
export default class SingleSong extends React.Component {
  render() {
    let song = this.props.navigation.state.params.song;

    return (
      <View style={styles.container}>
        <SongView
          song={{
            ...song
          }}
        />

        <NavigationBar
          animatedBackgroundOpacity={1}
          style={[
            Platform.OS === 'android'
              ? { height: Layout.headerHeight + Constants.statusBarHeight, flexDirection: 'row' }
              : null,
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
              />
            </View>
          )}
          renderTitle={() => (
            <Text
              style={{
                // gross dumb things
                paddingTop: Platform.OS === 'android' ? 17 : 0,
                marginTop: Layout.notchHeight > 0 ? -5 : 0,
                fontFamily: 'open-sans-bold',
                color: "#FFFFFF",
                fontSize: 20,
                paddingHorizontal: 0
              }}
            >
              Up Next
            </Text>
          )}
        />
      </View>
    );
  }
}
