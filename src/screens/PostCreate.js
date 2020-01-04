import React from 'react';
import {
    Button,
    Modal,
    Text,
    Image,
    Picker,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    View,
    Keyboard
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";

import PostAttach from './PostAttach';
import PostAttachmentSelectPlayer from './PostAttachmentSelectPlayer';
import PostAttachmentSelectSong from './PostAttachmentSelectSong';
import PostAttachmentComposeSong from './PostAttachmentComposeSong';

class PostCreate extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postcreate.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        ),
        headerRight: (
            <Ionicons
                name="md-code-download"
                size={23}
                style={{
                    color: '#fff',
                    backgroundColor: 'transparent',
                    marginRight: 16
                }}
                onPress={() => Keyboard.dismiss()}
            />
        )
    });

    // TODO: get locales from server
    // We put some dummy data in here for the initial render
    state = {
        channels: [{ _id: -1, name: "initial def", defaultLocale: "en" }],
        locales: ["de", "en", "es", "pt"],
        selectedChannel: { _id: -1, name: "initial def", defaultLocale: "en" },
        post: {
            channel: -1,
            locale: "en",
            push: false
        },
        attachmentModalVisible: false
    }

    setAttachmentModalVisible(visible) {
        this.setState({ attachmentModalVisible: visible });
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (
            !prevProps.globalData.state.currentPostDraft &&
            this.props.globalData.state.currentPostDraft ||
            !prevProps.globalData.state.channels &&
            this.props.globalData.state.channels
        ) {
            this.setData();
        }
    }

    setData = () => {
        let channels = this.props.globalData.state.channels;
        let selectedChannel;
        let post = this.props.globalData.state.currentPostDraft;

        let allowedChannels = [];

        channels.forEach(channel => {
            channel.users.forEach(user => {
                if (user._id === this.props.globalData.state.currentUser.user._id &&
                    user.canCreate) {
                    // promote canPush up the object tree for easier access
                    channel.canPush = user.canPush;

                    allowedChannels.push(channel);
                }
            })
        })

        if (allowedChannels.length > 0) {
            if (post.channel == null) {
                post.channel = allowedChannels[0]._id;
                selectedChannel = allowedChannels[0];
            }
            if (post.locale == null)
                post.locale = allowedChannels[0].defaultLocale;
        }

        this.setState({ channels: allowedChannels, selectedChannel, post });

        if (0 === allowedChannels.length) {
            alert("No allowed channels for user: " + this.props.globalData.state.currentUser.user.id + " " + this.props.globalData.state.currentUser.user.email)
            this.props.navigation.goBack();
        }
    }

    render() {
        let channelPickerItems = [];
        this.state.channels.forEach(element => {
            channelPickerItems.push(<Picker.Item label={element.name} value={element} key={element._id} />);
        });
        let localePickerItems = [];
        this.state.locales.forEach(element => {
            localePickerItems.push(<Picker.Item label={element} value={element} key={element} />);
        });
        let post = this.state.post;

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.postAsContainer}>
                    <Picker
                        style={{ flex: 1 }}
                        mode='dropdown'
                        enabled={channelPickerItems.length > 1}
                        selectedValue={this.state.selectedChannel}
                        onValueChange={(selectedChannel) => {
                            let post = this.state.post;
                            post.channel = selectedChannel._id;
                            post.locale = selectedChannel.defaultLocale;
                            this.setState({ selectedChannel, post });
                        }}>
                        {channelPickerItems}
                    </Picker>
                    <Picker
                        style={{ width: 100 }}
                        mode='dropdown'
                        visible={localePickerItems.length > 1}
                        selectedValue={this.state.post.locale}
                        onValueChange={(itemValue) => {
                            let post = this.state.post;
                            post.locale = itemValue;
                            this.setState({ post });
                        }}>
                        {localePickerItems}
                    </Picker>
                </View>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(text) => {
                        let post = this.state.post;
                        post.text = text;
                        this.setState({ post });
                    }}>
                    {this.state.post.text}
                </TextInput>
                <Text>Images {JSON.stringify(post.images)}</Text>
                <Text>Attachments {JSON.stringify(post.attachments)}</Text>
                <Button title="Add Attachment" color={DefaultColors.ButtonBackground} onPress={this._handlePressAddAttachment} />
                <View style={styles.toggleContainer}>
                    <RegularText style={styles.toggleLabel}>Bother people with a push notification? Seriously?</RegularText>
                    <Switch
                        enabled={this.state.selectedChannel.canPush}
                        value={this.state.post.push}
                        onValueChange={(value) => {
                            let post = this.state.post;
                            post.push = value;
                            this.setState({ post });
                        }}
                    />
                </View>
                <BigButton label={i18n.t('screens.postcreate.continue')} onPress={this._handlePressContinueButton} />
                <Modal
                    style={{ flex: 1 }}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.attachmentModalVisible}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            {/*
                            <PostAttach onAttachmentComplete={() => {
                                alert("attachment complete")
                                this.setAttachmentModalVisible(false);
                            }} />
                            <PostAttachmentSelectPlayer onAttachmentComplete={(data) => {
                                let post = this.state.post;
                                post.attachments.push(data);
                                this.setAttachmentModalVisible(false);
                            }} />
                            <PostAttachmentSelectSong onAttachmentComplete={(data) => {
                                let post = this.state.post;
                                post.attachments.push(data);
                                this.setAttachmentModalVisible(false);
                            }} />
                            */}
                            <PostAttachmentComposeSong onAttachmentComplete={(data) => {
                                let post = this.state.post;
                                post.attachments.push(data);
                                this.setAttachmentModalVisible(false);
                            }} />

                            <Button
                                title="Cancel"
                                color={DefaultColors.ButtonBackground}
                                onPress={() => this.setAttachmentModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }

    _handlePressAddAttachment = () => {
        this.setAttachmentModalVisible(true);
    }

    addAttachment = (attachment) => {
        let post = this.state.post;
        post.attachments.push(attachment);
        this.setState({ post });
    }

    _handlePressContinueButton = () => {
        let nav = this.props.navigation
        function navToPostPreview() {
            nav.navigate('PostPreview')
        }
        this.props.globalData.setCurrentPostDraft(this.state.post, navToPostPreview);
    };
}

const styles = StyleSheet.create({
    postAsContainer: {
        flexDirection: i18n.getFlexDirection()
    },
    textInput: {
        height: 200,
        paddingHorizontal: 4,
        borderWidth: 1,
        fontSize: 18,
        textAlign: i18n.getRTLTextAlign(),
        textAlignVertical: 'top'
    },
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

export default withUnstated(PostCreate, { globalData: GlobalDataContainer });