import React from 'react';
import { Asset, AppLoading, Font, Constants } from 'expo';
import { Platform, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadSavedTalksAsync } from './src/utils/storage';

import Navigation from './src/Navigation';
import Home from './src/screens/Home';

const theme = {
  font: {
    primary: 'open-sans-bold',
  },
  colors: {
    main: '#187f65',
  },
};

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  _loadResourcesAsync = () => {
    return Promise.all([
      this._loadAssetsAsync(),
      this._loadDataAsync(),
    ])
  }

  _loadDataAsync = () => {
    return loadSavedTalksAsync();
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'open-sans-bold': require('./src/assets/OpenSans-Bold.ttf'),
        'open-sans': require('./src/assets/OpenSans-Regular.ttf'),
        'open-sans-semibold': require('./src/assets/OpenSans-SemiBold.ttf'),
        ...Ionicons.font,
      }),
      Asset.fromModule(require('./src/assets/logo.png')).downloadAsync(),
      Asset.fromModule(
        require('react-navigation/src/views/assets/back-icon.png')
      ).downloadAsync(),
    ]);
  };

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={console.error}
          onFinish={() => {
            this.setState({ fontLoaded: true });
          }}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    );
  }
}
