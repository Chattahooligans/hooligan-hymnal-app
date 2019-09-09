import React from 'react';
import {
  Animated,
  Linking,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Asset, LinearGradient, Notifications, WebBrowser, Video } from 'expo';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import FadeIn from 'react-native-fade-in-image';
import { View as AnimatableView } from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import AnimatedScrollView from '../components/AnimatedScrollView';
import NavigationBar from '../components/NavigationBar';
import TalksUpNext from '../components/TalksUpNext';
import MenuButton from '../components/MenuButton';
import VideoBackground from '../components/VideoBackground';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import { connectDrawerButton } from '../Navigation';
import { FontSizes, Layout, Colors } from '../constants';
import {
  HideWhenConferenceHasStarted,
  HideWhenConferenceHasEnded,
  ShowWhenConferenceHasEnded
} from '../utils';

import appParams from '../../app.json';

import { Palette, DefaultColors, Skin, websites, esp_websites, WEBSITE_URL, GOFUNDME_URL, GOFUNDME_ICON, GOFUNDME_BW_ICON, PRIDERAISER_ICON, PRIDERAISER_URL } from '../config/Settings';

let socialButtons = [];
let socialButtonsEsp = [];
let banners = [];

websites.forEach(item => {
  if (item.icon) {
    socialButtons.push(
      <TouchableOpacity
        key={item.url}
        onPress={() => {
          //WebBrowser.openBrowserAsync(item.url);
          Linking.openURL(item.url);
        }}
      >
        <Ionicons
          name={item.icon}
          size={30}
          style={{
            color: Skin.Home_SocialButtons,
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'transparent'
          }}
        />
      </TouchableOpacity>
    );
  } else if (item.image) {
    socialButtons.push(
      <TouchableOpacity
        key={item.url}
        onPress={() => {
          //WebBrowser.openBrowserAsync(item.url);
          Linking.openURL(item.url);
        }}
      >
        <Image
          source={item.image}
          tintColor={item.tint ? Skin.Home_SocialButtons : '' }
          style={{
            width: 30,
            height: 30,
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'transparent'
          }}
        />
      </TouchableOpacity>
    );
  }
});

esp_websites.forEach(item => {
  if (item.icon) {
    socialButtonsEsp.push(
      <TouchableOpacity
        key={item.url}
        onPress={() => {
          //WebBrowser.openBrowserAsync(item.url);
          Linking.openURL(item.url);
        }}
      >
        <Ionicons
          name={item.icon}
          size={30}
          style={{
            color: Skin.Home_SocialButtons,
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'transparent'
          }}
        />
      </TouchableOpacity>
    );
  } else if (item.image) {
    socialButtonsEsps.push(
      <TouchableOpacity
        key={item.url}
        onPress={() => {
          //WebBrowser.openBrowserAsync(item.url);
          Linking.openURL(item.url);
        }}
      >
        <Image
          source={item.image}
          style={{
            width: 30,
            height: 30,
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'transparent'
          }}
        />
      </TouchableOpacity>
    );
  }
});

/*
banners.push(
  <TouchableOpacity style={{flexDirection: 'row', backgroundColor: Palette.Prideraiser, paddingHorizontal: 10, paddingVertical: 3}} onPress={this._handlePressPrideraiser}>
    <Image
      source={PRIDERAISER_ICON}
      style={{
        width: 20,
        height: 20,
        marginTop: 1,
        marginBottom: 1,
        marginRight: 5,
        backgroundColor: 'transparent'
      }}
    />
    <MediumText style={{ fontSize: 16, color: Palette.White }}>
      Chattanooga Prideraiser
    </MediumText>
  </TouchableOpacity>
)
banners.push(
  <TouchableOpacity style={{flexDirection: 'row', backgroundColor: Palette.Sky, paddingHorizontal: 10, paddingVertical: 3}} onPress={this._handlePressGoFundMe}>
    <Image
      source={GOFUNDME_BW_ICON}
      tintColor={Skin.Home_SocialButtons}
      style={{
        width: 20,
        height: 20,
        marginTop: 1,
        marginBottom: 1,
        marginRight: 5,
        backgroundColor: 'transparent'
      }}
    />
    <MediumText style={{ fontSize: 16 }}>
      Youth Soccer Investment Crowdfunding
    </MediumText>
  </TouchableOpacity>
)*/ 

class Home extends React.Component {
  state = {
    scrollY: new Animated.Value(0)
  };

  static navigationOptions = {
    drawerLabel: 'HOME',
    header: null
  };

  componentDidMount() {
    Notifications.addListener(this._handleNotification);
    if (!this.props.globalData.state.songs) {
      this.props.globalData.loadData();
    }
  }

  _handleNotification = notification => {
    if (notification.origin === 'selected') {
      // notification was tapped, either from the app already open or from entering the app
      // console.log('SELECTED notification', notification.data.song.title);

      // TODO: open SingleSong screen and send it the Song object buried inside the notification

      // kinda like this but it doesn't work from this far out (because navigation doesn't exist yet)
      if (notification.data.song)
      {
        this.props.navigation.navigate('SingleSong', {
          song: notification.data.song
        });
      }

      // Maybe set app state and do something with it that way?
      // this.setState({ notification: notification });
    } else if (notification.origin === 'received') {
      // notification was received, either app was already open or it just opened up but not from the notification
      // no way to tell which?
      // console.log('RECEIVED notification', notification.data.song.title);
      // We don't necessarily want to do anything in this case
    }
  };

