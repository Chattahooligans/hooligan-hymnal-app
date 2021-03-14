import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Container } from "unstated";
import { getSongs } from "../services/songsService";
import { getSongbooks } from "../services/songbooksService";
import { getPlayers } from "../services/playersService";
import { getRosters } from "../services/rostersService";
import { getFoes } from "../services/foesService";
import { getChannels } from "../services/channelsService";
import { getFeed, getMoreFeed, hidePost } from "../services/feedService";
import { Urls, Settings } from "../../config";
import appJson from "../../app.json";
import htmlColors from "../data/htmlColors.json";

const PUSH_ENDPOINT = Urls.HooliganHymnalServer + "/api/pushToken";

export default class GlobalDataContainer extends Container {
  state = {
    currentSong: {},
    location: null,
    pushToken: null,
    currentUser: null,
    showSongbookCover: true,
    songbook: {
      songbookTitle: "",
      organization: "",
      description: "",
      frontCover: "",
      chapters: [],
    },
    songs: null,
    songbookContents: null,
    songList: null,
    rosters: {
      rosterTitle: "",
      season: "",
      players: [],
    },
    players: null,
    foes: null,
    currentFoe: null,
    goalkeeperNickname: null,
    channels: null,
    htmlColors: null,
    currentPostDraft: null,
    feed: [],
    feedAtEnd: false,
    response: null,
    loadDataComplete: false,
    debug: "",
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
        loadDataComplete: true,
      });
    } catch (e) {
      alert("loadData exception: " + e.toString());
    }
  };

  verifyRoster = (players, rosters) => {
    let rosterList = [];

    rosters.forEach((roster) => {
      let playerList = [];

      roster.players.forEach((playerChild) => {
        try {
          let player = players.find((player) => player._id === playerChild._id);

          if (player) {
            // overrides for Academy data
            let clonePlayer = { ...player };
            if (playerChild.hasOwnProperty("override")) {
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
          } else {
            //alert('creating new ' + JSON.stringify(playerChild));
            console.log(playerChild._id + " not found in players database");

            if (playerChild.hasOwnProperty("override")) {
              // make a temp player
              let player = {
                name: "",
                position: "",
                squadNumber: "",
                bio: "",
              };

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
          console.log(playerChild._id + " not found in players database");
        }
      });

      if (0 < playerList.length) {
        let thisRoster = {};
        Object.assign(thisRoster, roster);
        thisRoster.players = playerList;
        rosterList.push(thisRoster);
      }
    });

    //roster.squads = squads;
    return rosterList;
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this._setLocation(location);
  };

  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== "granted") {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );

        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== "granted") {
        return;
      }

      // Get the pushToken that uniquely identifies this device
      let pushTokenObject = await Notifications.getExpoPushTokenAsync();
      let pushToken = pushTokenObject.data;
      this.setState({ pushToken });

      // POST the pushToken to your backend server from where you can retrieve it to send push notifications.
      return fetch(PUSH_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pushToken: pushToken,
          expoExperience: "@" + appJson.expo.owner + "/" + appJson.expo.slug,
          appVersion: appJson.expo.version,
          platform: Platform.OS,
          platformVersion: Platform.Version,
        }),
      });
    } catch (e) {
      //
    }
  };

  setShowSongbookCover = (show) => this.setState({ showSongbookCover: show });
  computeSongbook = (callback) => {
    let ToCData = [];
    let songList = [];
    let songViews = [];
    let tocPageLabel = 1;
    this.state.songbook.chapters.forEach((chapterChild) => {
      let chapterSongList = [];

      chapterChild.songs.forEach((songChild, index) => {
        try {
          let songOriginal = this.state.songs.find(
            (song) => song._id === songChild._id
          );
          let song = {};
          Object.assign(song, songOriginal);
          song.chapterTitle = chapterChild.chapterTitle;
          song.pageLabel = tocPageLabel;
          songList.push(song);
          chapterSongList.push(song);
          tocPageLabel++;
        } catch (err) {
          console.log(songChild._id + " not found in songs database " + err);
        }
      });

      if (0 < chapterSongList.length)
        ToCData.push({
          title: chapterChild.chapterTitle,
          data: chapterSongList,
        });
    });

    this.setState({ songbookContents: ToCData, songList }, () => {
      if (callback) callback();
    });
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

  setLocation = (location) => this.setState({ location });

  // contains .user and .token (bearerToken)
  setCurrentUser = (currentUser, callback) => {
    this.setState({ currentUser }, () => {
      if (callback) callback();
    });
  };
  getCurrentUser = () => {
    return this.state.currentUser;
  };

  logoutCurrentUser = (callback) => {
    this.setState({ currentUser: null }, () => {
      if (callback) callback();
    });
  };

  // News Feed helper functions
  initNewPost = (callback) => {
    // inital settings for creating a new feed item
    let newPost = {
      sender: {
        user: this.state.currentUser.user.id,
        pushToken: this.state.pushToken,
      },
      publishedAt: new Date().toISOString(),
      push: false,
      channel: null,
      channelData: null,
      locale: null,
      text: "",
      images: [],
      attachments: [],
    };
    this.setCurrentPostDraft(newPost, callback);
  };
  setCurrentPostDraft = (post, callback) => {
    this.setState({ currentPostDraft: post }, () => {
      if (callback) callback();
    });
  };

  getChannelBasicInfo = (channelId) => {
    let channelToReturn = {
      _id: -1,
      name: "No channel found",
      description: "",
      avatarUrl: "",
      headerUrl: "",
    };
    const channel = this.state.channels.find(
      (channel) => channel._id === channelId
    );

    if (channel && channel.active) {
      channelToReturn._id = channel._id;
      channelToReturn.name = channel.name;
      channelToReturn.description = channel.description;
      channelToReturn.avatarUrl = channel.avatarUrl;
      channelToReturn.headerUrl = channel.headerUrl;
    }

    return channelToReturn;
  };
  getChannelPermissions = (channelId, userId) => {
    const channel = this.state.channels.find(
      (channel) => channel._id === channelId
    );
    if (channel) {
      let user = channel.users.find((user) => user._id === userId);

      if (user) return user;
      else return {};
    } else return {};
  };

  refreshFeed = async () => {
    const feed = await getFeed();
    this.setState({ feed, feedAtEnd: false });
  };

  loadMoreFeed = async () => {
    if (this.state.feed.length > 0 && !this.state.feedAtEnd) {
      const lastPublishedAt = this.state.feed[this.state.feed.length - 1]
        .publishedAt;
      const moreFeed = await getMoreFeed(lastPublishedAt);
      const feedAtEnd = moreFeed.length < Settings.Home_PostsPerPage;
      const prevFeed = this.state.feed;
      const feed = prevFeed.concat(moreFeed);

      this.setState({ feed, feedAtEnd });
    }
  };

  hidePost = async (postId) => {
    await hidePost(postId, this.state.currentUser.token);

    let feedAfterHide = this.state.feed.filter((item) => item._id !== postId);
    this.setState({ feed: feedAfterHide });

    await this.refreshFeed();
  };

  appendDebug = (text) => {
    let debug = this.state.debug + "\n" + text;
    this.setState({ debug });
  };
}
