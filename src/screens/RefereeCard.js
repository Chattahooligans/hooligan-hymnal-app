import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin } from '../config/Settings';

export default class RefereeCard extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: this.props.title,
        headerStyle: { backgroundColor: this.props.color },
        headerTintColor: 'white',
        headerLeft: <MenuButton />,
        headerTitleStyle: {
            fontFamily: Skin.Font_Bold
        }
    });

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.color }]} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});