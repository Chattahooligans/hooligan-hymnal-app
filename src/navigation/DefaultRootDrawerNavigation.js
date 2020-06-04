import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import i18n from '../../i18n';

import CustomDrawer from '../components/CustomDrawer';
import Screens from '../screens';
import HomeNavigation from './HomeNavigation';
import SongbookNavigation from './SongbookNavigation';
import RosterNavigation from './RosterNavigation';
import AboutNavigation from './AboutNavigation';
import AdminNavigation from './AdminNavigation';
import YellowCardNavigation from './YellowCardNavigation';
import RedCardNavigation from './RedCardNavigation';
import { createWebNavigatorScreens } from './WebNavigation';
import { DrawerLinks } from '../../config';

const RootDrawer = createDrawerNavigator();
const drawerLinksNavigators = createWebNavigatorScreens(RootDrawer, DrawerLinks);

const { width: deviceWidth } = Dimensions.get('window');


export default DefaultRootDrawerNavigation = () => {
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
                component={HomeNavigation}
                options={{ drawerLabel: i18n.t('navigation.home') }} />
            <RootDrawer.Screen
                name="Songbook"
                component={SongbookNavigation}
                options={{ drawerLabel: i18n.t('navigation.songbook') }} />
            <RootDrawer.Screen
                name="Roster"
                component={RosterNavigation}
                options={{ drawerLabel: i18n.t('navigation.roster') }} />

            {drawerLinksNavigators}

            <RootDrawer.Screen
                name="AdminHome"
                component={AdminNavigation}
                options={{ drawerLabel: i18n.t('navigation.capo') }} />
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation}
                options={{ drawerLabel: i18n.t('navigation.about') }} />

            {cards}
        </RootDrawer.Navigator>
    )
}