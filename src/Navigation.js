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

const HomeNavigation = StackNavigator(
  {
    Home: { screen: Screens.Home },
    SingleSong: { screen: Screens.SingleSong }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'HOME'
    }
  }
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
    },
    Player: { screen: Screens.Player },
    RosterSingleSong: { screen: Screens.SingleSong }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'ROSTER'
    }
  }
);

const EventsNavigation = StackNavigator(
  {
    Events: {
      screen: Screens.Events
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'EVENTS ↗️'
    }
  }
);

const StandingsNavigation = StackNavigator(
  {
    Events: {
      screen: Screens.Standings
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: 'NPSL STANDINGS ↗️'
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
    About: {
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
    Home: { screen: HomeNavigation },
    Songbook: { screen: SongbookNavigation },
    Roster: { screen: RosterNavigation },
    Events: { screen: EventsNavigation },
    Standings: { screen: StandingsNavigation },
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
    Drawer: { screen: Drawer }
  },
  {
    ...DefaultStackConfig,
    headerMode: 'none'
  }
);
