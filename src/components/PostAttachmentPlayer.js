import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import i18n from "../../i18n";

export default class PostAttachmentPlayer extends React.Component {
    render() {
        const player = this.props.player;

        let thumbnail = Skin.Roster_DefaultThumbnail;
        if (player.defaultThumbnail)
            thumbnail = { uri: player.defaultThumbnail };
        if (player.thumbnail)
            thumbnail = { uri: player.thumbnail };

        let instagramDisplay;
        if (player.instagram) {
            instagramDisplay =
                <TouchableOpacity
                    style={{ alignContent: 'center' }}
                    key={player.instagram}
                    onPress={() => { Linking.openURL('https://instagram.com/' + player.instagram) }}>
                    <Ionicons
                        name={'logo-instagram'}
                        size={30}
                        style={{
                            color: Palette.Sky,
                            marginVertical: 3,
                            marginHorizontal: 10,
                            backgroundColor: 'transparent'
                        }} />
                </TouchableOpacity>
        }

        let twitterDisplay;
        if (player.twitter) {
            twitterDisplay =
                <TouchableOpacity
                    style={{ alignContent: 'center' }}
                    key={player.twitter}
                    onPress={() => { Linking.openURL('https://twitter.com/intent/tweet?text=@' + player.twitter + '+') }}>
                    <Ionicons
                        name={'logo-twitter'}
                        size={30}
                        style={{
                            color: Palette.Sky,
                            marginVertical: 3,
                            marginHorizontal: 10,
                            backgroundColor: 'transparent'
                        }} />
                </TouchableOpacity>
        }

        return (
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={this._handlePress}
                    activeOpacity={0.2}
                    style={{ flex: 1 }}>
                    <View style={{ flexDirection: i18n.getFlexDirection() }}>
                        <View style={styles.rowAvatarContainer}>
                            <FadeIn>
                                <Image
                                    source={thumbnail}
                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                />
                            </FadeIn>
                        </View>
                        <View style={styles.rowData}>
                            <View
                                style={{ width: 25, alignItems: 'flex-end', paddingRight: 5 }}>
                                <BoldText>{player.squadNumber}</BoldText>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{player.name}</MediumText>
                                <RegularText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('positions.' + player.position)}</RegularText>
                                <RegularText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{player.flag}</RegularText>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {instagramDisplay}
                {twitterDisplay}
            </View>
        );
    }

    _handlePress = () => {
        this.props.onPress(this.props.player);
    };
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 10,
        padding: 10,
        backgroundColor: Palette.White,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: i18n.getFlexDirection()
    },
    rowAvatarContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    rowData: {
        flex: 1,
        flexDirection: i18n.getFlexDirection()
    }
});