import React from 'react';
import {
    Text,
    Image,
    Picker,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    View,
    Keyboard
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";

class CreatePost extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.createpost.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    // TODO: get locales from server
    state = {
        sgVoices: [],
        selectedVoice: null,
        locales: ["de", "en", "es", "pt"],
        selectedLocale: "en",
        post: null
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (
            !prevProps.globalData.state.currentPostDraft &&
            this.props.globalData.state.currentPostDraft ||
            !prevProps.globalData.state.sgVoices &&
            this.props.globalData.state.sgVoices
        ) {
            this.setData();
        }
    }

    setData = () => {
        let selectedVoice = this.props.globalData.state.sgVoices[0];
        let selectedLocale = this.props.globalData.state.sgVoices[0].defaultLocale;

        // TODO: If currentPostDraft exists, override selectedVoice/selectedLocale before setting state

        this.setState({
            sgVoices: this.props.globalData.state.sgVoices,
            selectedVoice: selectedVoice,
            selectedLocale: selectedLocale,
            post: this.props.globalData.state.currentPostDraft
        });
    }

    render() {
        let voicePickerItems = [];
        this.state.sgVoices.forEach(element => {
            voicePickerItems.push(<Picker.Item label={element.name} value={element} key={element._id} />);
        });
        let localePickerItems = [];
        this.state.locales.forEach(element => {
            localePickerItems.push(<Picker.Item label={element} value={element} key={element} />);
        });

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.postAsContainer}>
                    <Picker
                        style={{ flex: 1 }}
                        mode='dropdown'
                        enabled={voicePickerItems.length > 1}
                        selectedValue={this.state.selectedVoice}
                        onValueChange={(itemValue) => this.setState({ selectedVoice: itemValue, selectedLocale: itemValue.defaultLocale })}
                    >
                        {voicePickerItems}
                    </Picker>
                    <Picker
                        style={{ width: 100 }}
                        mode='dropdown'
                        visible={localePickerItems.length > 1}
                        selectedValue={this.state.selectedLocale}
                        onValueChange={(itemValue) => this.setState({ selectedLocale: itemValue })}
                    >
                        {localePickerItems}
                    </Picker>
                </View>
                <TextInput
                    style={styles.textInput}
                    multiline={true}>
                    hello world
                </TextInput>
                <Text>images container</Text>
                <Text>attachments list</Text>
                <View style={styles.toggleContainer}>
                    <RegularText style={ styles.toggleLabel }>Pinned post?</RegularText>
                    <Switch></Switch>
                </View>
                <View style={styles.toggleContainer}>
                    <RegularText style={ styles.toggleLabel }>Send push notification?</RegularText>
                    <Switch></Switch>
                </View>
            </ScrollView>
        );
    }
}

const BORDER_RADIUS = 3;
const styles = StyleSheet.create({
    postAsContainer: {
        flexDirection: i18n.getFlexDirection()
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 4,
        borderWidth: 1,
        fontSize: 18,
        textAlign: i18n.getRTLTextAlign(),
        textAlignVertical: 'top'
    },
    toggleContainer: {
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 1,
        flexDirection: i18n.getFlexDirection()
    },
    toggleLabel: {
        flex: 1,
        textAlign: i18n.getRTLTextAlign()
    }
});

export default withUnstated(CreatePost, { globalData: GlobalDataContainer });