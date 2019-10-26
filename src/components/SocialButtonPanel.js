import React from 'react';
import {
    Linking,
    Image,
    TouchableOpacity,
    StyleSheet,
    View
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MediumText } from '../components/StyledText';
import { DefaultColors, Skin } from '../config/Settings';

export default class SocialButtonPanel extends React.Component {
    render() {
        let sections = [];
        this.props.config.forEach(element => {
            let section;
            let buttons = [];
            element.items.forEach(item => {
                if (item.icon && item.url) {
                    buttons.push(
                        <TouchableOpacity key={item.url} onPress={() => { Linking.openURL(item.url) }}>
                            <Ionicons
                                name={item.icon}
                                size={30}
                                style={{
                                    color: Skin.Home_SocialButtons,
                                    marginVertical: 3, marginHorizontal: 10,
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    )
                } else if (item.image && item.url) {
                    buttons.push(
                        <TouchableOpacity key={item.url} onPress={() => { Linking.openURL(item.url) }}>
                            <Image
                                source={item.image}
                                tintColor={item.tintToSkin ? Skin.Home_SocialButtons : '' }
                                style={{
                                    width: 30, height: 30,
                                    marginVertical: 3, marginHorizontal: 10,
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    )
                }
            })
            
            section = 
                <View style={this.props.style} key={element.header}>
                    <MediumText style={{color: element.headerColor ? element.headerColor : DefaultColors.ColorText}}>{element.header}</MediumText>
                    <View flexDirection="row" style={{paddingHorizontal: 5}}>{buttons}</View>
                </View>

            sections.push(section);
        })

        return (
            <View>
                {sections}
            </View>
        )
    }
}