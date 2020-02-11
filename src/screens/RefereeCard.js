import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin } from '../config/Settings';

export default class RefereeCard extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Flash 'Em",
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
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