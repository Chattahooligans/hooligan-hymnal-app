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
import { withNavigation } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import state from '../state';
import { BoldText, SemiBoldText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';

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
    headerTitle: 'Capo Dashboard',
    ...NavigationOptions
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Enter password to unlock</Text>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          onChangeText={this._setPassword}
        />
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSubmitButton}
            underlayColor="#fff"
          >
            <SemiBoldText style={styles.bigButtonText}>Unlock</SemiBoldText>
          </RectButton>
        </ClipBorderRadius>
      </View>
    );
  }

  _setPassword = password => {
    state.password = password;
  };

  _handlePressSubmitButton = () => {
    if (state.password === '$4 beer') {
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
    paddingBottom: 8,
    paddingTop: 15
  },
  instructions: {
    fontSize: 18
  },
  textInput: {
    fontSize: 18,
    padding: 8
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
