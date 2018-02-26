import React from 'react';
import PropTypes from 'prop-types';
import {
  TabRouter,
  TabNavigator,
  StackNavigator,
  createNavigator,
  createNavigationContainer
} from 'react-navigation';
import NavigatorTypes from 'react-navigation/src/navigators/NavigatorTypes';
import withCachedChildNavigation from 'react-navigation/src/withCachedChildNavigation';
import SceneView from 'react-navigation/src/views/SceneView';
import {
  BackHandler,
  Platform,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import { Constants } from 'expo';
import { TabViewAnimated } from 'react-native-tab-view';
import {
  DrawerLayoutAndroid,
  BorderlessButton,
  RectButton
} from 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import ResourceSavingContainer from 'react-native-resource-saving-container';
import hoistStatics from 'hoist-non-react-statics';

import { Colors, FontSizes, Layout } from './constants';
import Screens from './screens';
import TabBarBottom from './components/TabBarBottom';
import { SemiBoldText, BoldText } from './components/StyledText';

import state from './state';

const DrawerComponent =
  Platform.OS === 'android' ? DrawerLayoutAndroid : DrawerLayout;

export function connectDrawerButton(WrappedComponent) {
  const ConnectedDrawerButton = (props, context) => {
    return (
      <WrappedComponent
        {...props}
        openDrawer={context.openDrawer}
        closeDrawer={context.closeDrawer}
        toggleDrawer={context.toggleDrawer}
      />
    );
  };

  ConnectedDrawerButton.contextTypes = {
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    toggleDrawer: PropTypes.func
  };

  return hoistStatics(ConnectedDrawerButton, WrappedComponent);
}

const DefaultStackConfig = {
  cardStyle: {
    backgroundColor: '#fafafa'
  }
};

const SongsNavigation = StackNavigator(
  {
    SpeakerList: {
      screen: Screens.Songs
    }
  },
  DefaultStackConfig
);

const SongbookNavigation = StackNavigator(
  {
    Songbook: {
      screen: Screens.Songbook
    }
  },
  DefaultStackConfig
);

const RosterNavigation = StackNavigator(
  {
    Roster: {
      screen: Screens.Roster
    }
  },
  DefaultStackConfig
);

const CapoHomeNavigation = StackNavigator(
  {
    CapoHome: {
      screen: Screens.CapoHome
    }
  },
  DefaultStackConfig
);

const AboutNavigation = StackNavigator(
  {
    AboutList: {
      screen: Screens.About
    }
  },
  DefaultStackConfig
);

const DrawerRouteConfig = {
  Home: { screen: Screens.Home, title: 'Home' },
  Songbook: { screen: SongbookNavigation, title: 'Songbook' },
  Roster: { screen: RosterNavigation, title: 'Roster' },
  CapoHome: { screen: CapoHomeNavigation, title: 'Capo Dashboard' },
  About: { screen: AboutNavigation, title: 'About' }
};

const DrawerRouter = TabRouter(DrawerRouteConfig);

class DrawerScene extends React.PureComponent {
  state = {
    visible: true
  };

  setVisible = visible => {
    this.setState({ visible });
  };

  render() {
    const { route, screenProps } = this.props;
    const childNavigation = this.props.childNavigationProps[route.key];
    const ScreenComponent = DrawerRouter.getComponentForRouteName(
      route.routeName
    );

    return (
      <ResourceSavingContainer
        style={{ flex: 1, overflow: 'hidden' }}
        visible={this.state.visible}
      >
        <SceneView
          screenProps={screenProps}
          component={ScreenComponent}
          navigation={childNavigation}
        />
      </ResourceSavingContainer>
    );
  }
}

const DRAWER_WIDTH = Math.min(Math.max(Layout.window.width - 80, 280), 350);
@withCachedChildNavigation
class DrawerView extends React.Component {
  _isDrawerOpen = false;
  _scenes = {};

  static childContextTypes = {
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    toggleDrawer: PropTypes.func
  };

  getChildContext() {
    const openDrawer = options => this._drawerRef.openDrawer(options);
    const closeDrawer = options => this._drawerRef.closeDrawer(options);
    const toggleDrawer = options =>
      this._isDrawerOpen ? closeDrawer(options) : openDrawer(options);

    return {
      openDrawer,
      closeDrawer,
      toggleDrawer
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      return;
    }

    // Dumb hack to have our listener take priority over built in listener
    setTimeout(() => {
      BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }, 800);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onBackPress = () => {
    if (this._drawerIsOpen) {
      this._drawerRef.closeDrawer();
      return true;
    }

    return false;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state !== this.props.navigation.state) {
      const currentRoute = this.props.navigation.state.routes[
        this.props.navigation.state.index
      ];
      const nextRoute =
        nextProps.navigation.state.routes[nextProps.navigation.state.index];

      if (currentRoute.key !== nextRoute.key) {
        this._updateVisibility(currentRoute, nextRoute);
      }
    }
  }

  _renderScene = ({ route }) => {
    return (
      <DrawerScene
        ref={view => {
          this._scenes[route.key] = view;
        }}
        {...this.props}
        route={route}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <DrawerComponent
          ref={view => {
            this._drawerRef = view;
          }}
          onDrawerOpen={() => {
            this._drawerIsOpen = true;
          }}
          onDrawerClose={() => {
            this._drawerIsOpen = false;
          }}
          drawerWidth={DRAWER_WIDTH}
          keyboardDismissMode="on-drag"
          edgeWidth={60}
          drawerPosition={DrawerComponent.positions.Left}
          drawerType="front"
          drawerBackgroundColor="#333333"
          renderNavigationView={this._renderNavigationView}
        >
          <View style={{ flex: 1 }} key="container">
            <View
              key="tab-view-container"
              style={{
                flex: 1,
                paddingTop:
                  Platform.OS === 'android' ? Constants.statusBarHeight : 0
              }}
            >
              <TabViewAnimated
                navigationState={this.props.navigation.state}
                animationEnabled={false}
                renderScene={this._renderScene}
                onIndexChange={this._navigateToScreen}
                swipeEnabled={false}
                lazy
              />
            </View>
            <View
              key="status-bar-underlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height:
                  Platform.OS === 'android' ? Constants.statusBarHeight : 0,
                backgroundColor: Colors.green
              }}
            />
          </View>
        </DrawerComponent>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  _renderNavigationView = () => {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <Image
            source={require('./assets/drawer-hero-background.png')}
            style={{
              height: 140 + Layout.notchHeight,
              width: DRAWER_WIDTH,
              resizeMode: 'cover'
            }}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(3, 46, 85, 0.57)' }
            ]}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: Layout.notchHeight + 20
              }
            ]}
          >
            <Image
              source={require('./assets/drawer-hero-logo.png')}
              style={{
                width: 200,
                height: 50,
                resizeMode: 'contain'
              }}
            />
          </View>
        </View>
        <View style={styles.drawerButtons}>
          {/* make sure the buttons here are in the same order as in route config */}
          {this._renderButtons([
            { route: 'Home', title: 'Home' },
            { route: 'Songbook', title: 'Songbook' },
            { route: 'Roster', title: 'Roster' },
            { route: 'CapoHome', title: 'Capo Dashboard' },
            { route: 'About', title: 'About' }
          ])}
        </View>
      </View>
    );
  };

  _renderButtons = buttonConfig => {
    const selectedIndex = this.props.navigation.state.index;

    return buttonConfig.map((config, i) => (
      <DrawerButton
        key={i}
        onPress={() => this._navigateToScreen(i)}
        selected={selectedIndex === i}
      >
        {config.title}
      </DrawerButton>
    ));
  };

  _updateVisibility = (currentRoute, nextRoute) => {
    const currentScene = this._scenes[currentRoute.key];
    const nextScene = this._scenes[nextRoute.key];

    if (nextScene) {
      nextScene.setVisible(true);
    }
    if (currentScene) {
      currentScene.setVisible(false);
    }
  };

  _navigateToScreen = index => {
    this._drawerRef.closeDrawer();
    const nextRoute = this.props.navigation.state.routes[index];
    console.log(nextRoute.routeName);
    if (nextRoute.routeName === 'CapoHome') {
      if (state.unlocked === true) {
        this.props.navigation.navigate('CapoHome');
      } else {
        this.props.navigation.navigate('CapoLogin');
      }
    } else {
      this.props.navigation.navigate(nextRoute.routeName);
    }
  };
}

