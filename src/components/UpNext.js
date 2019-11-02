import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment-timezone';
import { BoldText, MediumText } from './StyledText';
import SongCard from './SongCard';
import GoalkeeperNicknameCard from './GoalkeeperNicknameCard';
import { Colors, FontSizes } from '../constants';
import { getFeaturedSong } from '../data';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { HYMNAL_ADDRESS } from '../config/server';
import { DefaultColors } from '../config/Settings';
import i18n from '../../i18n';

const CAPO_MESSAGE_ENDPOINT = HYMNAL_ADDRESS + '/api/notifications/last';
const GOALKEEPER_NICKNAME_ENDPOINT = HYMNAL_ADDRESS + '/api/goalkeeperNicknames/last';

const GK_EXPIRATION_HOURS = 2;

class UpNext extends React.Component {
  state = {
    capoMessage: null,
    song: getFeaturedSong(this.props.songbook, this.props.songs),
    goalkeeperNickname: null
  };

  render() {
    const featuredSection = this.state.capoMessage || this.state;
    const goalkeeperNickname = this.state.goalkeeperNickname;

    let goalkeeperNicknameDisplay;
    if (goalkeeperNickname) {
      let createdAt = new Date(goalkeeperNickname.createdAt)
      createdAt.setHours(createdAt.getHours() + GK_EXPIRATION_HOURS)
      let now = new Date();
      if (now < createdAt)
        goalkeeperNicknameDisplay = <GoalkeeperNicknameCard goalkeeperNickname={goalkeeperNickname}/>
    }

    return (
      <View style={[{ marginHorizontal: 10, marginBottom: 10, paddingBottom: 10 }, this.props.style]}>
        <View
          style={{
            flex: 1,
            flexDirection: i18n.getFlexDirection(),
            justifyContent: 'space-between'
          }}
        >
          <MediumText style={{ color: DefaultColors.ColorText, fontSize: FontSizes.title }}>{this.state.label}</MediumText>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressRefreshButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-refresh"
              size={23}
              style={{
                color: DefaultColors.ColorText,
                backgroundColor: 'transparent'
              }}
            />
          </RectButton>
        </View>
        <SongCard
          key={featuredSection.song._id}
          song={featuredSection.song}
          />
          {goalkeeperNicknameDisplay}
      </View>
    );
  }

  componentWillMount() {
    this.setState({
      label: i18n.t('components.upnext.upnext'),
    });
    this._refreshNotification();
    this._refreshGoalkeeperNickname();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.songs && this.props.songs) {
      this._setFeaturedSong();
    }
  }

  _handlePressRefreshButton = () => {
    this._refreshNotification();
    this._refreshGoalkeeperNickname();
  };

  _setFeaturedSong = () => {
    this.setState({
      song: getFeaturedSong(this.props.songbook, this.props.songs)
    });
  };

  _refreshNotification = async () => {
    // run this on load
    // on a schedule or maybe not
    // and trigger it when we receive a notification to refresh this screen
    fetch(CAPO_MESSAGE_ENDPOINT)
      .then(response => response.json())
      .then(responseJson => {
        try {
          // if this is valid ??
          if (responseJson.song) {
            this.setState({
              capoMessage: {
                song: responseJson.song
              }
            });
          } else {
            this.setState({
              capoMessage: null
            });
          }
        } catch (err) {
          // no data returns a json parsing error
          this.setState({
            capoMessage: null
          });
        }
      });
  };

  _refreshGoalkeeperNickname = async () => {
    // run this on load
    // on a schedule or maybe not
    // and trigger it when we receive a notification to refresh this screen
    fetch(GOALKEEPER_NICKNAME_ENDPOINT)
      .then(response => response.json())
      .then(responseJson => {
        try {
          // if this is valid ??
          if (responseJson.nickname) {
            this.setState({
              goalkeeperNickname: responseJson
            });
          } else {
            this.setState({
              goalkeeperNickname: null
            });
          }
        } catch (err) {
          // no data returns a json parsing error
          this.setState({
            goalkeeperNickname: null
          });
        }
      });
  };
}

const styles = StyleSheet.create({
  bigButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingRight: 3,
    marginRight: 3,
    overflow: 'hidden',
    flexDirection: i18n.getFlexDirection()
  }
});

export default UpNext;
