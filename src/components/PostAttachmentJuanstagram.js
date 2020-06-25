import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { parsePatterns, parsedStyles, renderBoldItalic } from './ParsedTextHelper';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors, Skin } from '../../config';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from '../i18n'

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
                            { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                            { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic },
                            { pattern: parsePatterns.hashtag, style: parsedStyles.hashtag }
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
                    <TouchableHighlight
                        underlayColor={'#fff'}>
                        <Ionicons
                            size={buttonSize}
                            name="md-heart"
                            style={[styles.button, { marginLeft: 0 }]} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}>
                        <Ionicons
                            size={buttonSize}
                            name="ios-chatbubbles"
                            style={[styles.button]} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}>
                        <Ionicons
                            size={buttonSize}
                            name="ios-send"
                            style={[styles.button]} />
                    </TouchableHighlight>
                    <View style={{ flex: 1 }} />
                    <TouchableHighlight
                        underlayColor={'#fff'}>
                        <Ionicons
                            size={buttonSize}
                            name="ios-bookmark"
                            style={[styles.button, { marginRight: 0 }]} />
                    </TouchableHighlight>
                </View>
                <ParsedText
                    parse={
                        [
                            { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                            { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic },
                            { pattern: parsePatterns.hashtag, style: parsedStyles.hashtag }
                        ]
                    }
                    style={styles.caption}>
                    {"*" + juanstagramPost.likes + " likes*"}
                </ParsedText>
                <ParsedText
                    parse={
                        [
                            { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                            { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic },
                            { pattern: parsePatterns.hashtag, style: parsedStyles.hashtag }
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
    }
});
