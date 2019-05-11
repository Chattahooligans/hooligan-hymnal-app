import React from 'react';
import {
  Keyboard,
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import NavigationOptions from '../config/NavigationOptions';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';

// TODO: Hard code password for now
// Add top nav bar with Back button
//      on back button press, redirect to Home screen
// alternately, is there a home button for the top nav bar?
//
// If password is correct, enable capo mode (using AsyncStorage?) and go back to CapoHome.js
// If password is incorrect, show invalid password message

@withNavigation
class CapoLogin extends React.Component {
  static navigationOptions = {
    headerTitle: 'Capo Dashboard',
    ...NavigationOptions
  };

  state = {
    password: ''
  };

  componentDidMount() {
    this.setData();
  }

  setData = () => {
    if (this.props.globalData.state.unlocked) {
      Keyboard.dismiss();
      this.props.navigation.navigate('CapoHome');
    }
  }  

  render() {
    return (
      <View style={styles.container}>
        <RegularText style={styles.instructions}>Enter password to unlock</RegularText>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          onChangeText={this._setPassword}
          value={this.state.value}
        />
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSubmitButton}
            underlayColor="#fff"
          >
            <MediumText style={styles.bigButtonText}>Unlock</MediumText>
          </RectButton>
        </ClipBorderRadius>
      </View>
    );
  }

  _setPassword = password => this.setState({ password });

  _handlePressSubmitButton = () => {
    if (this.state.password === '$4 beer') {
      Keyboard.dismiss();
      this.props.globalData.toggleUserAuth();
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
    backgroundColor: DefaultColors.ButtonBackground,
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
    color: DefaultColors.ButtonText,
    textAlign: 'center'
  }
});

export default withUnstated(CapoLogin, { globalData: GlobalDataContainer });
