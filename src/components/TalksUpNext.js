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

import state from '../state';

import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const CAPO_MESSAGE_ENDPOINT = 'https://chattahooligan-hymnal.herokuapp.com/api/notifications/last';

export default class TalksUpNext extends React.Component {
  constructor(props) {
    super(props);

    let song = getFeaturedSongs();

    // if there's a notification that is relevant
    // set label to "Up Next"

    this.state = {
      label: "Featured Song",
      song: getFeaturedSongs()[0]
    };
  }

  render() {
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
        <SongCard
          key={this.state.song._id}
          song={this.state.song}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </View>
    );
  }

  componentWillMount() {
    this._refreshNotification();
  }

  _handlePressRefreshButton = () => {
    this._refreshNotification();
  };

  _refreshNotification = async () => {
    // run this on load
    // on a schedule or maybe not
    // and trigger it when we receive a notification to refresh this screen
    fetch(CAPO_MESSAGE_ENDPOINT).then((response) => response.json())
    .then((responseJson) => {
      try{
        // if this is valid
        if (true) {
          state.label = "Up Next";
          state.song = responseJson.song;

          this.setState(previousState => {
            return { label: "Up Next", song: responseJson.song };
          });

        } else {
          state.label = "Featured Song";
          state.song = getFeaturedSongs()[0];
        }
      }
      catch (err) {
        // no data returns a json parsing error
        state.label = "Featured Song";
        state.song = getFeaturedSongs()[0];
      }

      console.log(JSON.stringify(responseJson.song.title));
    })
    
    /*
    fetch(CAPO_MESSAGE_ENDPOINT).then((response) => {
      console.log("response", response);
    })
    */
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
