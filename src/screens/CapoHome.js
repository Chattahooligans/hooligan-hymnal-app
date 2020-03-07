import React from 'react';
import { Button, Keyboard, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
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
import { Skin, DefaultColors, Settings, HOOLIGAN_HYMNAL_SERVER_ADDRESS } from '../config/Settings';
import i18n from "../../i18n";

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin

@withNavigation
class CapoHome extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.capohome.title'),
    ...NavigationOptions
  };

  render() {
    if (null == this.props.globalData.state.currentUser) {
      this.props.navigation.popToTop();
      return (
        <RegularText>Not logged in</RegularText>
      )
    }

    let permissions = []
    Object.keys(this.props.globalData.state.currentUser.user).forEach((key) => {
      if (key.toLowerCase().includes("allowed")) {
        permissions.push(key + ":" + this.props.globalData.state.currentUser.user[key])
      }
    })
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <BigButton
              label={i18n.t('screens.capohome.postcreate')}
              iconName="md-paper"
              onPress={this._handlePressPostCreateButton} />
          </View>
          <View style={{ padding: 10 }}>
            <BoldText>DEBUG</BoldText>
            <MediumText>Connected to:</MediumText>
            <RegularText>{HOOLIGAN_HYMNAL_SERVER_ADDRESS}</RegularText>
            <MediumText>Logged in as:</MediumText>
            <RegularText>{this.props.globalData.state.currentUser.user.email}</RegularText>
            <MediumText>Device ID (pushToken):</MediumText>
            <RegularText>{this.props.globalData.state.pushToken}</RegularText>
            <MediumText>Permissions:</MediumText>
            <RegularText>{permissions.join()}</RegularText>
          </View>
        </ScrollView>
        <Button title={i18n.t('screens.capohome.logout')} color={DefaultColors.ButtonBackground} onPress={this._handlePressLogoutButton} />
      </View>
    );
  }

  _handlePressPostCreateButton = () => {
    // later, we'll check for existing drafts and prompt the user on what to do
    // ...or create an entire drafts feature
    let nav = this.props.navigation
    function navToPostCreate() {
      nav.navigate('PostCreate')
    }
    this.props.globalData.initNewPost(navToPostCreate);
  };

  _handlePressLogoutButton = () => {
    let nav = this.props.navigation
    function navLogout() {
      nav.popToTop();
    }
    this.props.globalData.logoutCurrentUser(navLogout);
  }
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