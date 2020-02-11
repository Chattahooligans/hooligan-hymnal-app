import React from 'react';
import { Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Screens from './screens';
import CustomDrawer from './components/CustomDrawer';
import NavigationOptions from './config/NavigationOptions'; 
import { Palette } from './config/Settings';
import i18n from "../i18n";

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
    SinglePost: { screen: Screens.SinglePost },
    SingleSong: { screen: Screens.SingleSong },
    Player: { screen: Screens.Player },
    TwitterList: { screen: Screens.TwitterList },
    Channel: { screen: Screens.Channel }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.home')
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
      drawerLabel: i18n.t('navigation.songbook')
    }
  }
);

const RosterNavigation = StackNavigator(
  {
    RosterHome: { screen: Screens.RosterHome }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.roster')
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
      drawerLabel: i18n.t('navigation.events')
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
      drawerLabel: i18n.t('navigation.standings')
    }
  }
);

const ShopNavigation = StackNavigator(
  {
    Events: {
      screen: Screens.Shop
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.shop')
    }
  }
);

const VolunteerNavigation = StackNavigator(
  {
    Events: {
      screen: Screens.Volunteer
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.volunteer')
    }
  }
);

const InstrumentationNavigation = StackNavigator(
  {
    Events: {
      screen: Screens.Instrumentation
    }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.instrumentation')
    }
  }
);

const CapoHomeNavigation = StackNavigator(
  {
    CapoLogin: { screen: Screens.CapoLogin },
    CapoHome: { screen: Screens.CapoHome },
    CapoSelectSong: { screen: Screens.CapoSelectSong },
    CapoComposeSong: { screen: Screens.CapoComposeSong },
    CapoConfirmSendSong: { screen: Screens.CapoConfirmSendSong },
    CapoSetGoalkeeperNickname: { screen: Screens.CapoSetGoalkeeperNickname },
    CapoConfirmSendGoalkeeperNickname: { screen: Screens.CapoConfirmSendGoalkeeperNickname },
    PostCreate: { screen: Screens.PostCreate },
    PostPreview: { screen: Screens.PostPreview }
  },
  {
    ...DefaultStackConfig,
    navigationOptions: {
      drawerLabel: i18n.t('navigation.capo')
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
      drawerLabel: i18n.t('navigation.about')
    }
  }
);

class NullDrawerLabel extends React.Component {
  render() {
    return null;
  }
}

const RedCard = () => (<Screens.RefereeCard name="RedCard" color={Palette.RedCard} />)
const YellowCard = () => (<Screens.RefereeCard name="YellowCard" color={Palette.YellowCard} />)
const RedCardNavigation = StackNavigator(
  {
    RedCard
  },
  {
    navigationOptions: {
      ...NavigationOptions,
      title: i18n.t('screens.refereecard.titlered'),
      headerStyle: { backgroundColor: Palette.RedCard },
      drawerLabel: NullDrawerLabel
    }
  }
);
const YellowCardNavigation = StackNavigator(
  {
    YellowCard
  },
  {
    navigationOptions: {
      ...NavigationOptions,
      title: i18n.t('screens.refereecard.titleyellow'),
      headerStyle: { backgroundColor: Palette.YellowCard },
      drawerLabel: NullDrawerLabel
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
    Shop: { screen: ShopNavigation },
    Volunteer: { screen: VolunteerNavigation },
    Instrumentation: { screen: InstrumentationNavigation },
    CapoHome: { screen: CapoHomeNavigation },
    About: { screen: AboutNavigation },
    RedCard: { screen: RedCardNavigation },
    YellowCard: { screen: YellowCardNavigation },
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
