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

class PostPreview extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postpreview.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        post: null
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.currentPostDraft &&
            this.props.globalData.state.currentPostDraft) {
            this.setData();
        }
    }

    setData = () => {
        this.setState({ post: this.props.globalData.state.currentPostDraft });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text>
                        {JSON.stringify(this.state.post)}
                    </Text>
                </View>
                <ClipBorderRadius>
                    <RectButton
                        style={styles.bigButton}
                        onPress={this._handlePressSubmitButton}
                        underlayColor="#fff"
                    >
                        <Ionicons
                            size={23}
                            style={{
                                color: '#fff',
                                marginTop: 3,
                                backgroundColor: 'transparent',
                                marginRight: 5
                            }}
                        />
                        <MediumText style={styles.bigButtonText}>{i18n.t('screens.postpreview.submit')}</MediumText>
                    </RectButton>
                </ClipBorderRadius>
                <ClipBorderRadius>
                    <RectButton
                        style={styles.bigButton}
                        onPress={this._handlePressScheduleButton}
                        underlayColor="#fff"
                    >
                        <Ionicons
                            size={23}
                            style={{
                                color: '#fff',
                                marginTop: 3,
                                backgroundColor: 'transparent',
                                marginRight: 5
                            }}
                        />
                        <MediumText style={styles.bigButtonText}>{i18n.t('screens.postpreview.schedule')}</MediumText>
                    </RectButton>
                </ClipBorderRadius>
            </ScrollView>
        );
    }

    _handlePressSubmitButton = () => {
        alert(i18n.t('screens.postcreate.submit'))
    };
    _handlePressScheduleButton = () => {
        alert(i18n.t('screens.postcreate.schedule'))
    };
}

const BORDER_RADIUS = 3;
const ClipBorderRadius = ({ children, style }) => {
    return (
        <View
            style={[
                { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
                style
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    bigButtonText: {
        fontSize: FontSizes.normalButton,
        color: DefaultColors.ButtonText,
        textAlign: 'center'
    }
});

export default withUnstated(PostPreview, { globalData: GlobalDataContainer });