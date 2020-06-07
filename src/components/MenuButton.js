import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout } from '../constants';

export default MenuButton = () => {
  const navigation = useNavigation();
  return (
    <BorderlessButton
      onPress={() => navigation.toggleDrawer()}
      style={{
        marginRight: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      hitSlop={{ left: 30, top: 30, right: 30, bottom: 30 }}>
      <MaterialCommunityIcons
        name={'menu'}
        size={28}
        color="#fff" />
    </BorderlessButton>
  );
}
