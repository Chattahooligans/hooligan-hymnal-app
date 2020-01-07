import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";

class SinglePost extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Chattahooligan Hymnal",
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Post style={{ flex: 1 }} post={this.props.navigation.state.params.post} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});