  render() {
    const { scrollY } = this.state;
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1 }}>
        <AnimatedScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 + Layout.notchHeight / 2 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          <View
            style={{
              backgroundColor: Palette.Navy,
              padding: 8,
              paddingTop: Layout.headerHeight - 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={styles.headerVideoLayer}>
              <VideoBackground />
              <View style={styles.headerVideoOverlay} />
            </View>
            <Image
              source={require('../../assets/home-big-c-logo.png')}
              style={{ height: 100, resizeMode: 'contain', marginTop: 20 }}
              tintColor={DefaultColors.HeaderText}
            />
            <View style={styles.headerContent}>
              <RegularText style={styles.headerText}>
                {appParams.expo.version}
              </RegularText>
            </View>
          </View>

          <DeferredHomeContent globalData={this.props.globalData} />
          <OverscrollView />
        </AnimatedScrollView>

        <NavigationBar
          renderLeftButton={() => <MenuButton />}
          animatedBackgroundOpacity={headerOpacity}
          style={{ marginLeft: -14, marginTop: 5}}
        />
      </View>
    );
  }
}

@withNavigation
class DeferredHomeContent extends React.Component {
  state = {
    ready: Platform.OS === 'android' ? false : true
  };

  componentDidMount() {
    this.props.globalData.registerForPushNotificationsAsync();
    if (this.state.ready) {
      return;
    }

    setTimeout(() => {
      this.setState({ ready: true });
    }, 200);
  }

  render() {
    if (!this.state.ready) {
      return null;
    }
    return (
      <AnimatableView animation="fadeIn" useNativeDriver duration={800}>
        <View style={{ marginBottom: banners.length > 0 ? 10 : 0 }}>
          {banners}
        </View>
        <TalksUpNext
          songs={this.props.globalData.state.songs}
          songbook={this.props.globalData.state.songbook}
          style={{ marginTop: 20, marginHorizontal: 15, marginBottom: 2 }}
        />
        <ClipBorderRadius style={{marginTop: -2}}>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSongbook}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-book"
              size={23}
              style={{
                color: '#fff',
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <MediumText style={styles.bigButtonText}>
              Songbook
            </MediumText>
          </RectButton>
        </ClipBorderRadius>
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressRoster}
            underlayColor="#fff"
          >
            <Ionicons
              name="md-people"
              size={23}
              style={{
                color: '#fff',
                backgroundColor: 'transparent',
                marginRight: 5
              }}
            />
            <MediumText style={styles.bigButtonText}>
              Roster
            </MediumText>
          </RectButton>
        </ClipBorderRadius>
        <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
          <MediumText style={{color: DefaultColors.ColorText, fontSize: FontSizes.bodyLarge, marginTop: 5}}>
            Find more great features in the <Ionicons
              name="md-menu"
              size={FontSizes.bodyLarge}
              style={{ backgroundColor: 'transparent', marginRight: 5}}
            /> menu, top left
          </MediumText>
        </View>
        <View flexDirection="row" style={{ marginHorizontal: 15, marginBottom: 10 }}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
            //WebBrowser.openBrowserAsync(item.url);
            Linking.openURL(WEBSITE_URL);
          }}>
            <MediumText style={{color: DefaultColors.ColorText}}>Visit: </MediumText>
            <UnderlineText>http://comeandjoin.us</UnderlineText>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 15, flex: 1 }}>
          <MediumText style={{color: DefaultColors.ColorText}}>Follow us</MediumText>
        </View>
        <View flexDirection="row" style={{ paddingHorizontal: 20 }}>
          {socialButtons}
        </View>
        <View style={{ marginHorizontal: 15, flex: 1 }}>
          <MediumText style={{color: DefaultColors.ColorText}}>Síguenos</MediumText>
        </View>
        <View flexDirection="row" style={{ paddingHorizontal: 20 }}>
          {socialButtonsEsp}
        </View>
      </AnimatableView>
    );
  }

  _handlePressSongbook = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Songbook'
      })
    );
  };

  _handlePressRoster = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Roster'
      })
    );
  };

  _handlePressPrideraiser = () => {
    Linking.openURL(PRIDERAISER_URL);
  };
  _handlePressGoFundMe = () => {
    Linking.openURL(GOFUNDME_URL);
  };
}

const OverscrollView = () => (
  <View
    style={{
      position: 'absolute',
      top: -400,
      height: 400,
      left: 0,
      right: 0,
      backgroundColor: Palette.Navy
    }}
  />
);

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
  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
    width: 100 + '%',
    marginTop: 5
  },
  headerVideoLayer: {
    ...StyleSheet.absoluteFillObject
  },
  headerVideoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Palette.Navy,
    opacity: 0.8
  },
  headerText: {
    color: DefaultColors.HeaderText,
    fontSize: 14
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
  },
  seeAllSongs: {
    fontSize: FontSizes.normalButton,
    color: Palette.Navy
  }
});

export default withUnstated(Home, { globalData: GlobalDataContainer });
