import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { BoldText, RegularText, MediumText } from './StyledText';
import { Skin, Palette, Settings } from '../config/Settings';

export default class NotificationEngagementsModal extends React.Component {
    render() {
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <BoldText>Notification Engagements</BoldText>
                        <RegularText>{this.props.post._id}</RegularText>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Skin.NotificationEngagementsModal_Container
    },
    container: {
        backgroundColor: Palette.White,
        padding: 10,
    },
})