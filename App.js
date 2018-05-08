import React from 'react';
import { Asset, AppLoading, Font, Constants } from 'expo';
import { Platform, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadSavedTalksAsync } from './src/utils/storage';

import Navigation from './src/Navigation';
import Home from './src/screens/Home';

import { Location, Notifications, Permissions } from 'expo';
import { HYMNAL_ADDRESS } from './src/config/server';

const PUSH_ENDPOINT = HYMNAL_ADDRESS + '/api/pushToken';
console.log('PUSH_ENDPOINT', PUSH_ENDPOINT);
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
    currentSong: {},
    errorMessage: null,
    fontLoaded: false,
    location: null,
    notification: {},
    token: null,
    unlocked: false
  };

  _setCurrentSong = (song, callback) => this.setState({ currentSong: song }, () => {
    if (callback) callback();
  });

  _setLocation = location => this.setState({ location });

  _toggleUserAuth = value =>
    this.setState(prevState => ({ unlocked: !prevState.unlocked }));

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
      console.log(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      //this._getLocationAsync();
    }
    this._registerForPushNotificationsAsync();
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this._setLocation(location);
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
    this.setState({ token });
    console.log('token', token);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pushToken: token
      })
    });
  };

  _handleNotification = notification => {
    if (notification.origin === 'selected') {
      // notification was tapped, either from the app already open or from entering the app
      console.log('SELECTED notification', notification.data.song.title);

      // TODO: open SingleSong screen and send it the Song object buried inside the notification

      // kinda like this but it doesn't work from this far out (because navigation doesn't exist yet)
      // this.props.navigation.navigate('SingleSong', {song: notification.data.song});

      // Maybe set app state and do something with it that way?
      // this.setState({ notification: notification });
    } else if (notification.origin === 'received') {
      // notification was received, either app was already open or it just opened up but not from the notification
      // no way to tell which?
      // console.log('RECEIVED notification', notification.data.song.title);
      // We don't necessarily want to do anything in this case
    }
  };

  render() {
    const { currentSong, fontLoaded, location, token, unlocked } = this.state;
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
      <View style={{ flex: 1 }}>
        <Navigation
          screenProps={{
            currentSong,
            location,
            setCurrentSong: this._setCurrentSong,
            setLocation: this._setLocation,
            token,
            toggleUserAuth: this._toggleUserAuth,
            unlocked
          }}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
