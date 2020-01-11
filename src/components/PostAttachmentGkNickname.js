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
                    <RegularText style={[styles.text, { color: gkNickname.textColor }]}>
                        {i18n.t('components.gkNickname.gonnascore')}
                    </RegularText>
                    <BoldText style={[styles.nickname, { color: gkNickname.textColor }]}>
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
        flexDirection: i18n.getFlexDirection(),
        alignItems: "center"
    },
    imageContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    textContainer: {
        flex: 1
    },
    text: {
        fontSize: FontSizes.subtitle
    },
    nickname: {
        fontSize: FontSizes.subtitle,
        marginRight: 5
    }
});
