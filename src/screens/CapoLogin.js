import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import state from '../state';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';

import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';

// TODO: Hard code password for now
// Add top nav bar with Back button
//      on back button press, redirect to Home screen
// alternately, is there a home button for the top nav bar?
//
// If password is correct, enable capo mode (using AsyncStorage?) and go back to CapoHome.js
// If password is incorrect, show invalid password message

@withNavigation
export default class CapoLogin extends React.Component {
  static navigationOptions = {
    title: 'Capo Login',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <Text style={styles.instructions}>Enter password to unlock</Text>
          <TextInput style={styles.textInput} autoFocus={true} onChangeText={this._setPassword} />
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={this._handlePressSubmitButton}
              underlayColor="#fff"
            >
              <SemiBoldText style={styles.bigButtonText}>Unlock</SemiBoldText>
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
                Capo Dashboard Locked
              </Text>
            )}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _setPassword = password => {
    state.password = password;
  };

  _handlePressSubmitButton = () => {
    if (state.password === 'beccaispretty') {
      state.unlocked = true;
      this.props.navigation.navigate('CapoHome');
    }
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
  instructions: {
    fontSize: 18
  },
  textInput: {
    fontSize: 18,
    padding: 8
  },
  error: {
    color: '#FF0000'
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
