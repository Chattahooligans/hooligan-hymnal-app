import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  Keyboard
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

import SongView from '../components/SongView';

import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import { Location, Permissions } from 'expo';

import CapoMessageSchema from '../data/capo_message_schema';
import { HYMNAL_ADDRESS } from '../config/server';

const CAPO_MESSAGE_ENDPOINT = HYMNAL_ADDRESS + '/api/notification';

@withNavigation
export default class CapoConfirmSend extends React.Component {
  static navigationOptions = {
    title: 'Capo Confirmation',
    ...NavigationOptions
  };

  componentWillMount() {
    Keyboard.dismiss();

    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      state.location = null;
    } else {
      let location = await Location.getCurrentPositionAsync({});
      state.location = location;
    }
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SongView song={state.currentSong} />
          <View style={styles.buttonContainer}>
            <ClipBorderRadius>
              <RectButton
                style={styles.bigButton}
                onPress={this._handlePressSendOnlyButton}
                underlayColor="#fff"
              >
                <SemiBoldText style={styles.bigButtonText}>
                  Send Only
                </SemiBoldText>
                <Ionicons
                  name="md-send"
                  size={23}
                  style={{
                    color: '#fff',
                    marginTop: 3,
                    backgroundColor: 'transparent',
                    marginRight: 5
                  }}
                />
              </RectButton>
            </ClipBorderRadius>
            <ClipBorderRadius>
              <RectButton
                style={styles.bigButton}
                onPress={this._handlePressSendAndNotifyButton}
                underlayColor="#fff"
              >
                <SemiBoldText style={styles.bigButtonText}>
                  Send &amp; Notify
                </SemiBoldText>
                <Ionicons
                  name="md-notifications"
                  size={23}
                  style={{
                    color: '#fff',
                    marginTop: 3,
                    backgroundColor: 'transparent',
                    marginRight: 5
                  }}
                />
              </RectButton>
            </ClipBorderRadius>
          </View>
          <NavigationBar
            animatedBackgroundOpacity={1}
            style={[
              Platform.OS === 'android'
                ? {
                    height: Layout.headerHeight + Constants.statusBarHeight,
                    flexDirection: 'row'
                  }
                : null
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
                  color: '#FFFFFF',
                  fontSize: 20,
                  paddingHorizontal: 0
                }}
              >
                Confirm?
              </Text>
            )}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _handlePressSendOnlyButton = () => {
    console.log('send only');
    this._sendMessage(false);
  }
  _handlePressSendAndNotifyButton = () => {
    console.log('send and notify');
    this._sendMessage(true);
  }

  _sendMessage = (pushFlag) => {
    console.log('inside send', pushFlag);

    CapoMessageSchema.sender = 'capo example';
    CapoMessageSchema.send_time = new Date();
    if (null == state.location) {
      CapoMessageSchema.sender_latitude = '';
      CapoMessageSchema.sender_longitude = '';
    } else {
      CapoMessageSchema.sender_latitude = state.location.coords.latitude;
      CapoMessageSchema.sender_longitude = state.location.coords.longitude;
    }
    CapoMessageSchema.song = state.currentSong;
    //console.log('---- object to wrap in a message to server ----\n', CapoMessageSchema);

    fetch(CAPO_MESSAGE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: CapoMessageSchema.sender,
        send_time: CapoMessageSchema.send_time,
        sender_latitude: CapoMessageSchema.sender_latitude,
        sender_longitude: CapoMessageSchema.sender_longitude,
        message: '',
        push: pushFlag,
        announcement: undefined,
        song: {
          category: CapoMessageSchema.song.category,
          create_time: CapoMessageSchema.song.create_time,
          update_time: CapoMessageSchema.song.update_time,
          title: CapoMessageSchema.song.title,
          tags: CapoMessageSchema.song.tags,
          lyrics: CapoMessageSchema.song.lyrics,
          tbd_various_boolean_flags:
            CapoMessageSchema.song.tbd_various_boolean_flags,
          reference_title: CapoMessageSchema.song.reference_title,
          reference_link: CapoMessageSchema.song.reference_link,
          instructions: CapoMessageSchema.song.instructions,
          player_id: CapoMessageSchema.song.player_id,
          override_html: CapoMessageSchema.song.override_html,
          delete_local: CapoMessageSchema.song.delete_local
        }
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // this is the output from the server for sending our capo_message
        console.log(JSON.stringify(responseJson));
        // we REALLY need to confirm this got sent
        //alert("success or fail message? do we even know?");
        // if fail, stay here
        // if success
        this.props.navigation.navigate('Home');
      });
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
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
    paddingBottom: 8,
    paddingTop: Layout.headerHeight + Constants.statusBarHeight
  },
  buttonContainer: {
    flexDirection: "row",
    width: 100 + '%',
    justifyContent: "space-between",
    alignItems: "stretch"
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
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  }
});
