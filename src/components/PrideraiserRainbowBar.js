import React from 'react';
import {
    View
} from 'react-native';

export default class PrideraiserRainbowBar extends React.Component {
    render() {
        let barHeight = this.props.height || 4

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