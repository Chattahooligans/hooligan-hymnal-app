import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import appParams from '../../app.json';
import { DefaultColors, Palette, Skin } from '../config/Settings';

export default class SinglePost extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: appParams.expo.name + ": View Post",
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    render() {
        return (
            <ScrollView style={styles.container}>
                <Post
                    style={{ flex: 1 }}
                    post={this.props.navigation.state.params.post}
                    navigation={this.props.navigation}
                    navToFullScreen={false} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: DefaultColors.Primary,
        borderWidth: 5
    }
});