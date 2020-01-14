import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { BoldText, RegularText } from './StyledText';
import { FontSizes } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import containerStyle from './PostAttachmentContainerStyle';
import i18n from "../../i18n"

export default class PostAttachmentGkNickname extends React.Component {
    render() {
        const gkNickname = this.props.gkNickname;

        return (
            <View style={[styles.container, { backgroundColor: gkNickname.backgroundColor }]}>
                <View style={styles.imageContainer}>
                    <Ionicons
                        name="md-hand"
                        size={50}
                        style={{ color: gkNickname.textColor }} />
                </View>
                <View style={styles.textContainer}>
                    <RegularText style={[styles.preambleText, { color: gkNickname.textColor }]}>
                        {i18n.t('components.postattachmentgknickname.gonnascore')}
                    </RegularText>
                    <BoldText style={[styles.nicknameText, { color: gkNickname.textColor }]}>
                        {gkNickname.nickname}
                    </BoldText>
                </View>
            </View>
        );
    }
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
    textContainer: {
        flex: 1
    },
    preambleText: {
        fontSize: 16,
        paddingLeft: 4
    },
    nicknameText: {
        fontSize: 18,
        paddingLeft: 12,
        paddingTop: 3
    }
});
