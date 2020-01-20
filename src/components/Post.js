import React from 'react';
import {
    Clipboard,
    Image,
    Linking,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
// import Toast from 'react-native-simple-toast';
import Toast from "react-native-tiny-toast";
import { Skin, Palette } from '../config/Settings';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import withUnstated from '@airship/with-unstated';
import PostAttachmentGkNickname from './PostAttachmentGkNickname';
import PostAttachmentMassTweet from './PostAttachmentMassTweet';
import PostAttachmentPlayer from './PostAttachmentPlayer';
import PostAttachmentSong from './PostAttachmentSong';
import moment from 'moment';
import i18n from "../../i18n";

class Post extends React.Component {
    state = {
        post: {
            publishedAt: JSON.stringify(new Date()),
            channelData: { _id: -1, name: "", avatarUrl: "" },
            text: "",
            images: [],
            attachments: []
        }
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
                default:
                    attachmentDisplay.push(<RegularText key={index}>Can't render attachment {JSON.stringify(attachment)}</RegularText>);
            }
        });

        return (
            <View style={styles.container}>
                {/* Facebook style */}
                <View style={styles.headerContainer}>
                    <FadeIn>
                        <Image
                            source={channelImage}
                            style={styles.channelImage} />
                    </FadeIn>
                    <View style={styles.headerTextContainer}>
                        <BoldText style={styles.channelText}>{post.channelData.name}</BoldText>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("SinglePost", { post }) }}>
                            <RegularText style={styles.timestampText}>{publishedAtDisplay}</RegularText>
                        </TouchableOpacity>
                    </View>
                    {post.push &&
                        <Ionicons
                            name="md-notifications"
                            size={18}
                            style={styles.notificationSymbol} />
                    }
                </View>
                {textDisplay}

                {/*
                <RegularText>Images {JSON.stringify(post.images)}</RegularText>
                */}
                {attachmentDisplay.length > 0 &&
                    <View style={styles.attachmentsContainer}>
                        {attachmentDisplay}
                    </View>
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

    },
    timestampText: {

    },
    notificationSymbol: {
        color: Palette.Sky,
        marginRight: 3
    },
    text: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        fontFamily: 'heebo',
        fontSize: 18,
        lineHeight: 24,
        flex: 1,
        color: Palette.Navy,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    imagesContainer: {

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
        color: 'blue',
        textDecorationLine: 'underline'
    }
})

export default withUnstated(Post, { globalData: GlobalDataContainer });
