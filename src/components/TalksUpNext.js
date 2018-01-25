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

export default class TalksUpNext extends React.Component {
  constructor(props) {
    super(props);

    let featuredSongs = getFeaturedSongs();
    let dateTime;
    let time;
    if (featuredSongs) {
      dateTime = featuredSongs[0].dateTime;
      time = featuredSongs[0].time;
    }

    this.state = {
      featuredSongs,
      dateTime,
      time
    };
  }

  render() {
    const { featuredSongs } = this.state;

    return (
      <View style={[{ marginHorizontal: 10 }, this.props.style]}>
        <SemiBoldText style={{ fontSize: FontSizes.title }}>
          {'Featured Song'}
        </SemiBoldText>
        {this._renderDateTime()}
        {featuredSongs.map(song => (
          <SongCard
            key={song.guid}
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
}

const styles = StyleSheet.create({
  time: {
    color: Colors.faint,
    fontSize: FontSizes.subtitle
  }
});
