import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors, Skin } from '../config/Settings';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from "../../i18n"

import juanstagramPosts from '../data/juanstagram';

export default class PostAttachmentJuanstagram extends React.Component {

    _renderFormatted = (matchingString) => {
        return matchingString.slice(1, matchingString.length - 1)
    }
    _renderHashtag = (matchingString) => {
        return matchingString
    }
    render() {
        // default
        let juanstagramPost = {
            "account": "juanito",
            "likes": "423",
            "caption": "Post not found, type: " + JSON.stringify(this.props.juanstagramPost),
            "comments": []
        }

        if (juanstagramPosts[this.props.juanstagramPost])
            juanstagramPost = juanstagramPosts[this.props.juanstagramPost]

        let caption = "*" + juanstagramPost.account + "* " + juanstagramPost.caption

        let commentsDisplay = []
        juanstagramPost.comments.forEach((commentChild, index) => {
            let comment = "*" + commentChild.account + "* " + commentChild.comment

            commentsDisplay.push(
                <ParsedText
                    key={this.props.juanstagramPost + "-commment-" + index}
                    parse={
                        [
                            { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                            { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted },
                            { pattern: /\B#(\w*[A-Za-z_\d]+\w*)\b/, style: styles.bold, renderText: this._renderHashtag }
                        ]
                    }
                    style={styles.caption}>
                    {comment}
                </ParsedText>
            )
        })

        let buttonSize = 24
        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <Ionicons
                        size={buttonSize}
                        name="md-heart"
                        style={[styles.button, { marginLeft: 0 }]} />
                    <Ionicons
                        size={buttonSize}
                        name="ios-chatbubbles"
                        style={[styles.button]} />
                    <Ionicons
                        size={buttonSize}
                        name="ios-send"
                        style={[styles.button]} />
                    <View style={{ flex: 1 }} />
                    <Ionicons
                        size={buttonSize}
                        name="ios-bookmark"
                        style={[styles.button, { marginRight: 0 }]} />
                </View>
                <ParsedText
                    parse={
                        [
                            { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                            { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted },
                            { pattern: /\B#(\w*[A-Za-z_\d]+\w*)\b/, style: styles.bold, renderText: this._renderHashtag }
                        ]
                    }
                    style={styles.caption}>
                    {"*" + juanstagramPost.likes + " likes*"}
                </ParsedText>
                <ParsedText
                    parse={
                        [
                            { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                            { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted },
                            { pattern: /\B#(\w*[A-Za-z_\d]+\w*)\b/, style: styles.bold, renderText: this._renderHashtag }
                        ]
                    }
                    style={styles.caption}>
                    {caption}
                </ParsedText>
                <View style={styles.commentsContainer}>
                    {commentsDisplay}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...containerStyle,
        flex: 1
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: i18n.getFlexDirection(),
        marginBottom: 5
    },
    button: {
        color: Skin.Home_SocialButtons,
        marginHorizontal: 5
    },
    caption: {
        fontFamily: Skin.Font_ParsedText,
        color: Skin.Post_TextColor,
        fontSize: Skin.Post_FontSize,
        lineHeight: Skin.Post_LineHeight,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    commentsContainer: {
        marginTop: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
});
