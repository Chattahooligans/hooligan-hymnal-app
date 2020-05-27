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
import RedCardNavigation from './RedCardNavigation';
import { createWebItem, createWebNavigatorScreens } from './WebNavigation';
import { EVENTS_URL, SHOP_URL } from '../config/Settings';

const RootDrawer = createDrawerNavigator();

let drawerLinks = [];
drawerLinks.push(createWebItem("Events", "Events", EVENTS_URL, "EventsWebView"))
drawerLinks.push(createWebItem("Merch Shop", "Merch Shop", SHOP_URL, "MerchShopWebView"))
const drawerLinksNavigators = createWebNavigatorScreens(RootDrawer, drawerLinks);


export default DefaultRootDrawerNavigation = () => {
    let cards = []
    cards.push(
        <RootDrawer.Screen
            name="YellowCard"
            component={YellowCardNavigation} />
    )
    cards.push(
        <RootDrawer.Screen
            name="RedCard"
            component={RedCardNavigation} />
    )

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
                name="AdminHome"
                component={AdminNavigation}
                options={{ drawerLabel: i18n.t('navigation.capo') }} />
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation}
                options={{ drawerLabel: i18n.t('navigation.about') }} />
            
            {drawerLinksNavigators}

            {cards}
        </RootDrawer.Navigator>
    )
}