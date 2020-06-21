import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';
import i18n from '../i18n';

const SongbookStack = createStackNavigator();

export default SongbookNavigation = () => {
    return (
        <SongbookStack.Navigator
            screenOptions={DefaultStackScreenOptions}>
            <SongbookStack.Screen
                name="Songbook"
                component={Screens.Songbook} />
        </SongbookStack.Navigator>
    )
}