import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';

// Android: List of Google Material Design-looking Card objects, tap one to go to SingleSongScreen
// iOS: native-looking control with same function
export default class CapoCallouts extends Component {
  static navigationOptions = {
    title: 'Capo Callouts',
    ...NavigationOptions
  };
  render() {
    return (
      <View>
        <Text>Capo notification Card/Tile/something</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
