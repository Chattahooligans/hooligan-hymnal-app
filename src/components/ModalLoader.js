import React from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    View
} from 'react-native';
import { DefaultColors, Skin } from '../../config';
import { BoldText } from './StyledText';

export class ModalLoader extends React.Component {
    render() {
        const loading = this.props.loading;
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={loading}>
                <View style={styles.modal}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading}
                            size="large"
                            color={Skin.ModalLoader_ActivityIndicator} />
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
        backgroundColor: Skin.ModalLoader_Container
    },
    activityIndicatorWrapper: {
        backgroundColor: Skin.ModalLoader_Background,
        padding: 50,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});