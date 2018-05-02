import React from 'react';
import { Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Screens from './screens';
import CustomDrawer from './components/CustomDrawer';

const { width: deviceWidth } = Dimensions.get('window');

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
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'SONGBOOK'
    }
  }
);

const RosterNavigation = StackNavigator(
  {
    Roster: {
      screen: Screens.Roster
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'ROSTER'
    }
  }
);

const CapoHomeNavigation = StackNavigator(
  {
    CapoLogin: { screen: Screens.CapoLogin },
    CapoHome: {
      screen: Screens.CapoHome
    },
    CapoSelectSong: { screen: Screens.CapoSelectSong },
    CapoConfirmSend: { screen: Screens.CapoConfirmSend },
    CapoComposeSong: { screen: Screens.CapoComposeSong }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'CAPO DASHBOARD'
    }
  }
);

const AboutNavigation = StackNavigator(
  {
    AboutList: {
      screen: Screens.About
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'ABOUT'
    }
  }
);

const Drawer = DrawerNavigator(
  {
    Home: { screen: Screens.Home },
    Songbook: { screen: SongbookNavigation },
    Roster: { screen: RosterNavigation },
    CapoHome: { screen: CapoHomeNavigation },
    About: { screen: AboutNavigation }
  },
  {
    contentComponent: props => <CustomDrawer {...props} />,
    drawerWidth: deviceWidth - 80
  }
);

export default StackNavigator(
  {
    Drawer: { screen: Drawer },
    SingleSong: { screen: Screens.SingleSong },
    Player: { screen: Screens.Player }
  },
  {
    ...DefaultStackConfig,
    headerMode: 'none'
  }
);
