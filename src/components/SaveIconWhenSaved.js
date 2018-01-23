import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withSaveState } from '../utils/storage';
import { Icons, Colors } from '../constants';

@withSaveState
export default class SaveIconWhenSaved extends React.Component {
  render() {
    if (!this.props.saved) {
      return null;
    }

    const icon = (
      <Ionicons
        name={Icons.favoriteActive}
        color={Colors.green}
        style={[{ backgroundColor: 'transparent' }, this.props.style]}
      />
    );

    return <Text>{icon}{'  '}</Text>;
  }
}
