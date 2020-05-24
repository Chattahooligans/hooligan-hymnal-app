import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import i18n from '../../i18n';

import Screens from '../screens';
import HomeNavigation from './HomeNavigation';
import SongbookNavigation from './SongbookNavigation';
import RosterNavigation from './RosterNavigation';
import AboutNavigation from './AboutNavigation';

const RootDrawer = createDrawerNavigator();

export default DefaultRootDrawerNavigation = () => {
    return (
        <RootDrawer.Navigator
            initialRouteName="Home">
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
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation}
                options={{ drawerLabel: i18n.t('navigation.about') }} />
        </RootDrawer.Navigator>
    )
}