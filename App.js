import React from 'react';
import { Asset, AppLoading, Font, Constants } from 'expo';
import { Platform, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadSavedTalksAsync } from './src/utils/storage';

import Navigation from './src/Navigation';
import Home from './src/screens/Home';

import state from './src/state'

import { Location, Permissions } from 'expo';

const theme = {
  font: {
    primary: 'open-sans-bold'
  },
  colors: {
    main: '#187f65'
  }
};

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    location: null
  };

  _loadResourcesAsync = () => {
    return Promise.all([this._loadAssetsAsync(), this._loadDataAsync()]);
  };

  _loadDataAsync = () => {
    return loadSavedTalksAsync();
  };

  _loadAssetsAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'open-sans-bold': require('./src/assets/OpenSans-Bold.ttf'),
        'open-sans': require('./src/assets/OpenSans-Regular.ttf'),
        'open-sans-semibold': require('./src/assets/OpenSans-SemiBold.ttf'),
        ...Ionicons.font
      }),
      Asset.fromModule(
        require('./src/assets/chattahooligans.png')
      ).downloadAsync(),
      Asset.fromModule(
        require('react-navigation/src/views/assets/back-icon.png')
      ).downloadAsync()
    ]);
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log("Oops, this will not work on Sketch in an Android emulator. Try it on your device!");
    } else {
      this._getLocationAsync();
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    state.location = location;
    console.log("location:", location.coords.latitude, location.coords.longitude, location.coords.accuracy);
    this.setState({ location });
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
