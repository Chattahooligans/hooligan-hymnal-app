import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../i18n';

import CustomDrawer from '../components/CustomDrawer';
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
                options={{
                    drawerLabel: i18n.t('navigation.home'),
                    drawerIcon: ({color, size}) => <Ionicons name={"md-paper"} size={size} color={color} />
                }} />
            <RootDrawer.Screen
                name="Songbook"
                component={SongbookNavigation}
                options={{
                    drawerLabel: i18n.t('navigation.songbook'),
                    drawerIcon: ({color, size}) => <Ionicons name={"md-book"} size={size} color={color} />
                }} />
            <RootDrawer.Screen
                name="Roster"
                component={RosterNavigation}
                options={{
                    drawerLabel: i18n.t('navigation.roster'),
                    drawerIcon: ({color, size}) => <Ionicons name={"md-people"} size={size} color={color} />
                }} />

            {drawerLinksNavigators}

            <RootDrawer.Screen
                name="Admin"
                component={AdminNavigation}
                options={{
                    drawerLabel: i18n.t('navigation.capo'),
                    drawerIcon: ({color, size}) => <Ionicons name={"md-apps"} size={size} color={color} />
                }} />
            <RootDrawer.Screen
                name="About"
                component={AboutNavigation}
                options={{
                    drawerLabel: i18n.t('navigation.about'),
                    drawerIcon: ({color, size}) => <Ionicons name={"md-information-circle"} size={size} color={color} />
                }} />

            {cards}
        </RootDrawer.Navigator>
    )
}