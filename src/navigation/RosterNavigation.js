import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontSizes } from '../constants';
import { MediumText } from '../components/StyledText';

import Screens from '../screens';
import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import { Skin } from '../config/Settings';
import i18n from "../../i18n";

//const RosterTabs = createMaterialTopTabNavigator();

const TeamStack = createStackNavigator();
const FoesStack = createStackNavigator();

const TeamNavigation = () => {
    return (
        <TeamStack.Navigator screenOptions={DefaultStackScreenOptions}>
            <TeamStack.Screen name="Roster" component={Screens.Roster} />
            <TeamStack.Screen name="Player" component={Screens.Player}
                options={{ headerShown: false }} />
            <TeamStack.Screen name="SingleSong" component={Screens.SingleSong} />
            <TeamStack.Screen name="TwitterList" component={Screens.TwitterList} />
        </TeamStack.Navigator>
    )
}

const FoesNavigation = () => {
    return (
        <FoesStack.Navigator>
            <FoesStack.Screen name="Foes" component={Screens.RosterFoes} />
            <FoesStack.Screen name="FoePlayer" component={Screens.RosterFoePlayers} />
        </FoesStack.Navigator>
    )
}

/*
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
                name="Team" component={TeamNavigation}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (
                            <View style={styles.tabContainer}>
                                <Ionicons name={Skin.Roster_FriendsTabIcon} color={color} size={23} style={styles.tabIcon} />
                                <MediumText style={{ color: color, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rosterhome.friends')}</MediumText>
                            </View>
                        )
                    }
                }} />
            <RosterTabs.Screen
                name="Foes" component={FoesNavigation}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (
                            <View style={styles.tabContainer}>
                                <Ionicons name={Skin.Roster_FoesTabIcon} color={color} size={23} style={styles.tabIcon} />
                                <MediumText style={{ color: color, fontSize: FontSizes.normalButton }}>{i18n.t('screens.rosterhome.foes')}</MediumText>
                            </View>
                        )
                    }
                }} />
        </RosterTabs.Navigator>
    )
}
*/

export default RosterNavigation = () => {
    return (
        // <RosterTabsNavigation screenOptions={DefaultStackScreenOptions} />
        <TeamNavigation />
    )
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