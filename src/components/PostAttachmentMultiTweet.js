import React from 'react';
import {
    Linking,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { BoldText, RegularText, MediumText } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from "../../i18n";

export default class PostAttachmentMultiTweet extends React.Component {
    render() {
        
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: i18n.getFlexDirection() }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.tweetAllContainer}>
                                <Ionicons
                                    name={'logo-twitter'}
                                    size={16}
                                    style={{
                                        color: Palette.Rouge,
                                        backgroundColor: 'transparent'
                                    }} />
                                <RegularText style={styles.tweetAllText}>{i18n.t('components.postattachmentmultitweet.tweettheplayers')}</RegularText>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress = () => {
        const players = this.props.players;
        var handleList = "";
        for(player of players) {
            handleList += "@" + player.twitter + "%20"
        }
        Linking.openURL('https://twitter.com/intent/tweet?text=' + handleList + '+') 
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
        color: Palette.Rouge,
        backgroundColor: Palette.White,
        paddingLeft: 4,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    tweetAllContainer: {
        flexDirection: i18n.getFlexDirection(),
        alignItems: 'center',
        marginHorizontal: 8
    },
    tweetAllText: {
        fontFamily: Skin.Font_ParsedText,
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        color: Palette.Rouge,
        backgroundColor: Palette.White,
        marginLeft: 5,
        textAlign: i18n.getRTLTextAlign(),
        writingDirection: i18n.getWritingDirection()
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 4,
        fontSize: 18,
        textAlign: i18n.getRTLTextAlign()
    },
});