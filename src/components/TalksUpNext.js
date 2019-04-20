import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment-timezone';
import { BoldText, MediumText } from './StyledText';
import SongCard from './SongCard';
import { Colors, FontSizes } from '../constants';
import { getFeaturedSong } from '../data';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { HYMNAL_ADDRESS } from '../config/server';

const CAPO_MESSAGE_ENDPOINT = HYMNAL_ADDRESS + '/api/notifications/last';

class TalksUpNext extends React.Component {
  state = {
    capoMessage: null,
    label: 'Up Next',
    song: getFeaturedSong(this.props.songbook, this.props.songs)
  };

  render() {
    const featuredSection = this.state.capoMessage || this.state;

    return (
      <View style={[{ marginHorizontal: 10 }, this.props.style]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <MediumText style={{ fontSize: FontSizes.title }}>
            {this.state.label}
          </MediumText>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressRefreshButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-refresh"
              size={23}
              style={{
                color: Colors.green,
                backgroundColor: 'transparent'
              }}
            />
          </RectButton>
        </View>
        <SongCard
          key={featuredSection.song._id}
          song={featuredSection.song}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </View>
    );
  }

  componentWillMount() {
    this._refreshNotification();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.songs && this.props.songs) {
      this._setFeaturedSong();
    }
  }

  _handlePressRefreshButton = () => {
    this._refreshNotification();
  };

  _setFeaturedSong = () => {
    this.setState({
      label: 'Up Next',
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
                label: 'Up Next',
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
    flexDirection: 'row'
  }
});

export default TalksUpNext;
