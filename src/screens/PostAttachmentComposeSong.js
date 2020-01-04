import React from 'react';
import {
    Image,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";

export default class PostAttachmentComposeSong extends React.Component {
    state = {
        title: "",
        lyrics: ""
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="height" style={styles.container}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder={i18n.t('screens.capocompose.songtitle')}
                        onChangeText={(text) => this.setState({ title: text })} />
                    <TextInput
                        style={styles.lyricsInput}
                        multiline={true}
                        placeholder={i18n.t('screens.capocompose.songlyrics')}
                        onChangeText={(text) => this.setState({ lyrics: text })} />
                    <BigButton
                        style={{ paddingBottom: 10 }}
                        label="Attach"
                        inModal={true}
                        onPress={() => {
                            if (this.props.onAttachmentComplete)
                                this.props.onAttachmentComplete({ type: "song", data: { title: this.state.title, lyrics: this.state.lyrics } });
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
