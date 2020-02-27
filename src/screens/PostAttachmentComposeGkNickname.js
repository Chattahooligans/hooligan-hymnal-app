import React from 'react';
import {
    Image,
    Keyboard,
    ScrollView,
    SectionList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";

class ColorRow extends React.Component {
    render() {
        const color = this.props.color;

        return (
            <TouchableOpacity
                activeOpacity={0.2}
                style={{ flex: 1, backgroundColor: color.toLowerCase() }}
                onPress={() => this.props.onPress(this.props.color)} >
                <View style={styles.colorRow}>
                    <RegularText>{color}</RegularText>
                </View>
            </TouchableOpacity>
        );
    }
}

class PostAttachmentComposeGkNickname extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        colorData: [],
        nickname: "Nickname",
        color: "gray"
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.htmlColors && this.props.globalData.state.htmlColors)
            this.setData();
    }

    setData = () => {
        // SectionList requires [{title, data: []}], so transform our input data
        let colorData = [];
        this.props.globalData.state.htmlColors.colorFamilies.forEach((colorFamilyChild) => {
            let colorList = [];
            colorFamilyChild.colors.forEach((colorChild) => { colorList.push(colorChild) });
            colorData.push({ title: colorFamilyChild.familyName, data: colorList });
        });

        this.setState({ colorData });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingBottom: 10 }}>
                <BoldText style={{ textAlign: 'center' }}>{i18n.t('screens.postattachmentcomposegknickname.gknickname')}</BoldText>
                <MediumText style={styles.instructions}>{i18n.t('screens.postattachmentcomposegknickname.instructions1')}</MediumText>
                <TextInput
                    style={styles.nicknameInput}
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ nickname: text })} />
                <MediumText style={styles.instructions}>{i18n.t('screens.postattachmentcomposegknickname.instructions2')}</MediumText>
                <SectionList
                    style={styles.colorPicker}
                    renderScrollComponent={props => <ScrollView {...props} />}
                    stickySectionHeadersEnabled={true}
                    renderSectionHeader={({ section }) => {
                        return <View style={styles.sectionHeader}>
                            <MediumText>{section.title}</MediumText>
                        </View>
                    }}
                    renderItem={({ item }) => {
                        return <ColorRow color={item.name} onPress={() => this.setState({ color: item.name.toLowerCase() })} />
                    }}
                    sections={this.state.colorData}
                    keyExtractor={(item, index) => (item.name + " " + index)} />
                <MediumText style={[styles.instructions, { paddingTop: 8 }]}>{i18n.t('screens.postattachmentcomposegknickname.instructions3')}</MediumText>
                <BigButton
                    buttonStyle={{ backgroundColor: this.state.color, marginTop: 0, paddingTop: 2 }}
                    label={this.state.nickname}
                    tintColor="white"
                    iconName="md-hand"
                    onPress={() => {
                        if (this.props.screenProps.onAttachmentComplete)
                            this.props.screenProps.onAttachmentComplete(
                                {
                                    attachmentType: "gknickname",
                                    data: {
                                        nickname: this.state.nickname,
                                        backgroundColor: this.state.color,
                                        textColor: "white"
                                    }
                                }
                            );
                    }} />
                <BigButton
                    buttonStyle={{ backgroundColor: this.state.color }}
                    label={this.state.nickname}
                    tintColor="black"
                    iconName="md-hand"
                    onPress={() => {
                        if (this.props.screenProps.onAttachmentComplete)
                            this.props.screenProps.onAttachmentComplete(
                                {
                                    attachmentType: "gknickname",
                                    data: {
                                        nickname: this.state.nickname,
                                        backgroundColor: this.state.color,
                                        textColor: "black"
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
    instructions: {
        fontSize: 16,
        paddingHorizontal: 8,
        color: DefaultColors.ColorText
    },
    nicknameInput: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingBottom: 8
    },
    colorPicker: {
        paddingBottom: 8,
        paddingHorizontal: 15
    },
    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#eee'
    },
    colorRow: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee'
    }
});

export default withUnstated(PostAttachmentComposeGkNickname, { globalData: GlobalDataContainer });