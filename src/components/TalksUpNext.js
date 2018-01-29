import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import moment from 'moment-timezone';

import { BoldText, RegularText, SemiBoldText } from './StyledText';
import SongCard from './SongCard';
import { Colors, FontSizes } from '../constants';
import {
  findRandomTalk,
  findNextTalksAfterDate,
  getFeaturedSongs
} from '../data';
import { conferenceHasEnded } from '../utils';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default class TalksUpNext extends React.Component {
  constructor(props) {
    super(props);

    let label = "Featured Song";

    let featuredSongs = getFeaturedSongs();
    let dateTime;
    let time;
    if (featuredSongs) {
      dateTime = featuredSongs[0].dateTime;
      time = featuredSongs[0].time;
    }

    // if there's a notification that is relevant
    // set label to "Up Next"

    this.state = {
      featuredSongs,
      dateTime,
      time,
      label
    };
  }

  render() {
    const { featuredSongs } = this.state;

    return (
      <View style={[{ marginHorizontal: 10 }, this.props.style]}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <SemiBoldText style={{ fontSize: FontSizes.title }}>
            {this.state.label}
          </SemiBoldText>
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
        {this._renderDateTime()}
        {featuredSongs.map(song => (
          <SongCard
            key={song._id}
            song={song}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        ))}
      </View>
    );
  }

  _renderDateTime() {
    if (conferenceHasEnded()) {
      return null;
    }

    const { dateTime, time } = this.state;

    if (dateTime) {
      return (
        <RegularText style={styles.time}>
          {moment(dateTime)
            .tz('America/Chicago')
            .format('dddd, MMM Do')}, {time}
        </RegularText>
      );
    } else {
      // handle after conf thing
    }
  }

  _handlePressRefreshButton = async () => {
    console.log("refresh pressed");
  };
}

const styles = StyleSheet.create({
  time: {
    color: Colors.faint,
    fontSize: FontSizes.subtitle
  },
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
