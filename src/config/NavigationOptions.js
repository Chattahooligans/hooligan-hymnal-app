import React from 'react';
import MenuButton from '../components/MenuButton';
import { Colors } from '../constants';
import { Skin } from '../config/Settings';

export default {
  headerStyle: { backgroundColor: Colors.green },
  headerTintColor: 'white',
  headerLeft: <MenuButton />,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
};
