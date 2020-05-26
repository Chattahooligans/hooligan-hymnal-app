import React from 'react';
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
import RedCardNavigation  from './RedCardNavigation';

const RootDrawer = createDrawerNavigator();

export default DefaultRootDrawerNavigation = () => {
    return (
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
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation}
                options={{ drawerLabel: i18n.t('navigation.about') }} />
            <RootDrawer.Screen
                name="AdminHome"
                component={AdminNavigation}
                options={{ drawerLabel: () => null }} />
            <RootDrawer.Screen
                name="YellowCard"
                component={YellowCardNavigation}
                options={{ drawerLabel: () => null }} />
            <RootDrawer.Screen
                name="RedCard"
                component={RedCardNavigation}
                options={{ drawerLabel: () => null }} />
        </RootDrawer.Navigator>
    )
}