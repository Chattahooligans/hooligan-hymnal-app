import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';

import state from '../state';

import Schema from '../data/song_schema';

import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin
// TODO: Create Song object, set title and lyrics based on data on this screen and pass to next screen (CapoConfirmSend)
//      maybe by reading in /src/data/song_schema.json as an object and setting those properties?
// Back Button on the nav bar for this screen, goes back to capo dashboard

@withNavigation
export default class CapoComposeSong extends React.Component {
  static navigationOptions = {
    title: 'Capo Compose Song',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <TextInput
            style={styles.titleField}
            placeholder="Title"
            onChangeText={this._setTitle}
          />
          <TextInput
            onChangeText={this._setLyrics}
            style={styles.lyricsField}
            multiline={true}
            placeholder="Lyrics"
          />
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={this._handlePressContinueButton}
              underlayColor="#fff"
            >
              <Ionicons
                size={23}
                style={{
                  color: '#fff',
                  marginTop: 3,
                  backgroundColor: 'transparent',
                  marginRight: 5
                }}
              />
              <SemiBoldText style={styles.bigButtonText}>Continue</SemiBoldText>
            </RectButton>
          </ClipBorderRadius>
          <NavigationBar
            animatedBackgroundOpacity={1}
            style={[
              Platform.OS === 'android'
                ? { height: Layout.headerHeight + Constants.statusBarHeight, flexDirection: 'row' }
                : null,
            ]}
            renderLeftButton={() => (
              <View
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
                  marginTop: Layout.notchHeight > 0 ? -5 : 0
                }}
              >
                <HeaderBackButton
                  onPress={() => this.props.navigation.goBack()}
                  tintColor="#fff"
                />
              </View>
            )}
            renderTitle={() => (
              <Text
                style={{
                  // gross dumb things
                  paddingTop: Platform.OS === 'android' ? 17 : 0,
                  marginTop: Layout.notchHeight > 0 ? -5 : 0,
                  fontFamily: 'open-sans-bold',
                  color: "#FFFFFF",
                  fontSize: 20,
                  paddingHorizontal: 0
                }}
              >
                Compose Song
              </Text>
            )}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _setTitle = title => {
    Schema.title = title;
  };

  _setLyrics = lyrics => {
    Schema.lyrics = lyrics;
  };

  _handlePressContinueButton = () => {
    console.log('song', Schema);
    state.currentSong = Schema;
    this.props.navigation.navigate('CapoConfirmSend');
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        {
          borderRadius: BORDER_RADIUS,
          overflow: 'hidden',
          marginTop: 10,
          marginBottom: 10
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingBottom: 8, paddingTop: Layout.headerHeight + Constants.statusBarHeight
  },
  titleField: {
    fontSize: 24,
    fontWeight: 'bold',
    height: 50
  },
  lyricsField: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top'
  },
  bigButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  }
});
