import React from 'react';
import { Keyboard, Image, Platform, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';
import { Skin, DefaultColors, Settings } from '../config/Settings';
import i18n from "../../i18n";

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

@withNavigation
export default class CapoHome extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.capohome.title'),
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSelectSongButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-musical-notes"
              size={23}
              style={{
                color: '#fff',
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <MediumText style={styles.bigButtonText}>
            {i18n.t('screens.capohome.selectsong')}
            </MediumText>
          </RectButton>
        </ClipBorderRadius>
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressComposeSongButton}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-add"
              size={23}
              style={{
                color: '#fff',
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <MediumText style={styles.bigButtonText}>
            {i18n.t('screens.capohome.composesong')}
            </MediumText>
          </RectButton>
        </ClipBorderRadius>
        { Settings.CapoHome_GKNicknameEnabled && 
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={this._handlePressGoalkeeperNicknameButton}
              underlayColor="#fff"
            >
              <Ionicons
                name="md-hand"
                size={23}
                style={{
                  color: '#fff',
                  backgroundColor: 'transparent',
                  marginRight: 5
                }}
              />
              <MediumText style={styles.bigButtonText}>
              {i18n.t('screens.capohome.gknickname')}
              </MediumText>
            </RectButton>
          </ClipBorderRadius>
        }
      </LoadingPlaceholder>
    );
  }

  _handlePressSelectSongButton = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('CapoSelectSong');
  };

  _handlePressComposeSongButton = () => {
    this.props.navigation.navigate('CapoComposeSong');
  };

  _handlePressGoalkeeperNicknameButton = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('CapoSetGoalkeeperNickname');
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
