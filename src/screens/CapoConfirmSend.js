import React from 'react';
import { Text, Image, Platform, StyleSheet, View } from 'react-native';
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

import CapoMessageSchema from '../data/capo_message_schema';

@withNavigation
export default class CapoConfirmSend extends React.Component {
  static navigationOptions = {
    title: 'Capo Confirmation',
    ...NavigationOptions
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log("Oops, this will not work on Sketch in an Android emulator. Try it on your device!");
    } else {
      this._getLocationAsync();
    }
  };

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
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={this._handlePressSendButton}
              underlayColor="#fff"
            >
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
              <SemiBoldText style={styles.bigButtonText}>
                Send Notification
              </SemiBoldText>
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
                Confirm?
              </Text>
            )}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _handlePressSendButton = () => {
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
    console.log('---- object to wrap in a message to server ----\n', CapoMessageSchema);
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
    paddingBottom: 8, paddingTop: Layout.headerHeight + Constants.statusBarHeight
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
