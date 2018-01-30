import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';

import SaveIconWhenSaved from './SaveIconWhenSaved';
import { BoldText, RegularText, SemiBoldText } from './StyledText';
import { conferenceHasEnded, getSpeakerAvatarURL } from '../utils';
import { Colors, FontSizes } from '../constants';
import { findSongData } from '../data';

@withNavigation
export default class SongCard extends React.Component {
  render() {
    const { song } = this.props;

    if (!song) {
      return this._renderPlaceholderForNextYear();
    }

    return (
      <RectButton
        onPress={this._handlePress}
        style={[styles.button, this.props.style]}
        activeOpacity={0.05}
      >
        <View style={styles.songInfoRow}>
          <BoldText style={styles.songTitle}>{song.title}</BoldText>
          <RegularText
            style={styles.songLyrics}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {song.lyrics}
          </RegularText>
          <SemiBoldText>
            See More...
          </SemiBoldText>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.navigation.navigate('SingleSong', {
      song: this.props.song
    });
  };
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row'
  },
  headerRowAvatarContainer: {
    paddingRight: 10
  },
  headerRowInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 5
  },
  speakerName: {
    fontSize: FontSizes.bodyTitle
  },
  organizationName: {
    color: Colors.faint,
    fontSize: FontSizes.bodyLarge
  },
  songInfoRow: {
    paddingTop: 10
  },
  songLyrics: {
    paddingTop: 10
  },
  songTitle: {
    fontSize: FontSizes.bodyLarge
  },
  songLocation: {
    fontSize: FontSizes.bodyLarge,
    color: Colors.faint,
    marginTop: 10
  },
  nextYear: {
    textAlign: 'center',
    fontSize: FontSizes.title,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 }
      },
      android: {
        elevation: 3
      }
    })
  }
});
