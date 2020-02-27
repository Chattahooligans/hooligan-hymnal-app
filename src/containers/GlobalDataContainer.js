import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Container } from 'unstated';
import { getSongs } from '../services/songsService';
import { getSongbooks } from '../services/songbooksService';
import { getPlayers } from '../services/playersService';
import { getRosters } from '../services/rostersService';
import { getFoes } from '../services/foesService';
import { getChannels } from '../services/channelsService';
import { getFeed, getMoreFeed, hidePost } from '../services/feedService';
import { HOOLIGAN_HYMNAL_SERVER_ADDRESS, Settings } from '../config/Settings';
import appParams from '../../app.json';
import htmlColors from '../data/htmlColors.json';
import { objectTypeAnnotation } from '@babel/types';
import i18n from "../../i18n";

const PUSH_ENDPOINT = HOOLIGAN_HYMNAL_SERVER_ADDRESS + '/api/pushToken';

export default class GlobalDataContainer extends Container {
  state = {
    currentSong: {},
    location: null,
    pushToken: null,
    currentUser: null,
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
    rosters: {
      rosterTitle: '',
      season: '',
      players: []
    },
    players: null,
    foes: null,
    currentFoe: null,
    goalkeeperNickname: null,
    channels: null,
    htmlColors: null,
    bearerToken: null,
    currentPostDraft: null,
    feed: [],
    feedAtEnd: false,
    response: null,
    loadDataComplete: false
  };

  loadData = async () => {
    try {
      const songs = await getSongs();
      const songbooks = await getSongbooks();

      const players = await getPlayers();
      const rosters = await getRosters();
      const foes = await getFoes();
      const channels = await getChannels();
      const feed = await getFeed();
      const feedAtEnd = feed.length < Settings.Home_PostsPerPage;

      //this.setState({ songbook: songbooks[0], songs, rosters, players, htmlColors, foes });
      this.setState({
        songbook: songbooks[0],
        songs,
        players,
        rosters: this.verifyRoster(players, rosters),
        foes,
        channels,
        feed,
        feedAtEnd,
        htmlColors,
        loadDataComplete: true
      });
    } catch (e) {
      alert("loadData exception: " + e.toString());
    }
  };

  verifyRoster = (players, rosters) => {
    let rosterList = [];

    rosters.forEach(roster => {
      let playerList = [];

      roster.players.forEach(playerChild => {
        try {
          let player = players.find(player => player._id === playerChild._id);

          if (player) {
            // overrides for Academy data
            let clonePlayer = { ...player };
            if (playerChild.hasOwnProperty('override')) {
              /*
              if (playerChild.override.hasOwnProperty('position'))
                clonePlayer.position = playerChild.override.position;
              if (playerChild.override.hasOwnProperty('squadNumber'))
                clonePlayer.squadNumber = playerChild.override.squadNumber;
              if (playerChild.override.hasOwnProperty('bio'))
                clonePlayer.bio = playerChild.override.bio;
              if (playerChild.override.hasOwnProperty('thumbnail'))
                clonePlayer.thumbnail = playerChild.override.thumbnail;
              if (playerChild.override.hasOwnProperty('image'))
                clonePlayer.image = playerChild.override.image;
                */
              Object.assign(clonePlayer, playerChild.override);
            }

            playerList.push(clonePlayer);
          }
          else {
            //alert('creating new ' + JSON.stringify(playerChild));
            console.log(playerChild._id + ' not found in players database');

            if (playerChild.hasOwnProperty('override')) {
              // make a temp player
              let player = {
                name: '',
                position: '',
                squadNumber: '',
                bio: ''
              }

              /*
              if (playerChild.override.hasOwnProperty('name'))
                player.name = playerChild.override.name;
              if (playerChild.override.hasOwnProperty('position'))
                player.position = playerChild.override.position;
              if (playerChild.override.hasOwnProperty('squadNumber'))
                player.squadNumber = playerChild.override.squadNumber;
              if (playerChild.override.hasOwnProperty('bio'))
                player.bio = playerChild.override.bio;
              if (playerChild.override.hasOwnProperty('thumbnail'))
                player.thumbnail = playerChild.override.thumbnail;
              if (playerChild.override.hasOwnProperty('image'))
                player.image = playerChild.override.image;
              */
              Object.assign(player, playerChild.override);

              playerList.push(player);
            }
          }
        } catch (err) {
          console.log(playerChild._id + ' not found in players database');
        }
      });

      if (0 < playerList.length) {
        let thisRoster = {}
        Object.assign(thisRoster, roster);
        thisRoster.players = playerList;
        rosterList.push(thisRoster);
      }
    });

    //roster.squads = squads;
    return rosterList;
  }

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

