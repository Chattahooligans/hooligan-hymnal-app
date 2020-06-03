import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackScreenOptions from './DefaultStackScreenOptions';
import Screens from '../screens';

const AttachmentTypesStack = createStackNavigator();

export default PostAttachmentTypesNavigation = (props) => {
    return (
        <AttachmentTypesStack.Navigator
            initialRouteName="PostAttach"
            screenOptions={{
                ...DefaultStackScreenOptions,
                onAttachmentComplete: props.onAttachmentComplete,
                headerShown: false
            }}>
            <AttachmentTypesStack.Screen
                name="PostAttach"
                component={Screens.PostAttach} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentSelectPlayer"
                component={Screens.PostAttachmentSelectPlayer} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentSelectSong"
                component={Screens.PostAttachmentSelectSong} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentComposeSong"
                component={Screens.PostAttachmentComposeSong} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentComposeGkNickname"
                component={Screens.PostAttachmentComposeGkNickname} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentSelectMassTweet"
                component={Screens.PostAttachmentSelectMassTweet} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentSelectJuanstagram"
                component={Screens.PostAttachmentSelectJuanstagram} />
            <AttachmentTypesStack.Screen
                name="PostAttachmentComposePrideraiserMatch"
                component={Screens.PostAttachmentComposePrideraiserMatch} />
        </ AttachmentTypesStack.Navigator>
    )
}