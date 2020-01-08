import React from 'react';
import {
    Clipboard,
    ScrollView,
    StyleSheet
} from 'react-native';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { BigButton } from '../components/BigButton';
import { ModalLoader } from '../components/ModalLoader';
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";
import { createPost } from '../services/feedService';

class PostPreview extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postpreview.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        post: null,
        loading: false
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
                <Post
                    post={this.state.post}
                    navigation={this.props.navigation} />
                <BigButton
                    label={i18n.t('screens.postpreview.submit')}
                    iconName="md-send" iconPosition="right"
                    onPress={this._handlePressSubmitButton} />
                <BigButton
                    style={{ marginBottom: 10, backgroundColor: "gray" }}
                    label={i18n.t('screens.postpreview.schedule')}
                    iconName="md-time" iconPosition="right"
                    onPress={this._handlePressScheduleButton} />

                <ModalLoader loading={this.state.loading} />
            </ScrollView>
        )
    }

    _handlePressSubmitButton = async () => {
        this.setState({ loading: true });
        const publishedAt = new Date().toISOString();

        let post = this.state.post;
        post.publishedAt = publishedAt;
        this.props.globalData.setCurrentPostDraft(post);
        let postForServer = {};
        Object.assign(postForServer, this.state.post);
        delete postForServer.channelData;

        try {
            let response = await createPost(postForServer, this.props.globalData.getCurrentUser().token)
            console.log("Response")
            console.log(response);

            this.setState({ loading: false });

            this.props.navigation.popToTop();
            this.props.navigation.navigate("Home");
        }
        catch (ex) {
            alert(ex.toString())

            this.setState({ loading: false });
        }
    }
    _handlePressScheduleButton = () => {
        alert(i18n.t('screens.postcreate.schedule'))
    }
}

const styles = StyleSheet.create({

});

export default withUnstated(PostPreview, { globalData: GlobalDataContainer });