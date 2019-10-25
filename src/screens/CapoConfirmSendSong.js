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

import SongView from '../components/SongView';

import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import { Location, Permissions } from 'expo';

import CapoMessageSchema from '../data/capo_message_schema';
import SongSchema from '../data/song_schema';
import RemoteNotifications from '../server_store/RemoteNotifications';

@withNavigation
class CapoConfirmSendSong extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Confirm Song?',
    ...NavigationOptions,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
    )
  });

  componentWillMount() {
    Keyboard.dismiss();
    //this._getLocationAsync();
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
    const { currentSong } = this.props.globalData.state;
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SongView song={currentSong} />
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
    this._sendMessage(false);
  };
  _handlePressSendAndNotifyButton = () => {
    console.log('send and notify');
    this._sendMessage(true);
  };

  _sendMessage = pushFlag => {
    const { currentSong, location, token } = this.props.globalData.state;

    CapoMessageSchema.sender = token;
    CapoMessageSchema.send_time = new Date();
    if (null == location) {
      CapoMessageSchema.sender_latitude = '';
      CapoMessageSchema.sender_longitude = '';
    } else {
      CapoMessageSchema.sender_latitude = location.coords.latitude;
      CapoMessageSchema.sender_longitude = location.coords.longitude;
    }
    CapoMessageSchema.song = Object.assign({}, currentSong);
    delete CapoMessageSchema.song._id;
    //console.log('---- object to wrap in a message to server ----\n', CapoMessageSchema);

    let notifications = new RemoteNotifications();
    let bearerToken = "Bearer " + this.props.globalData.getBearerToken();
    notifications
      .create({
        sender: CapoMessageSchema.sender,
        send_time: CapoMessageSchema.send_time,
        sender_latitude: CapoMessageSchema.sender_latitude,
        sender_longitude: CapoMessageSchema.sender_longitude,
        message: '',
        push: pushFlag,
        announcement: null,
        song: CapoMessageSchema.song,
        goalkeeperNickname: null
      }, bearerToken)
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
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: DefaultColors.ButtonText,
    textAlign: 'center',
    marginRight: 15
  }
});

export default withUnstated(CapoConfirmSendSong, {
  globalData: GlobalDataContainer
});
