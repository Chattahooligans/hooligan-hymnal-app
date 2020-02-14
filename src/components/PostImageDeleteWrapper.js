import React from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors } from '../config/Settings';
import i18n from "../../i18n";

export default class PostImageDeleteWrapper extends React.Component {
    state = {
        metadataModalVisible: false,
        metadata: {
            credit: ""
        }
    }

    componentDidMount = () => {
        this.setState({ metadataCredit: this.props.credit })
    }

    onPressMetadata = () => {
        this.setState({ metadataModalVisible: true })
    }

    render() {
        return (
            <View style={{ marginHorizontal: 2 }}>
                <Image style={{ width: 150, height: 150, resizeMode: "cover" }}
                    source={{ uri: this.props.uri }} />
                <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                        if (this.props.onPressDelete)
                            this.props.onPressDelete(this.props.uri)
                    }}>
                    <Ionicons
                        name="md-close"
                        size={25}
                        style={{ color: DefaultColors.Primary, backgroundColor: 'transparent' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.metadata}
                    onPress={this.onPressMetadata}>
                    <Ionicons
                        name="md-code"
                        size={25}
                        style={{ color: DefaultColors.Primary, backgroundColor: 'transparent' }}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.metadataModalVisible}>
                    <View style={{ padding: 10 }}>
                        <BoldText style={{ textAlign: 'center' }}>Set Image Metadata</BoldText>
                        <TextInput
                            style={styles.metadataTextInput}
                            placeholder={"Image Credit"}
                            value={this.state.metadataCredit}
                            onChangeText={(text) => {
                                let metadata = this.state.metadata
                                metadata.credit = text
                                this.setState({ metadata })
                            }} />
                        <TextInput
                            editable={false}
                            style={styles.metadataTextInput}
                            placeholder={"Caption"} />
                        <TextInput
                            editable={false}
                            style={styles.metadataTextInput}
                            placeholder={"Tag Event"} />
                        <TextInput
                            editable={false}
                            style={styles.metadataTextInput}
                            placeholder={"GPS Coordinates"} />
                    </View>
                    <BigButton label={"Save"} iconName="md-save" iconPosition="right" inModal={true}
                        onPress={() => {
                            this.setState({ metadataModalVisible: false }, () => {
                                if (this.props.onSaveMetadata)
                                    this.props.onPressDelete(this.state.metadata)
                            })
                        }} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    delete: {
        position: "absolute",
        top: 2,
        right: 2,
        backgroundColor: DefaultColors.Secondary,
        width: 25,
        height: 25,
        borderColor: DefaultColors.Primary,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    metadata: {
        position: "absolute",
        bottom: 2,
        right: 2,
        backgroundColor: DefaultColors.Secondary,
        width: 25,
        height: 25,
        borderColor: DefaultColors.Primary,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    metadataTextInput: {
        fontSize: 18,
        height: 50
    }
});