import React from 'react';
import {
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DefaultColors } from '../config/Settings';

export default class PostImageDeleteWrapper extends React.Component {
    render() {
        return (
            <View>
                <Image style={{ width: 100, height: 100, resizeMode: "cover" }}
                    source={{ uri: this.props.uri }} />
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.onPressDelete)
                            this.props.onPressDelete(this.props.uri)
                    }}>
                    <Ionicons
                        name="md-close"
                        size={50}
                        style={{ color: DefaultColors.Primary, backgroundColor: 'transparent', margin: 5 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}