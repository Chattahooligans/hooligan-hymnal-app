import React from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import NavigationOptions from '../config/NavigationOptions';
import { SHOP_URL } from '../config/Settings';
import i18n from "../../i18n";

export default class Shop extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.shop.title'),
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
      <Text>{i18n.t('screens.shop.fallback')}</Text>
    );
  }
}