import React from 'react';
import {
    Image,
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from "../../i18n";

export default class PostAttachmentSong extends React.Component {
    render() {
        const song = this.props.song;

        let lyrics = song.lyrics + "\n";
        lyrics = lyrics.substring(0, lyrics.indexOf("\n"));

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <View style={{ flexDirection: i18n.getFlexDirection() }}>
                        <View style={styles.imageContainer}>
                            <Ionicons
                                name={'md-musical-notes'}
                                size={50}
                                style={{
                                    color: Skin.Home_SocialButtons,
                                    backgroundColor: 'transparent'
                                }} />
                        </View>
                        <View>
                            <BoldText style={styles.title}>{song.title}</BoldText>
                            <ParsedText
                                parse={
                                    [
                                        { pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted },
                                        { pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted }
                                    ]
                                }
                                style={styles.lyrics}>
                                {lyrics}...
                            </ParsedText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderFormatted = (matchingString) => {
        return matchingString.slice(1, matchingString.length - 1)
    }

    _handlePress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.song);
    };
}

const styles = StyleSheet.create({
    container: {
        ...containerStyle,
        flex: 1,
        flexDirection: i18n.getFlexDirection()
    },
    imageContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 18,
        color: Palette.Navy,
        backgroundColor: Palette.White,
        paddingLeft: 4,
    },
    lyrics: {
        fontFamily: 'heebo',
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        color: Palette.Navy,
        backgroundColor: Palette.White,
        paddingLeft: 12,
        paddingTop: 3,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    }
});