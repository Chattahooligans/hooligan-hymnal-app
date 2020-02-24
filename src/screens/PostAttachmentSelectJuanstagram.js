import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import i18n from "../../i18n";

import juanstagramPosts from '../data/juanstagram';

export default class PostAttachmentSelectJuanstagram extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        let juanstagramButtons = [];
        console.log(juanstagramPosts);
        for (const key in juanstagramPosts) {
            const value = juanstagramPosts[key];

            juanstagramButtons.push(
                <BigButton
                    key={"juanstagram-post-button-" + key}
                    label={key}
                    inModal={true}
                    onPress={() => {
                        if (this.props.screenProps.onAttachmentComplete)
                            this.props.screenProps.onAttachmentComplete(
                                {
                                    attachmentType: "juanstagram",
                                    data: {
                                        juanstagramPost: key,
                                    }
                                }
                            );
                    }} />
            )
        }

        return (
            <View style={styles.container}>
                <BoldText style={{ textAlign: 'center' }}>{"Juanstagram"}</BoldText>
                <ScrollView>
                    {juanstagramButtons}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});
