import React from 'react';
import { Asset, AppLoading, Font, Constants } from 'expo';
import { Platform, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadSavedTalksAsync } from './src/utils/storage';

import Navigation from './src/Navigation';
import Home from './src/screens/Home';

import state from './src/state'

import { Location, Notifications, Permissions } from 'expo';
import registerForPushNotificationsAsync from 'registerForPushNotificationsAsync';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

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
    notification: {},
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
      this._registerForPushNotificationsAsync();
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
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
    this.setState({ location });
  };

  _registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'Chattahooligan Hymnal User',
        },
      }),
    });
  };

  _handleNotification = (notification) => {
    this.setState({notification: notification});
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
