import React from 'react';
import { Text, StyleSheet } from 'react-native';
import data from '../data/tags';
import { find, propEq, prop, compose, split, map, join } from 'ramda';

export default class Tags extends React.Component {
  render() {
    return <Text style={styles.icons}>{getIcons(this.props.tags || '')}</Text>;
  }
}

const key = propEq('key');

const from = compose(find, key);

const icon = prop('icon');

const toIcon = tag => compose(icon, from(tag))(data);

const getIcons = compose(join(' '), map(toIcon), split(','));

const styles = StyleSheet.create({
  icons: {
    backgroundColor: '#FFFFFF',
    padding: 2,
    paddingLeft: 6
  }
});
