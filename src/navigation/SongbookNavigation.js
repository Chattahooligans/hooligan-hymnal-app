import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';

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