import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { BigButton } from '../components/BigButton';
import { BoldText, RegularText } from '../components/StyledText';
import { PRIDERAISER_LOGO } from '../config/Settings';
import i18n from "../../i18n";

class RainbowBar extends React.Component {
    render() {
        const barHeight = 4

        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ backgroundColor: "rgb(0, 0, 0)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(120, 79, 23)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(237, 38, 26)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(247, 148, 29)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(255, 242, 0)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(0, 166, 81)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(46, 49, 146)", flex: 1, height: barHeight }} />
                <View style={{ backgroundColor: "rgb(102, 45, 145)", flex: 1, height: barHeight }} />
            </View>
        )
    }
}

export default class PostAttachmentPrideraiserMatch extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <RainbowBar />
                <View style={{ flex: 1, flexDirection: i18n.getFlexDirection(), margin: 5 }}>
                    <Image
                        style={{ width: 100, height: 100, marginRight: 5 }}
                        resizeMode="contain"
                        source={PRIDERAISER_LOGO} />
                    <RegularText>{JSON.stringify(this.props.match)}</RegularText>
                </View>
                <BigButton
                    buttonStyle={{ backgroundColor: "rgb(0, 166, 81)", marginTop: 0, marginHorizontal: 0 }} 
                    iconName="md-heart-empty" iconPosition="right"
                    label={"Pledge"}/>
            </View >
        )
    }
}