import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';

const RosterStack = createStackNavigator();

// use a flag from Settings to load child components of this navigator- foes or no foes?

export default SongbookNavigation = () => {
    return (
        <RosterStack.Navigator
            screenOptions={DefaultStackScreenOptions}>
            <RosterStack.Screen
                name="Roster"
                component={Screens.RosterHome} />
        </RosterStack.Navigator>
    )
}