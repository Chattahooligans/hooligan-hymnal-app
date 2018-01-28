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

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

@withNavigation
export default class CapoHome extends React.Component {
    static navigationOptions = {
        title: 'Capo Dashboard',
        ...NavigationOptions
      };
  
    render() {
    return (
        <LoadingPlaceholder>
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={_handlePressSelectSongButton}
                    underlayColor="#fff">
                    <Ionicons
                        name="md-musical-notes"
                        size={23}
                        style={{
                            color: '#fff',
                            marginTop: 3,
                            backgroundColor: 'transparent',
                            marginRight: 5
                        }}
                    />
                    <SemiBoldText style={styles.bigButtonText}>Select Song</SemiBoldText>
                </RectButton>
            </ClipBorderRadius>
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={this._handlePressComposeSongButton}
                    underlayColor="#fff">
                    <Ionicons
                        name="md-add"
                        size={23}
                        style={{
                            color: '#fff',
                            marginTop: 3,
                            backgroundColor: 'transparent',
                            marginRight: 5
                        }}
                    />
                    <SemiBoldText style={styles.bigButtonText}>Compose Song</SemiBoldText>
                </RectButton>
            </ClipBorderRadius>
        </LoadingPlaceholder>
    );
  }

  _handlePressSelectSongButton = () => {
    // WHY DON'T YOU WORK YOU BASTARD
    console.log("select song");
    this.props.navigation.navigate('CapoSelectSong');
  };

  _handlePressComposeSongButton = () => {
    console.log("compose song");
    this.props.navigation.navigate('CapoComposeSong');
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
