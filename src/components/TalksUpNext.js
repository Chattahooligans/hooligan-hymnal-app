import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import moment from 'moment-timezone';

import { BoldText, RegularText, SemiBoldText } from './StyledText';
import TalkCard from './TalkCard';
import { Colors, FontSizes } from '../constants';
import { findRandomTalk, findNextTalksAfterDate } from '../data';
import { conferenceHasEnded } from '../utils';

export default class TalksUpNext extends React.Component {
  constructor(props) {
    super(props);

    let nextTalks = conferenceHasEnded()
      ? findRandomTalk()
      : findNextTalksAfterDate();
    let dateTime;
    let time;
    if (nextTalks) {
      dateTime = nextTalks[0].dateTime;
      time = nextTalks[0].time;
    }

    this.state = {
      nextTalks,
      dateTime,
      time,
    };
  }

  render() {
    const { nextTalks } = this.state;

    return (
      <View style={[{ marginHorizontal: 10 }, this.props.style]}>
        <SemiBoldText style={{ fontSize: FontSizes.title }}>
          {conferenceHasEnded() ? 'A great talk from 2017' : 'Coming up next'}
        </SemiBoldText>
        {this._renderDateTime()}
        {nextTalks.map(talk => (
          <TalkCard
            key={talk.title}
            talk={talk}
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
    fontSize: FontSizes.subtitle,
  },
});
