import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../i18n';

import CustomDrawer from '../components/CustomDrawer';
import HomeNavigation from './HomeNavigation';
import SongbookNavigation from './SongbookNavigation';
import NewSongbookNavigation from './NewSongbookNavigation';
import RosterNavigation from './RosterNavigation';
import AboutNavigation from './AboutNavigation';
import AdminNavigation from './AdminNavigation';
import YellowCardNavigation from './YellowCardNavigation';
import RedCardNavigation from './RedCardNavigation';

const RootDrawer = createDrawerNavigator();

const { width: deviceWidth } = Dimensions.get('window');

/*
    After config.NavigationDrawerItems refactor, this file gets slimmed way down.
    We only need the main app features to get registered in the navigation
*/

export default RootDrawerNavigation = () => {
    let cards = []
    cards.push(
        <RootDrawer.Screen
            name="YellowCard"
            key="YellowCard"
            component={YellowCardNavigation} />
    )
    cards.push(
        <RootDrawer.Screen
            name="RedCard"
            key="RedCard"
            component={RedCardNavigation} />
    )

    return (
        // drawerStyle={{ width: Dimensions.get('window').deviceWidth - 80 }}

        <RootDrawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <RootDrawer.Screen
                name="Home"
                component={HomeNavigation} />
            <RootDrawer.Screen
                name="NewSongbook"
                component={NewSongbookNavigation} />
            <RootDrawer.Screen
                name="Songbook"
                component={SongbookNavigation} />
            <RootDrawer.Screen
                name="Roster"
                component={RosterNavigation} />

            <RootDrawer.Screen
                name="Admin"
                component={AdminNavigation} />
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation} />

            {cards}
        </RootDrawer.Navigator>
    )
}