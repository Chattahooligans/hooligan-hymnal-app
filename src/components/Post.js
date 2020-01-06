import React from 'react';
import {
    Clipboard,
    Image,
    Linking,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
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
            switch (attachment.type.toLowerCase()) {
                case "player":
                    let player = this.props.globalData.state.players.find(player => player._id === attachment._id);
                    let playerDisplay = <PostAttachmentPlayer key={index} player={player} />
                    attachmentDisplay.push(playerDisplay);
                    break;
                case "song":
                    let song;
                    if (attachment._id) {
                        song = this.props.globalData.state.songs.find(song => song._id === attachment._id);
                    } else if (attachment.data) {
                        song = attachment.data;
                    }
                    let songDisplay = <PostAttachmentSong key={index} song={song} />
                    attachmentDisplay.push(songDisplay);
                    break;
                case "gknickname":
                    let gkNickname = attachment.data;
                    let gkNicknameDisplay = <PostAttachmentGkNickname key={index} gkNickname={gkNickname} />
                    attachmentDisplay.push(gkNicknameDisplay);
                    break;
                case "masstweet":
                    let roster = this.props.globalData.state.rosters.find(roster => roster._id === attachment.data.rosterId);
                    let massTweetDisplay = <PostAttachmentMassTweet key={index} roster={roster} />
                    attachmentDisplay.push(massTweetDisplay);
                    break;
                default:
                    attachmentDisplay.push(<RegularText key={index}>Can't render attachment {JSON.stringify(attachment)}</RegularText>);
            }
        });

        return (
            <View style={styles.container}>
                {/* Facebook style */}
                <View style={{ flexDirection: i18n.getFlexDirection() }}>
                    <FadeIn>
                        <Image
                            source={{ uri: post.channelData.avatarUrl }}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 4 }} />
                    </FadeIn>
                    <View style={{ flex: 1, marginTop: 3 }}>
                        <BoldText>{post.channelData.name}</BoldText>
                        <RegularText>{moment(post.publishedAt).fromNow()}</RegularText>
                    </View>
                    {post.push &&
                        <Ionicons
                            name="md-notifications"
                            size={18}
                            style={{
                                color: Palette.Sky,
                                backgroundColor: 'transparent',
                                marginRight: 3,
                                marginTop: 3
                            }} />
                    }
                </View>
                {textDisplay}

                <RegularText>Images {JSON.stringify(post.images)}</RegularText>
                <View>
                    {attachmentDisplay}
                </View>
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
        marginTop: 5,
        marginHorizontal: 8
    },
    text: {
        marginTop: 3,
        fontFamily: 'heebo',
        fontSize: 18,
        lineHeight: 24,
        flex: 1,
        color: Palette.Navy,
        backgroundColor: Palette.White,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
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