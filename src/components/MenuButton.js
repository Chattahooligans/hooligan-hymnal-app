import React from 'react';
import { Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '../constants';

@withNavigation
export default class MenuButton extends React.Component {
  onPress = () => this.props.navigation.navigate('DrawerToggle');

  render() {
    return (
      <BorderlessButton
        onPress={this.onPress}
        style={{
          marginRight: 5,
          marginLeft: 5,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        hitSlop={{ left: 30, top: 30, right: 30, bottom: 30 }}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-menu-outline' : 'md-menu'}
          size={28}
          color="#fff"
        />
      </BorderlessButton>
    );
  }
}
