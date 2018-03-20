import React from 'react';
import MenuButton from '../components/MenuButton';
import { Colors } from '../constants';
import { Skin } from '../config/Settings';

export default {
  headerStyle: { backgroundColor: Skin.NavigationBar },
  headerTintColor: 'white',
  headerLeft: <MenuButton />,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
};
