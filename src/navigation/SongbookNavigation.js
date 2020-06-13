import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';
import i18n from '../i18n';

const SongbookStackContainer = createStackNavigator();
const SongbookTabs = createBottomTabNavigator();

function SongbookTabsNavigation() {
    return (
        <SongbookTabs.Navigator
            initialRouteName="SongbookContents"
            lazy={false}
            swipeEnabled={true}
            backBehavior="initialRoute"
            tabBar={() => null}>
            <SongbookTabs.Screen
                name="SongbookContents"
                tabBarVisible={false}
                component={Screens.SongbookContents} />
            <SongbookTabs.Screen
                name="SongbookPages"
                tabBarVisible={false}
                component={Screens.SongbookPages} />
        </SongbookTabs.Navigator>
    )
}

export default NewSongbookNavigation = () => {
    return (
        <SongbookStackContainer.Navigator screenOptions={DefaultStackScreenOptions}>
            <SongbookStackContainer.Screen
                name="SongbookCover"
                component={Screens.SongbookCover}
                options={{ headerTitle: i18n.t('screens.songbook.title') }} />
            <SongbookStackContainer.Screen
                name="Songbook"
                component={SongbookTabsNavigation}
                options={{ headerTitle: i18n.t('screens.songbook.title') }} />
        </SongbookStackContainer.Navigator>
    )
}