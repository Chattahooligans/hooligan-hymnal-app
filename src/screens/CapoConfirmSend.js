import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';

import SongView from '../components/SongView';

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

// set a Song object, either selected from our list or created on the Compose screen
// Back Button on the nav bar for this screen, goes back to wherever we came from and/or capo dashboard if that is easier

@withNavigation
export default class CapoConfirmSend extends React.Component {
    static navigationOptions = {
        title: 'Capo Confirmation',
        ...NavigationOptions
      };
  
    render() {
    return (
        <LoadingPlaceholder>
            <SongView />
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={this._handlePressComposeSongButton}
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
                    <SemiBoldText style={styles.bigButtonText}>Send Notification</SemiBoldText>
                </RectButton>
            </ClipBorderRadius>
        </LoadingPlaceholder>
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
