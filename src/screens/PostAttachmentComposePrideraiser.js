import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { Skin, } from '../config/Settings';
import i18n from "../../i18n";

export default class PostAttachmentComposeSong extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        goalCount: 0
    }

    render() {
        return (
            <View style={styles.container}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattchmentcomposeprideraiser.prideraiser')}</BoldText>
                <TextInput
                    style={styles.goalCountInput}
                    placeholder={i18n.t('screens.postattchmentcomposeprideraiser.howmanygoals')}
                    onChangeText={(text) => this.setState({ goalCount: parseInt(text, 10) })} />
                <BigButton
                    label={i18n.t('screens.postattchmentcomposeprideraiser.attach')}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    goalCountInput: {
        fontSize: 24,
        fontWeight: 'bold',
        height: 50
    }
});
