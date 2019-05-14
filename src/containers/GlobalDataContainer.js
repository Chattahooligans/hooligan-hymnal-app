import { Location, Notifications, Permissions } from 'expo';
import { Container } from 'unstated';
import { getSongs } from '../services/songsService';
import { getSongbook } from '../services/songbookService';
import { getPlayers } from '../services/playersService';
import { getRoster } from '../services/rosterService';
import { HYMNAL_ADDRESS } from '../config/server';

import htmlColors from '../data/htmlColors.json';

const PUSH_ENDPOINT = HYMNAL_ADDRESS + '/api/pushToken';

export default class GlobalDataContainer extends Container {
  state = {
    currentSong: {},
    location: null,
    token: null,
    songbook: {
      songbook_title: '',
      organization: '',
      description: '',
      front_cover: '',
      back_cover: '',
      some_publish_or_expiration_dates: '',
      chapters: []
    },
    songs: null,
    roster: {
      rosterTitle: '',
      season: '',
      squads: []
    },
    players: null,
    goalkeeperNickname: null,
    htmlColors: null,
    token: null,
    unlocked: false,
    response: null
  };

  loadData = async () => {
    try {
      const songs = await getSongs();
      const songbook = await getSongbook();

      const players = await getPlayers();
      const roster = await getRoster();
      
      this.setState({ songbook: songbook[0], songs, roster: roster[0], players, htmlColors });
    } catch (e) {
      //
    }
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this._setLocation(location);
  };

  handleNotification = notification => {
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

  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );

        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      this.setState({ token });

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
    } catch (e) {
      //
    }
  };

  setCurrentSong = (song, callback) =>
    this.setState({ currentSong: song }, () => {
      if (callback) callback();
    });

  setGoalkeeperNickname = (nick, callback) =>
  this.setState({ goalkeeperNickname: nick }, () => {
    if (callback) callback();
  });

  setResponse = (response, callback) =>
  this.setState({response: response}, () => {
    if (callback) callback();
  });


  setLocation = location => this.setState({ location });

  toggleUserAuth = value => this.setState({ unlocked: !this.state.unlocked });
}
