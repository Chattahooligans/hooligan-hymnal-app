import React from 'react';
import {
    Text,
    Image,
    Picker,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    View,
    Keyboard,
    TouchableNativeFeedbackBase
} from 'react-native';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { BigButton } from '../components/BigButton';
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";

class PostPreview extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postpreview.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        post: null
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.currentPostDraft &&
            this.props.globalData.state.currentPostDraft) {
            this.setData();
        }
    }

    setData = () => {
        this.setState({ post: this.props.globalData.state.currentPostDraft });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Post post={this.state.post} />
                <View style={styles.toggleContainer}>
                    <RegularText style={styles.toggleLabel}>Bother people with a push notification? Seriously?</RegularText>
                    <Switch
                        enabled={false}
                        value={this.state.post && this.state.post.push}
                    />
                </View>
                <BigButton
                    label={i18n.t('screens.postpreview.submit')}
                    iconName="md-send" iconPosition="right"
                    onPress={this._handlePressSubmitButton} />
                <BigButton
                    style={{ marginBottom: 10, backgroundColor: "gray" }}
                    label={i18n.t('screens.postpreview.schedule')}
                    iconName="md-time" iconPosition="right"
                    onPress={this._handlePressScheduleButton} />
            </ScrollView>
        );
    }

    _handlePressSubmitButton = () => {
        alert(i18n.t('screens.postcreate.submit'))
        const publishedAt = new Date().toISOString();

        let postForServer = {};
        Object.assign(postForServer, this.state.post);
        delete postForServer.channelData;

        console.log("send this to the server")
        console.log(JSON.stringify(postForServer))

        // and update the publishedAt time
        let post = this.state.post;
        post.publishedAt = publishedAt;
        let nav = this.props.navigation
        function navHome() {
            nav.popToTop();
            nav.navigate("Home")
        }
        this.props.globalData.setCurrentPostDraft(post, navHome);

        // TODO: turn on ActivityIndicator/disable button, 
        //      talk to server/await response
        //      disable ActivityIndicator/enable button
        //      navigate home
        //this.props.globalData.setCurrentPostDraft(post, navHome);
    }
    _handlePressScheduleButton = () => {
        alert(i18n.t('screens.postcreate.schedule'))
    }
}

const styles = StyleSheet.create({
    toggleContainer: {
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 1,
        flexDirection: i18n.getFlexDirection()
    },
    toggleLabel: {
        flex: 1,
        textAlign: i18n.getRTLTextAlign()
    }
});

export default withUnstated(PostPreview, { globalData: GlobalDataContainer });