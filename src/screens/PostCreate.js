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
    Keyboard
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
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

class PostCreate extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postcreate.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    // TODO: get locales from server
    // We put some dummy data in here for the initial render
    state = {
        channels: [{ _id: -1, name: "initial def", defaultLocale: "en" }],
        locales: ["de", "en", "es", "pt"],
        post: {
            channel: {},
            locale: "en",
            push: false
        }
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
            if (post.channel == null)
                post.channel = allowedChannels[0];
            if (post.locale == null)
                post.locale = allowedChannels[0].defaultLocale;
        }

        this.setState({ channels: allowedChannels, post });

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

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.postAsContainer}>
                    <Picker
                        style={{ flex: 1 }}
                        mode='dropdown'
                        enabled={channelPickerItems.length > 1}
                        selectedValue={this.state.post.channel}
                        onValueChange={(itemValue) => {
                            let post = this.state.post;
                            post.channel = itemValue;
                            post.locale = itemValue.defaultLocale;
                            this.setState({ post });
                        }}
                    >
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
                        }}
                    >
                        {localePickerItems}
                    </Picker>
                </View>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder={"post body here"}
                    onChangeText={(text) => {
                        let post = this.state.post;
                        post.text = text;
                        this.setState({ post });
                    }}>
                    {this.state.post.text}
                </TextInput>
                <Text>images container</Text>
                <Text>attachments list</Text>
                <View style={styles.toggleContainer}>
                    <RegularText style={styles.toggleLabel}>Send push notification?</RegularText>
                    <Switch
                        enabled={this.state.post.channel.canPush}
                        value={this.state.post.push}
                        onValueChange={(value) => {
                            let post = this.state.post;
                            post.push = value;
                            this.setState({ post });
                        }

                        }
                    />
                </View>
                <ClipBorderRadius>
                    <RectButton
                        style={styles.bigButton}
                        onPress={this._handlePressContinueButton}
                        underlayColor="#fff"
                    >
                        <Ionicons
                            size={23}
                            style={{
                                color: '#fff',
                                marginTop: 3,
                                backgroundColor: 'transparent',
                                marginRight: 5
                            }}
                        />
                        <MediumText style={styles.bigButtonText}>{i18n.t('screens.postcreate.continue')}</MediumText>
                    </RectButton>
                </ClipBorderRadius>
            </ScrollView>
        );
    }

    _handlePressContinueButton = () => {
        let nav = this.props.navigation
        function navToPostPreview() {
            alert("Preview Post");
            nav.navigate('PostPreview')
        }
        this.props.globalData.setCurrentPostDraft(this.state.post, navToPostPreview);
    };
}

const BORDER_RADIUS = 3;
const ClipBorderRadius = ({ children, style }) => {
    return (
        <View
            style={[
                { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
                style
            ]}
        >
            {children}
        </View>
    );
};

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
    },
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    bigButtonText: {
        fontSize: FontSizes.normalButton,
        color: DefaultColors.ButtonText,
        textAlign: 'center'
    }
});

export default withUnstated(PostCreate, { globalData: GlobalDataContainer });