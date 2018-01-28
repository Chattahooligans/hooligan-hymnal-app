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

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

// set a Song object, either selected from our list or created on the Compose screen
// Back Button on the nav bar for this screen, goes back to wherever we came from and/or capo dashboard if that is easier

// Send message to server based on /src/data/capo_message_schema.json

@withNavigation
export default class CapoConfirmSend extends React.Component {
  static navigationOptions = {
    title: 'Capo Confirmation',
    ...NavigationOptions
  };

  render() {
    return (
      <View style={styles.container}>
        <SongView song={state.currentSong} />
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressComposeSongButton}
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
    );
  }

  _handlePressComposeSongButton = () => {
    // send notification
    // do some stuff, go back to CapoHome on confirmation?
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
