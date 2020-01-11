import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MediumText } from './StyledText';
import { FontSizes } from '../constants';
import { DefaultColors } from '../config/Settings';

export class BigButton extends React.Component {

    render() {
        let iconPosition = "left";
        if (this.props.iconName)
            if (this.props.iconPosition == "right")
                iconPosition = "right";

        let inModal = false;
        if (this.props.inModal)
            inModal = true;

        let tintColor = DefaultColors.ButtonText;
        if (this.props.tintColor)
            tintColor = this.props.tintColor;

        return (
            <View>
                {/*<Button title={this.props.label + " icon:" + this.props.iconName} onPress={this.props.onPress} />*/}
                {inModal &&
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[styles.bigButton, this.props.style]}
                            activeOpacity={0.95}
                            onPress={this.props.onPress}>
                            {(this.props.iconName && iconPosition == "left") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: tintColor,
                                        backgroundColor: 'transparent',
                                        marginHorizontal: 8,
                                        marginVertical: 3
                                    }} />
                            }
                            <MediumText style={[styles.bigButtonText, { color: tintColor }]}>
                                {this.props.label}
                            </MediumText>
                            {(this.props.iconName && iconPosition == "right") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: tintColor,
                                        backgroundColor: 'transparent',
                                        marginHorizontal: 8,
                                        marginVertical: 3,
                                        position: 'absolute',
                                        right: 8
                                    }} />
                            }
                        </TouchableOpacity>
                    </View>
                }
                {!inModal &&
                    <View style={styles.container}>
                        <RectButton
                            style={[styles.bigButton, this.props.style]}
                            onPress={this.props.onPress}
                            underlayColor="#fff">
                            {(this.props.iconName && iconPosition == "left") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: tintColor,
                                        backgroundColor: 'transparent',
                                        marginHorizontal: 8,
                                        marginVertical: 3
                                    }} />
                            }
                            <MediumText style={[styles.bigButtonText, { color: tintColor }]}>
                                {this.props.label}
                            </MediumText>
                            {(this.props.iconName && iconPosition == "right") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: tintColor,
                                        backgroundColor: 'transparent',
                                        marginHorizontal: 8,
                                        marginVertical: 3,
                                        position: 'absolute',
                                        right: 8
                                    }} />
                            }
                        </RectButton>
                    </View>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        overflow: 'hidden'
    },
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        paddingHorizontal: 15,
        height: 50,
        marginTop: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    bigButtonText: {
        fontSize: FontSizes.normalButton,
        textAlign: 'center',
        color: DefaultColors.ButtonText
    }
});