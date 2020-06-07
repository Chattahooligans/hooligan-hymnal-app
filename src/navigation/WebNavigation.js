import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';
import { Palette } from '../../config';
import i18n from '../i18n';

const WebStack = createStackNavigator();

export function createWebNavigatorScreens(DrawerNavigator, items) {
    let navigators = [];

    items.forEach((element, index) => {
        navigators.push(createWebNavigator(DrawerNavigator, element.drawerLabel, element.screenTitle || "Web: " + element.drawerLabel, element.url, element.routeName || "WebLink" + index.toString()))
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
                drawerLabel: drawerLabel,
                drawerIcon: ({color, size}) => <MaterialCommunityIcons name={"link"} size={size} color={color} />

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