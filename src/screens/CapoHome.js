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
        <RegularText>Logged in as </RegularText>
        <BoldText>{this.props.globalData.state.currentUser.user.email}</BoldText>
        <RegularText>{this.props.globalData.state.pushToken}</RegularText>
        <View style={{ marginVertical: 10 }} />
        <BigButton
          label={i18n.t('screens.capohome.postcreate')}
          iconName="md-paper"
          onPress={this._handlePressPostCreateButton} />
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
}

const styles = StyleSheet.create({

});

export default withUnstated(CapoHome, { globalData: GlobalDataContainer });