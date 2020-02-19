import React from 'react';
import {
    Alert,
    Clipboard,
    Dimensions,
    Image,
    Linking,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import FadeIn from 'react-native-fade-in-image';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
// import Toast from 'react-native-simple-toast';
import Toast from "react-native-tiny-toast";
import { Skin, Palette, Settings } from '../config/Settings';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import withUnstated from '@airship/with-unstated';
import PostAttachmentGkNickname from './PostAttachmentGkNickname';
import PostAttachmentJuanstagram from './PostAttachmentJuanstagram';
import PostAttachmentMassTweet from './PostAttachmentMassTweet';
import PostAttachmentPlayer from './PostAttachmentPlayer';
import PostAttachmentSong from './PostAttachmentSong';
import PostImageWrapper from './PostImageWrapper';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageViewerFooter from './ImageViewerFooter';
import moment from 'moment';
import i18n from "../../i18n";

const { SlideInMenu } = renderers;

class Post extends React.Component {
    state = {
        post: {
            publishedAt: JSON.stringify(new Date()),
            channelData: { _id: -1, name: "", avatarUrl: "" },
            text: "",
            images: [],
            attachments: []
        },
        imageViewerVisible: false,
        imageViewerIndex: 0,
        imageViewerFooterVisible: true
    }

    componentDidMount = () => this.setData();
    componentDidUpdate(prevProps) {
        if (!prevProps.post && this.props.post)
            this.setData();
    }

    setData() {
        if (this.props.post) {
            let post = this.props.post;
            post.channelData = this.props.globalData.getChannelBasicInfo(this.props.post.channel)
            this.setState({ post });
        }
    }

    hidePost = async () => {
        if (this.props.post)
            this.props.globalData.hidePost(this.props.post._id)
    }

    getScaledUri = (uri) => {
        let host = "cloudinary.com"
        //let containerWidth = Dimensions.get("window").width - (2 * styles.container.marginHorizontal)
        //let transform = "c_scale,w_" + Math.round(containerWidth) + "/"
        let transformPrefix = "c_scale,"
        let transform = transformPrefix + "w_500/"
        let spliceAfter = "/upload/"

        // check both, in case of weirdness
        if (uri.includes(host) && uri.includes(spliceAfter)) {
            console.l
            let scaledUri = uri
            let position = scaledUri.indexOf(spliceAfter) + spliceAfter.length

            // weird thing where these chained together, not sure why, but this will avoid it
            if (!scaledUri.includes(transformPrefix)) {
                scaledUri = [
                    scaledUri.slice(0, position),
                    transform,
                    scaledUri.slice(position)
                ].join("")
            }

            return scaledUri
        }
        else
            return uri
    }

    render() {
        let post = this.state.post;
        // turn back on when learning 2 Images
        //console.log("Rendering Post:\n" + JSON.stringify(post));
        let nav = this.props.navigation;

        let channelImage = Skin.Post_DefaultChannelThumbnail;
        if (post.channelData.avatarUrl)
            channelImage = { uri: post.channelData.avatarUrl }

        // display relative time only if a post is from today, else just a regular timestamp
        let publishedAtDisplay = "";
        if (moment(post.publishedAt).isSame(moment(), 'day'))
            publishedAtDisplay = moment(post.publishedAt).fromNow()
        else
            publishedAtDisplay = moment(post.publishedAt).format("M/D/YY h:mma")

        let navToChannel = Settings.ChannelUI_Enabled;
        if (this.props.hasOwnProperty("navToChannel"))
            if (false == this.props.navToChannel)
                navToChannel = false;

        let navToFullScreen = true;
        if (this.props.hasOwnProperty("navToFullScreen"))
            if (false == this.props.navToFullScreen)
                navToFullScreen = false;


        let textDisplay;
        if (post.text) {
            textDisplay =
                <ParsedText
                    parse={
                        [
                            { type: 'url', style: styles.url, onPress: this._urlPress },
                            { type: 'email', style: styles.url, onPress: this._emailPress },
                            { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                            { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted }
                        ]
                    }
                    style={styles.text}
                    onLongPress={this._onLongPressText}>
                    {post.text}
                </ParsedText>
        }

        let containerWidth = Dimensions.get("window").width - (2 * styles.container.marginHorizontal)
        let imageDisplay = [];
        let imageViewerData = [];
        post.images.forEach((image, index) => {
            imageViewerData.push({ url: image.uri })
        })
        if (post.images.length == 1) {
            // flow the entire image in the feed if there's only one
            post.images.forEach((image, index) => {

                // large images slow performance
                let thumbnail = { ...image }
                if (thumbnail.hasOwnProperty("thumbnailUri")) {
                    // remotely linked images may explicitly contain a thumbnail
                    thumbnail.uri = thumbnail.thumbnailUri
                }
                else {
                    // use cloudinary transforms to only load/render a thumbnail
                    thumbnail.uri = this.getScaledUri(image.uri)
                }

                imageDisplay.push(
                    <TouchableOpacity
                        key={post._id + "-touchable-image-" + index}
                        activeOpacity={1}
                        onPress={() => { this.setState({ imageViewerVisible: true, imageViewerFooterVisible: true, imageViewerIndex: index }) }}>
                        <PostImageWrapper containerWidth={containerWidth}
                            key={post._id + "-image-" + index}
                            source={thumbnail} />
                    </TouchableOpacity>
                )
            })
        }
        else if (post.images.length == 2) {
            // just thumbnails if more than one
            post.images.forEach((image, index) => {
                // large images slow performance
                let thumbnail = { ...image }
                if (thumbnail.hasOwnProperty("thumbnailUri")) {
                    // remotely linked images may explicitly contain a thumbnail
                    thumbnail.uri = thumbnail.thumbnailUri
                }
                else {
                    // use cloudinary transforms to only load/render a thumbnail
                    thumbnail.uri = this.getScaledUri(image.uri)
                }

                imageDisplay.push(
                    <TouchableOpacity
                        key={post._id + "-touchable-image-" + index}
                        activeOpacity={1}
                        onPress={() => { this.setState({ imageViewerVisible: true, imageViewerFooterVisible: true, imageViewerIndex: index }) }}>
                        <Image
                            key={post._id + "-image-" + index}
                            style={{
                                width: containerWidth / 2, height: containerWidth / 2,
                                borderWidth: 2, borderRadius: 10, borderColor: 'white',
                                overflow: "hidden"
                            }}
                            source={thumbnail}
                            resizeMode="cover" />
                    </TouchableOpacity>
                )
            })
        }
        else {
            post.images.forEach((image, index) => {
                // large images slow performance
                let thumbnail = { ...image }
                if (thumbnail.hasOwnProperty("thumbnailUri")) {
                    // remotely linked images may explicitly contain a thumbnail
                    thumbnail.uri = thumbnail.thumbnailUri
                }
                else {
                    // use cloudinary transforms to only load/render a thumbnail
                    thumbnail.uri = this.getScaledUri(image.uri)
                }

                imageDisplay.push(
                    <TouchableOpacity
                        key={post._id + "-touchable-image-" + index}
                        activeOpacity={1}
                        onPress={() => { this.setState({ imageViewerVisible: true, imageViewerFooterVisible: true, imageViewerIndex: index }) }}>
                        <Image
                            key={post._id + "-image-" + index}
                            style={{
                                width: containerWidth / 2.5, height: containerWidth / 2.5,
                                borderWidth: 2, borderRadius: 10, borderColor: 'white',
                                overflow: "hidden"
                            }}
                            source={thumbnail}
                            resizeMode="cover" />
                    </TouchableOpacity>
                )
            })
        }

        let attachmentDisplay = [];
        post.attachments.forEach((attachment, index) => {
            switch (attachment.attachmentType.toLowerCase()) {
                case "player":
                    let player = this.props.globalData.state.players.find(player => player._id === attachment.relatedId);
                    let playerDisplay = <PostAttachmentPlayer key={index} player={player}
                        onPress={() => { this.props.navigation.navigate("Player", { player }) }} />
                    attachmentDisplay.push(playerDisplay);
                    break;
                case "song":
                    let song;
                    if (attachment.relatedId) {
                        song = this.props.globalData.state.songs.find(song => song._id === attachment.relatedId);
                    } else if (attachment.data) {
                        song = attachment.data;
                    }
                    let songDisplay = <PostAttachmentSong key={index} song={song}
                        onPress={() => { this.props.navigation.navigate("SingleSong", { song }) }} />
                    attachmentDisplay.push(songDisplay);
                    break;
                case "gknickname":
                    let gkNickname = attachment.data;
                    let gkNicknameDisplay = <PostAttachmentGkNickname key={index} gkNickname={gkNickname} />
                    attachmentDisplay.push(gkNicknameDisplay);
                    break;
                case "masstweet":
                    let roster = this.props.globalData.state.rosters.find(roster => roster._id === attachment.data.rosterId);
                    let massTweetDisplay = <PostAttachmentMassTweet key={index} roster={roster}
                        onPress={() => { this.props.navigation.navigate("TwitterList", { roster }) }} />
                    attachmentDisplay.push(massTweetDisplay);
                    break;
                case "juanstagram":
                    let juanstagramPost = attachment.data.juanstagramPost;
                    let juanstagramDisplay = <PostAttachmentJuanstagram juanstagramPost={juanstagramPost} />
                    attachmentDisplay.push(juanstagramDisplay);
                    break;
                default:
                    attachmentDisplay.push(<RegularText key={index}>Can't render attachment {JSON.stringify(attachment)}</RegularText>);
            }
        });

        let menuOptions = [];
        let menuDisplay;
        if (this.props.globalData.getCurrentUser()) {
            const channelId = post.channelData._id;
            const currentUserId = this.props.globalData.getCurrentUser().user.id;
            const currentUserFeedAllowed = this.props.globalData.getCurrentUser().user.feedAllowed;
            const channelPermissions = this.props.globalData.getChannelPermissions(channelId, currentUserId);

            if (currentUserFeedAllowed) {
                /*
                if (channelPermissions.canEdit)
                    menuOptions.push(<MenuOption value={"edit"} text="Edit Post" />)
                if (channelPermissions.canDelete)
                    menuOptions.push(<MenuOption value={"delete"} text="Hide Post" />)
                */
                if (channelPermissions.canDelete) {
                    menuDisplay =
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    i18n.t('components.post.hidealerttitle'),
                                    i18n.t('components.post.hidealertmessage'),
                                    [
                                        {
                                            text: i18n.t('components.post.hidealertcancel'),
                                            style: "cancel"
                                        },
                                        {
                                            text: i18n.t('components.post.hidealertconfirm'),
                                            onPress: () => { this.hidePost() }
                                        }
                                    ]
                                )
                            }}>
                            <Ionicons
                                name="md-arrow-dropdown"
                                size={18}
                                style={styles.menu} />
                        </TouchableOpacity>
                }
            }

            /*
            if (menuOptions.length > 0) {
                menuDisplay =
                    <MenuProvider>
                        <Menu renderer={SlideInMenu} onSelect={value => alert(`Selected number: ${value}`)}>
                            <MenuTrigger>
                                    <Ionicons
                                        name="md-arrow-dropdown"
                                        size={18}
                                        style={styles.menu} />
                            </MenuTrigger>
                            <MenuOptions>
                                {menuOptions}
                            </MenuOptions>
                        </Menu>
                    </MenuProvider>
                }
                   */
        }

        return (
            <View style={styles.container}>
                {/* Facebook style */}
                <View style={styles.headerContainer}>
                    {navToChannel &&
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Channel", { channelData: post.channelData }) }}>
                            <FadeIn>
                                <Image
                                    source={channelImage}
                                    style={styles.channelImage} />
                            </FadeIn>
                        </TouchableOpacity>
                    }
                    {!navToChannel &&
                        <FadeIn>
                            <Image
                                source={channelImage}
                                style={styles.channelImage} />
                        </FadeIn>
                    }
                    <View style={styles.headerTextContainer}>
                        {navToChannel &&
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Channel", { channelData: post.channelData }) }}>
                                <BoldText style={styles.channelText}>{post.channelData.name}</BoldText>
                            </TouchableOpacity>
                        }
                        {!navToChannel &&
                            <BoldText style={styles.channelText}>{post.channelData.name}</BoldText>
                        }
                        {navToFullScreen &&
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("SinglePost", { post }) }}>
                                <RegularText style={styles.timestampText}>{publishedAtDisplay}</RegularText>
                            </TouchableOpacity>
                        }
                        {!navToFullScreen &&
                            <RegularText style={styles.timestampText}>{publishedAtDisplay}</RegularText>
                        }
                    </View>
                    {post.push &&
                        <Ionicons
                            name="md-notifications"
                            size={18}
                            style={styles.notificationSymbol} />
                    }
                    {menuDisplay}
                </View>
                {textDisplay}

                {imageDisplay.length === 1 &&
                    <View style={styles.imagesContainer}>
                        {imageDisplay}
                    </View>
                }
                {imageDisplay.length === 2 &&
                    <View style={[{ flexDirection: i18n.getFlexDirection() }, styles.imagesContainer]}>
                        {imageDisplay}
                    </View>
                }
                {imageDisplay.length > 2 &&
                    <ScrollView style={[{ flexDirection: i18n.getFlexDirection() }, styles.imagesContainer]} horizontal={true}>
                        {imageDisplay}
                    </ScrollView>
                }

                {attachmentDisplay.length > 0 &&
                    <View style={styles.attachmentsContainer}>
                        {attachmentDisplay}
                    </View>
                }

                {imageViewerData.length > 0 &&
                    <Modal
                        visible={this.state.imageViewerVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ imageViewerVisible: false })}>
                        <ImageViewer
                            doubleClickInterval={500}
                            renderIndicator={() => { }}
                            enablePreload={true}
                            imageUrls={imageViewerData}
                            index={this.state.imageViewerIndex}
                            enableSwipeDown={true}
                            onSwipeDown={() => { this.setState({ imageViewerVisible: false }) }}
                            menuContext={{ saveToLocal: i18n.t('components.imageviewer.savetolocal'), cancel: i18n.t('components.imageviewer.cancel') }}
                            onClick={() => {
                                let imageViewerFooterVisible = this.state.imageViewerFooterVisible
                                imageViewerFooterVisible = !imageViewerFooterVisible
                                this.setState({ imageViewerFooterVisible })
                            }}
                            renderFooter={(index) => (<ImageViewerFooter images={post.images} index={index} visible={this.state.imageViewerFooterVisible} />)}
                        />
                    </Modal>
                }
            </View>
        )
    }

    _onLongPressText = () => {
        Toast.show(i18n.t('components.post.copied'));
        Clipboard.setString(this.props.post.text);
    };

    _urlPress = (url) => Linking.openURL(url);
    _emailPress = (email) => Linking.openURL('mailto:' + email);
    _renderFormatted = (matchingString) => {
        return matchingString.slice(1, matchingString.length - 1)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Palette.White,
        marginTop: Skin.Home_PostMarginVertical,
        marginHorizontal: 5
    },
    headerContainer: {
        flexDirection: i18n.getFlexDirection(),
        padding: 4
    },
    channelImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 8
    },
    headerTextContainer: {
        flex: 1
    },
    channelText: {
        fontSize: 16,
        color: Skin.Post_ChannelLabel
    },
    timestampText: {
        color: Skin.Post_TimestampLabel
    },
    notificationSymbol: {
        color: Palette.Sky,
        marginRight: 3
    },
    menu: {
        color: Skin.Post_ChannelLabel,
        marginLeft: 5,
        marginRight: 3
    },
    text: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        fontFamily: Skin.Font_ParsedText,
        fontSize: Skin.Post_FontSize,
        lineHeight: Skin.Post_LineHeight,
        flex: 1,
        color: Skin.Post_TextColor,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    imagesContainer: {
        backgroundColor: '#fff'
    },
    attachmentsContainer: {

    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    url: {
        color: Skin.Post_LinkColor,
        textDecorationLine: 'underline'
    }
})

export default withUnstated(Post, { globalData: GlobalDataContainer });
