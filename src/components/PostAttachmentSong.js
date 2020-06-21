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
import { parsePatterns, parsedStyles, renderBoldItalic } from '../components/ParsedTextHelper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Skin, DefaultColors, Palette } from '../../config';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from '../i18n';

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
                            <MaterialCommunityIcons
                                name={'music'}
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
                                        { pattern: parsePatterns.bold, style: parsedStyles.bold, renderText: renderBoldItalic },
                                        { pattern: parsePatterns.italic, style: parsedStyles.italic, renderText: renderBoldItalic }
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
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 4,
    },
    lyrics: {
        fontFamily: Skin.Font_ParsedText,
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        color: DefaultColors.Primary,
        backgroundColor: DefaultColors.Background,
        paddingLeft: 12,
        paddingTop: 3,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    }
});