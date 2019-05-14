import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  Keyboard
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, MediumText } from '../components/StyledText';

import GoalkeeperNicknameCard from '../components/GoalkeeperNicknameCard';

import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import { Location, Permissions } from 'expo';

import CapoMessageSchema from '../data/capo_message_schema';
import RemoteGoalkeeperNickname from '../server_store/RemoteGoalkeeperNickname';

@withNavigation
class CapoConfirmSendGoalkeeperNickname extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Confirm GK Nickname?',
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    )
  });

  componentWillMount() {
    Keyboard.dismiss();

    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      //this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.props.globalData.setLocation(null);
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.props.globalData.setLocation(location);
    }
  };

  render() {
    const { goalkeeperNickname } = this.props.globalData.state;
    return (
      <LoadingPlaceholder style={{paddingBottom: 8}}>
        <View style={styles.container}>
            <View style={styles.gkContainer}>
                <GoalkeeperNicknameCard goalkeeperNickname={goalkeeperNickname} />
            </View>
            <View style={styles.buttonContainer}>
            <ClipBorderRadius>
              <RectButton
                style={styles.bigButton}
                onPress={this._handlePressSendOnlyButton}
                underlayColor="#fff"
              >
                <MediumText style={styles.bigButtonText}>
                  Send Only
                </MediumText>
                <Ionicons
                  name="md-send"
                  size={23}
                  style={{
                    color: '#fff',
                    backgroundColor: 'transparent',
                    marginRight: 5
                  }}
                />
              </RectButton>
            </ClipBorderRadius>
            <ClipBorderRadius>
              <RectButton
                style={styles.bigButton}
                onPress={this._handlePressSendAndNotifyButton}
                underlayColor="#fff"
              >
                <MediumText style={styles.bigButtonText}>
                  Send &amp; Notify
                </MediumText>
                <Ionicons
                  name="md-notifications"
                  size={23}
                  style={{
                    color: '#fff',
                    backgroundColor: 'transparent',
                    marginRight: 5
                  }}
                />
              </RectButton>
            </ClipBorderRadius>
          </View>
        </View>
      </LoadingPlaceholder>
    );
  }

  _handlePressSendOnlyButton = () => {
    console.log('send only');
    this._postGoalkeeperNickname(false);
  };
  _handlePressSendAndNotifyButton = () => {
    console.log('send and notify');
    this._postGoalkeeperNickname(true);
  };

  _postGoalkeeperNickname = pushFlag => {
    const { goalkeeperNickname, token } = this.props.globalData.state;

    let nickname = new RemoteGoalkeeperNickname();

    nickname
      .create({
        sender: token,
        push: pushFlag,
        nickname: goalkeeperNickname.nickname,
        backgroundColor: goalkeeperNickname.backgroundColor,
        textColor: goalkeeperNickname.textColor
      })
      .then(responseJson => {
        // this is the output from the server for sending our capo_message
        console.log(JSON.stringify(responseJson));

        this.props.globalData.setResponse(responseJson);
        // we REALLY need to confirm this got sent
        //alert("success or fail message? do we even know?");
        // if fail, stay here
        // if success
        this.props.navigation.popToTop();
        this.props.navigation.navigate('Home');
      });
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
    container: {
        flex: 1,
        width: 100 + '%',
        paddingBottom: 8
    },
    gkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8
    },
    buttonContainer: {
      flexDirection: 'row',
      width: 100 + '%',
      justifyContent: 'space-evenly',
      alignItems: 'stretch'
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
      textAlign: 'center',
      marginRight: 15
    }
  });

export default withUnstated(CapoConfirmSendGoalkeeperNickname, {
  globalData: GlobalDataContainer
});