      // Get the pushToken that uniquely identifies this device
      let pushToken = await Notifications.getExpoPushTokenAsync();
      this.setState({ pushToken });

      // POST the pushToken to your backend server from where you can retrieve it to send push notifications.
      return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pushToken: pushToken,
          expoExperience: '@' + appParams.expo.owner + '/' + appParams.expo.slug,
          appVersion: appParams.expo.version,
          platform: Platform.OS,
          platformVersion: Platform.Version
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
    this.setState({ response: response }, () => {
      if (callback) callback();
    });


  setLocation = location => this.setState({ location });

  setBearerToken = bearerToken => this.setState({ bearerToken });
  getBearerToken = () => { return this.state.bearerToken; }

  // contains .user and .token (above, bearerToken until its refactored out)
  // rename bearerToken from .token to .loginToken?
  setCurrentUser = (currentUser, callback) => {
    this.setState({ currentUser }, () => {
      if (callback)
        callback();
    });
  }
  getCurrentUser = () => { return this.state.currentUser }

  logoutCurrentUser = (callback) => {
    this.setState({ currentUser: null, bearerToken: null }, () => {
      if (callback)
        callback()
    })
  }

  // News Feed helper functions
  initNewPost = (callback) => {
    // inital settings for creating a new feed item
    let newPost = {
      sender: {
        user: this.state.currentUser.user.id,
        pushToken: this.state.pushToken
      },
      publishedAt: new Date().toISOString(),
      push: false,
      channel: null,
      channelData: null,
      locale: null,
      text: "",
      images: [],
      attachments: []
    }
    this.setCurrentPostDraft(newPost, callback);
  }
  setCurrentPostDraft = (post, callback) => {
    this.setState({ currentPostDraft: post }, () => { if (callback) callback(); });
  }

  getChannelBasicInfo = (channelId) => {
    let channelToReturn = {
      _id: -1,
      name: "No channel found",
      description: "",
      avatarUrl: "",
      headerUrl: ""
    };
    const channel = this.state.channels.find(channel => channel._id === channelId)

    if (channel && channel.active) {
      channelToReturn._id = channel._id;
      channelToReturn.name = channel.name;
      channelToReturn.description = channel.description;
      channelToReturn.avatarUrl = channel.avatarUrl;
      channelToReturn.headerUrl = channel.headerUrl;
    }

    return channelToReturn;
  }
  getChannelPermissions = (channelId, userId) => {
    const channel = this.state.channels.find(channel => channel._id === channelId)
    if (channel) {
      let user = channel.users.find(user => user._id === userId);

      if (user)
        return user;
      else
        return {}
    }
    else
      return {}
  }

  refreshFeed = async () => {
    const feed = await getFeed();
    this.setState({ feed, feedAtEnd: false });
  }

  loadMoreFeed = async () => {
    if (this.state.feed.length > 0 && !this.state.feedAtEnd) {
      const lastPublishedAt = this.state.feed[this.state.feed.length - 1].publishedAt;
      const moreFeed = await getMoreFeed(lastPublishedAt);
      const feedAtEnd = moreFeed.length < Settings.Home_PostsPerPage;
      const prevFeed = this.state.feed;
      const feed = prevFeed.concat(moreFeed);

      this.setState({ feed, feedAtEnd });
    }
  }

  hidePost = async (postId) => {
    await hidePost(postId, this.state.currentUser.token);

    let feedAfterHide = this.state.feed.filter((item) => item._id !== postId)
    this.setState({ feed: feedAfterHide })

    await this.refreshFeed();
  }
}
