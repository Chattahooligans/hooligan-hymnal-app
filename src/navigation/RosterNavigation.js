import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontSizes } from '../constants';
import { MediumText } from '../components/StyledText';

import Screens from '../screens';
import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import { Settings, Skin } from '../../config';
import i18n from '../i18n';

const RosterTabs = createMaterialTopTabNavigator();

const TeamStack = createStackNavigator();
const FoesStack = createStackNavigator();
const CombinedStack = createStackNavigator();

const TeamNavigation = (props) => {
    return (
        <TeamStack.Navigator {...props}>
            <TeamStack.Screen name="Roster" component={Screens.RosterTeam} />
            <TeamStack.Screen name="Player" component={Screens.Player}
                options={{ headerShown: false }} />
            <TeamStack.Screen name="SingleSong" component={Screens.SingleSong} />
            <TeamStack.Screen name="TwitterList" component={Screens.TwitterList} />
        </TeamStack.Navigator>
    )
}

const FoesNavigation = (props) => {
    return (
        <FoesStack.Navigator screenOptions={{ headerShown: false }}>
            <FoesStack.Screen name="Foes" component={Screens.RosterFoes} />
            <FoesStack.Screen name="FoePlayers" component={Screens.RosterFoePlayers} />
        </FoesStack.Navigator>
    )
}

export const RosterTabsNavigation = () => {
    return (
        <RosterTabs.Navigator
            initialRouteName="Team"
            swipeEnabled="true"
            tabBarOptions={{
                style: { backgroundColor: Skin.Roster_TabBackground },
                indicatorStyle: { backgroundColor: Skin.Roster_ActiveTabIndicator },
                activeTintColor: Skin.Roster_ActiveTabLabel,
                inactiveTintColor: Skin.Roster_InactiveTabLabel
            }}>
            <RosterTabs.Screen
                name="Team"
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (
                            <View style={styles.tabContainer}>
                                <MaterialCommunityIcons name={Skin.Roster_FriendsTabIcon} color={color} size={23} style={styles.tabIcon} />
                                <MediumText style={{ color: color, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rostertabs.friends')}</MediumText>
                            </View>
                        )
                    }
                }}>
                {() => <TeamNavigation screenOptions={{ headerShown: false }} />}
            </RosterTabs.Screen>
            <RosterTabs.Screen
                name="Foes" component={FoesNavigation}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (
                            <View style={styles.tabContainer}>
                                <MaterialCommunityIcons name={Skin.Roster_FoesTabIcon} color={color} size={23} style={styles.tabIcon} />
                                <MediumText style={{ color: color, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rostertabs.foes')}</MediumText>
                            </View>
                        )
                    }
                }} />
        </RosterTabs.Navigator>
    )
}

// check settings for something like FoesEnabled idk
export default RosterNavigation = () => {
    if (Settings.Roster_FoesEnabled) {
        return (
            <CombinedStack.Navigator screenOptions={DefaultStackScreenOptions}>
                <CombinedStack.Screen
                    name="Roster"
                    component={RosterTabsNavigation}
                    options={{ headerTitle: i18n.t('screens.rostertabs.title') }} />
            </CombinedStack.Navigator>
        )
    }
    else {
        return <TeamNavigation screenOptions={DefaultStackScreenOptions} />
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: i18n.getFlexDirection(),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabIcon: {
        backgroundColor: 'transparent',
        marginRight: 5
    }
});