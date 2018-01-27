import React from 'react';
import { Image, Platform, StyleSheet, View, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';
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
        title: 'Capo Login',
        ...NavigationOptions
      };
  
    render() {
    return (
        <LoadingPlaceholder>
            <Text style={style.instructions}>Enter password to unlock</Text>
            <TextInput />
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={this._handlePressSubmitButton}
                    underlayColor="#fff">
                    <Ionicons
                        size={23}
                        style={{
                            color: '#fff',
                            marginTop: 3,
                            backgroundColor: 'transparent',
                            marginRight: 5
                        }}
                    />
                    <SemiBoldText style={styles.bigButtonText}>Submit</SemiBoldText>
                </RectButton>
            </ClipBorderRadius>
            <Text style={style.error}>Invalid password</Text>
        </LoadingPlaceholder>
    );
  }

  _handlePressSubmitButton = () => {
    console.log("submit PW");
    // just hard code a password for now?
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
  instructions: {
      
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
  },
});
