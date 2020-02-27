import React from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, MediumText } from '../components/StyledText';

import Schema from '../data/song_schema';

import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import i18n from "../../i18n";

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin
// TODO: Create Song object, set title and lyrics based on data on this screen and pass to next screen (CapoConfirmSend)
//      maybe by reading in /src/data/song_schema.json as an object and setting those properties?
// Back Button on the nav bar for this screen, goes back to capo dashboard

@withNavigation
class CapoComposeSong extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t('screens.capocompose.title'),
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    ),
    headerRight: (
        <Ionicons
            name="md-code-download"
            size={23}
            style={{
                color: '#fff',
                backgroundColor: 'transparent',
                marginRight: 16
            }}
            onPress={() => Keyboard.dismiss()}
        />
    )
  });

  render() {
    return (
      <LoadingPlaceholder>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <TextInput
            style={styles.titleField}
            placeholder={i18n.t('screens.capocompose.songtitle')}
            onChangeText={this._setTitle}
          />
          <TextInput
            onChangeText={this._setLyrics}
            style={styles.lyricsField}
            multiline={true}
            placeholder={i18n.t('screens.capocompose.songlyrics')}
          />
          <ClipBorderRadius>
            <RectButton
              style={styles.bigButton}
              onPress={this._handlePressContinueButton}
              underlayColor="#fff"
            >
              <Ionicons
                size={23}
                style={{
                  color: '#fff',
                  marginTop: 3,
                  backgroundColor: 'transparent',
                  marginRight: 5
                }}
              />
              <MediumText style={styles.bigButtonText}>{i18n.t('screens.capocompose.continue')}</MediumText>
            </RectButton>
          </ClipBorderRadius>
        </KeyboardAvoidingView>
      </LoadingPlaceholder>
    );
  }

  _setTitle = title => {
    Schema.title = title;
  };

  _setLyrics = lyrics => {
    Schema.lyrics = lyrics;
  };

  _handlePressContinueButton = () => {
    this.props.globalData.setCurrentSong(Schema);
    this.props.navigation.navigate('CapoConfirmSendSong');
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        {
          borderRadius: BORDER_RADIUS,
          overflow: 'hidden',
          marginTop: 10,
          marginBottom: 10
        },
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
    padding: 10
  },
  titleField: {
    fontSize: 24,
    fontWeight: 'bold',
    height: 50
  },
  lyricsField: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top'
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

export default withUnstated(CapoComposeSong, {
  globalData: GlobalDataContainer
});