const DrawerNavigation = createNavigationContainer(
  createNavigator(DrawerRouter, DrawerRouteConfig, {}, NavigatorTypes.TABS)(
    props => <DrawerView {...props} />
  )
);

class DrawerButton extends React.Component {
  render() {
    return (
      <RectButton
        onPress={this.props.onPress}
        style={{
          backgroundColor: this.props.selected
            ? 'rgba(255,255,255,0.1)'
            : '#333333'
        }}
      >
        <View
          style={{
            height: 50,
            width: DRAWER_WIDTH,
            justifyContent: 'center',
            paddingHorizontal: 5
          }}
        >
          <SemiBoldText style={styles.drawerButtonText}>
            {this.props.children.toUpperCase()}
          </SemiBoldText>
        </View>
      </RectButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: FontSizes.normalButton,
    padding: 10
  },
  drawerButtons: {
    paddingTop: 0
  },
  drawerNavigationContainer: {}
});

export default StackNavigator(
  {
    Primary: { screen: DrawerNavigation },
    SingleSong: { screen: Screens.SingleSong },
    TableOfContents: { screen: Screens.TableOfContents },
    CapoSelectSong: { screen: Screens.CapoSelectSong },
    CapoLogin: { screen: Screens.CapoLogin },
    CapoConfirmSend: { screen: Screens.CapoConfirmSend },
    CapoComposeSong: { screen: Screens.CapoComposeSong },
    Player: { screen: Screens.Player }
  },
  {
    ...DefaultStackConfig,
    headerMode: 'none'
  }
);
