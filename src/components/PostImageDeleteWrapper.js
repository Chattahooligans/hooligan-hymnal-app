import React from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors } from '../config/Settings';

export default class PostImageDeleteWrapper extends React.Component {

    onPressMetadata = () => {
        alert("launch metadata form")
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
    }
});