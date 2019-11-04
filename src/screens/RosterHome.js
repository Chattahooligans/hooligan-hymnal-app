import React from 'react';
import { Keyboard, Image, Platform, StyleSheet, View, Text } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { Colors, FontSizes } from '../constants';
import { Skin, DefaultColors, Palette } from '../config/Settings';

import Roster from './Roster';
import Player from './Player';
import SingleSong from './SingleSong';
import TwitterList from './TwitterList';
import RosterFoes from './RosterFoes';
import RosterFoePlayers from './RosterFoePlayers';
import { defaultFormatUtc } from 'moment';
// NO IDEA WHY THIS DOES NOT WORK
import Screens from './';
import i18n from "../../i18n";

const FriendsNavigator = StackNavigator(
    {
        Roster: { screen: Roster },
        Player: { screen: Player },
        RosterSingleSong: { screen: SingleSong },
        TwitterList: { screen: TwitterList }
    },
    {
        navigationOptions: { 
            header: null,
            tabBarLabel: ({tintColor}) => { 
                return <View style={styles.tabContainer}>
                    <Ionicons name={Skin.Roster_FriendsTabIcon} color={tintColor} size={23} style={styles.tabIcon} />
                    <MediumText style={{ color: tintColor, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rosterhome.friends')}</MediumText>
                </View>
            }
        }
    }
);
const FoesNavigator = StackNavigator(
    {
        Foes: { screen: RosterFoes },
        FoePlayers: { screen: RosterFoePlayers }
    },
    {
        navigationOptions: {
            header: null,
            tabBarLabel: ({tintColor}) => { 
                return <View style={styles.tabContainer}>
                    <Ionicons name={Skin.Roster_FoesTabIcon} color={tintColor} size={23} style={styles.tabIcon} />
                    <MediumText style={{ color: tintColor, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rosterhome.foes')}</MediumText>
                </View>
            }
        }
    }
);
let tabs = {
    Friends: FriendsNavigator,
    Foes: FoesNavigator
}
//if(i18n.getFlexDirection() == "row-reverse") {
//    tabs = {Foes: FoesNavigator, Friends: FriendsNavigator}
//}
const RosterTabs = TabNavigator(
    tabs,
    {
        navigationOptions: {
            swipeEnabled: true,
            tabBarPosition: 'top',
        },
        tabBarOptions: {
            style: { backgroundColor: Skin.Roster_TabBackground },
            indicatorStyle: { backgroundColor: Skin.Roster_ActiveTabIndicator },
            activeTintColor: Skin.Roster_ActiveTabLabel,
            inactiveTintColor: Skin.Roster_InactiveTabLabel
          }
    }
);
export default class RosterHome extends React.Component {
    static navigationOptions = {
      title: i18n.t('screens.rosterhome.title'),
      ...NavigationOptions
    };
  
    render() {
      return (
        <LoadingPlaceholder>
            <RosterTabs></RosterTabs>
        </LoadingPlaceholder>
      );
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
    tabContainer: {
        flexDirection: i18n.getFlexDirection(), 
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabIcon: {
        backgroundColor: 'transparent',
        marginRight: 5
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
      flexDirection: i18n.getFlexDirection()
    },
    bigButtonText: {
      fontSize: FontSizes.normalButton,
      color: DefaultColors.ButtonText,
      textAlign: 'center'
    }
  });
  