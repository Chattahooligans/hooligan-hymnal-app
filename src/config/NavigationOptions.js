import React from 'react';
import MenuButton from '../components/MenuButton';
import { Colors } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';

export default {
  headerStyle: { backgroundColor: DefaultColors.NavigationBarBackground },
  headerTintColor: 'white',
  headerLeft: <MenuButton />,
  headerTitleStyle: {
    fontFamily: Skin.Font_Bold
  }
};
