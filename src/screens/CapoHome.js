import React from 'react';
import { Keyboard, Image, Platform, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';
import { Skin, DefaultColors, Settings } from '../config/Settings';
import i18n from "../../i18n";

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

@withNavigation
class CapoHome extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.capohome.title'),
    ...NavigationOptions
  };

  render() {
    console.log("Logged in as " + JSON.stringify(this.props.globalData.state.currentUser))
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <RegularText>Logged in as </RegularText>
          <BoldText>{this.props.globalData.state.currentUser.user.email}</BoldText>
          <RegularText>{this.props.globalData.state.pushToken}</RegularText>
        </View>
        <BigButton
          label={i18n.t('screens.capohome.postcreate')}
          iconName="md-paper"
          onPress={this._handlePressPostCreateButton} />
        <View style={{ marginVertical: 10 }} />
        <BoldText style={{ paddingHorizontal: 10 }}>Legacy Features - soon to be deprecated</BoldText>
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
        {Settings.CapoHome_GKNicknameEnabled &&
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
      </View>
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


  _handlePressPostCreateButton = () => {
    // later, we'll check for existing drafts and prompt the user on what to do
    // ...or create an entire drafts feature
    let nav = this.props.navigation
    function navToPostCreate() {
      nav.navigate('PostCreate')
    }
    this.props.globalData.initNewPost(navToPostCreate);
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

export default withUnstated(CapoHome, { globalData: GlobalDataContainer });