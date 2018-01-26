import React from 'react';
import MenuButton from '../components/MenuButton';
import { Colors } from '../constants';

export default {
  headerStyle: { backgroundColor: Colors.green },
  headerTintColor: 'white',
  headerLeft: <MenuButton />,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
};
