import React from 'react';
import {
    Image,
    Linking,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { FontSizes, Layout } from '../constants';
import { Skin, Palette } from '../config/Settings';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import withUnstated from '@airship/with-unstated';
import i18n from "../../i18n";

class Post extends React.Component {
    state = {
        post: {
            publishedAt: Date.now,
            channel: { _id: -1, name: "", avatarUrl: "" },
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
            post.channel = this.props.globalData.getChannelBasicInfo(this.props.post.channel)
            this.setState({ post });
        }
    }

    render() {
        let post = this.state.post;
        console.log("Rendering Post:\n" + JSON.stringify(post));

        return (
            <View>
                {/* Facebook style */}
                <View style={{ flexDirection: i18n.getFlexDirection() }}>
                    <FadeIn>
                        <Image
                            source={{ uri: post.channel.avatarUrl }}
                            style={{ width: 50, height: 50, borderRadius: 25 }} />
                    </FadeIn>
                    <View>
                        <BoldText>{post.channel.name}</BoldText>
                        <RegularText>{post.publishedAt.toString()}</RegularText>
                    </View>
                </View>
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
                <RegularText>Images {JSON.stringify(post.images)}</RegularText>
                <RegularText>Attachments {JSON.stringify(post.attachments)}</RegularText>
            </View>
        )
    }

    _onLongPressText = () => {
        ToastAndroid.show(i18n.t('components.post.copied'), ToastAndroid.SHORT);
        Clipboard.setString(this.props.post.text);
    };

    _urlPress = (url) => Linking.openURL(url);
    _emailPress = (email) => Linking.openURL('mailto:' + email);
    _renderFormatted = (matchingString) => {
        return matchingString.slice(1, matchingString.length - 1)
    }

}

const styles = {
    text: {
        fontFamily: 'heebo',
        fontSize: 18,
        lineHeight: 24,
        flex: 1,
        color: Palette.Navy,
        backgroundColor: Palette.White,
        paddingLeft: 8,
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
}
export default withUnstated(Post, { globalData: GlobalDataContainer });