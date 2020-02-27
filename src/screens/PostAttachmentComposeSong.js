import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import i18n from "../../i18n";

export default class PostAttachmentComposeSong extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    state = {
        title: "",
        lyrics: ""
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="height" style={styles.container}>
                    <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattchmentcomposesong.composesong')}</BoldText>
                    <TextInput
                        style={styles.titleInput}
                        placeholder={i18n.t('screens.postattchmentcomposesong.title')}
                        onChangeText={(text) => this.setState({ title: text })} />
                    <TextInput
                        style={styles.lyricsInput}
                        multiline={true}
                        placeholder={i18n.t('screens.postattchmentcomposesong.lyrics')}
                        onChangeText={(text) => this.setState({ lyrics: text })} />
                    <BigButton
                        label={i18n.t('screens.postattchmentcomposesong.attach')}
                        iconName="md-add" iconPosition="right"
                        onPress={() => {
                            if (this.props.screenProps.onAttachmentComplete)
                                this.props.screenProps.onAttachmentComplete(
                                    {
                                        attachmentType: "song",
                                        data: {
                                            title: this.state.title,
                                            lyrics: this.state.lyrics
                                        }
                                    }
                                );
                        }} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 50
    },
    lyricsInput: {
        height: 200,
        fontSize: 18,
        textAlignVertical: 'top',
    },
});
