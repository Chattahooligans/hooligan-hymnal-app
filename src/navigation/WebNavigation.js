import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';
import { Palette } from '../config/Settings';
import i18n from '../../i18n';

const WebStack = createStackNavigator();

export function createWebNavigatorScreens(DrawerNavigator, items) {
    let navigators = [];

    items.forEach((element, index) => {
        navigators.push(createWebNavigator(DrawerNavigator, element.drawerLabel, element.screenTitle || element.drawerLabel, element.url, element.routeName || element.drawerLabel + index.toString()))
    });

    return navigators;
}

function createWebNavigator(DrawerNavigator, drawerLabel, screenTitle, url, routeName) {
    return (
        <DrawerNavigator.Screen
            name={routeName}
            key={routeName}
            options={{
                title: screenTitle,
                drawerLabel: drawerLabel
            }}>
            {props => <Screens.WebView url={url} {...props} />}
        </DrawerNavigator.Screen>
    )
}

export const WebNavigation = () => {
    return (
        <WebStack.Navigator
            screenOptions={DefaultStackScreenOptions}>
            <WebStack.Screen
                name="YellowCard"
                options={{
                    title: i18n.t('screens.refereecard.titleyellow'),
                    headerStyle: { backgroundColor: Palette.YellowCard }
                }}>
                {props => <Screens.RefereeCard color={Palette.YellowCard} />}
            </WebStack.Screen>
        </WebStack.Navigator>
    )
}