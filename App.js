import React from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, View, StatusBar, YellowBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'unstated';
import { loadSavedTalksAsync } from './src/utils/storage';
import Navigation from './src/Navigation';
import Home from './src/screens/Home';
import imagesArray from './assets';

YellowBox.ignoreWarnings(['Warning: bind()']);

const theme = {
  font: {
    primary: 'open-sans-bold'
  },
  colors: {
    main: '#A3D8F7'
  }
};

class App extends React.Component {
  state = {
    errorMessage: null,
    fontLoaded: false
  };

  _loadResourcesAsync = () => {
    return Promise.all([this._loadAssetsAsync(), this._loadDataAsync()]);
  };

  _loadDataAsync = () => {
    return loadSavedTalksAsync();
  };

  /*
  'open-sans': require('./assets/OpenSans-Regular.ttf'),
  'open-sans-semibold': require('./assets/OpenSans-SemiBold.ttf'),
  'open-sans-bold': require('./assets/OpenSans-Bold.ttf'),
  'open-sans-italic': require('./assets/OpenSans-Italic.ttf'),
  */
  _loadAssetsAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'roboto-light': require('./assets/Roboto-Light.ttf'),
        'roboto': require('./assets/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/Roboto-Bold.ttf'),
        'roboto-italic': require('./assets/Roboto-Italic.ttf'),
        ...Ionicons.font
      }),
      Asset.loadAsync(imagesArray),
      Asset.fromModule(
        require('react-navigation/src/views/assets/back-icon.png')
      ).downloadAsync()
    ]);
  };

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded) {
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
      <Provider>
        <View style={{ flex: 1 }}>
          <Navigation />
          <StatusBar barStyle="light-content" />
        </View>
      </Provider>
    );
  }
}

export default App;
