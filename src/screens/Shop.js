import React from 'react';
import { Text } from 'react-native';
import { WebBrowser } from 'expo';
import NavigationOptions from '../config/NavigationOptions';
import { SHOP_URL } from '../config/Settings';

export default class Shop extends React.Component {
  static navigationOptions = {
    title: 'Merch Shop',
    ...NavigationOptions
  };

  componentDidMount() {
    this.openBrowser();
  }

  async openBrowser() {
    let result = await WebBrowser.openBrowserAsync(SHOP_URL);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Text>Shop open in WebBrowser component</Text>
    );
  }
}