import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';

const AdminStack = createStackNavigator();

export default AdminNavigation = () => {
    return (
        <AdminStack.Navigator
            initialRouteName="AdminLogin"
            screenOptions={DefaultStackScreenOptions}>
            <AdminStack.Screen
                name="AdminLogin"
                component={Screens.AdminLogin} />
            <AdminStack.Screen
                name="AdminHome"
                component={Screens.AdminHome} />
            <AdminStack.Screen
                name="PostCreate"
                component={Screens.PostCreate} />
            <AdminStack.Screen
                name="PostPreview"
                component={Screens.PostPreview} />
        </AdminStack.Navigator>
    )
}