import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MediumText } from './StyledText';
import { FontSizes } from '../constants';
import { DefaultColors } from '../config/Settings';

export class BigButton extends React.Component {
    render() {
        console.log("Rendering BigButton .label: " + this.props.label + " .onPress: " + this.props.onPress);

        let iconPosition = "left";
        if (this.props.iconName)
            if (this.props.iconPosition == "right")
                iconPosition = "right";

        let simple = true

        return (
            <View>
                {simple &&
                    <Button title={this.props.label + " icon:" + this.props.iconName} onPress={this.props.onPress} />
                }
                {!simple &&
                    <View style={[styles.container, this.props.style]}>
                        <RectButton
                            style={styles.bigButton}
                            onPress={this.props.onPress}
                            underlayColor="#fff">
                            {(this.props.iconName && iconPosition == "left") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                        marginHorizontal: 8,
                                        marginVertical: 3
                                    }} />
                            }
                            <MediumText style={styles.bigButtonText}>
                                {this.props.label}
                            </MediumText>
                            {(this.props.iconName && iconPosition == "right") &&
                                <Ionicons
                                    name={this.props.iconName}
                                    size={23}
                                    style={{
                                        color: '#fff',
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
        overflow: 'hidden',
        marginTop: 10
    },
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    bigButtonText: {
        fontSize: FontSizes.normalButton,
        color: DefaultColors.ButtonText,
        textAlign: 'center'
    }
});