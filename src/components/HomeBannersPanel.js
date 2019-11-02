import React from 'react';
import {
    Linking,
    Image,
    TouchableOpacity,
    StyleSheet,
    View
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RegularText } from '../components/StyledText';
import { FontSizes } from '../constants';
import { DefaultColors, Skin } from '../config/Settings';
import i18n from '../../i18n';

export default class HomeBannersPanel extends React.Component {
    render() {
        let banners = [];
        this.props.config.forEach(item => {
            if (item.icon && item.url) {
                banners.push(
                    <TouchableOpacity style={{flexDirection: i18n.getFlexDirection(), paddingHorizontal: 10, paddingVertical: 3, backgroundColor: item.backgroundColor}} 
                        key={item.url} onPress={() => { Linking.openURL(item.url) }}>
                        <Ionicons
                            name={item.icon}
                            size={20}
                            style={{
                                color: item.tintColor,
                                marginVertical: 1, marginRight: 5,
                                backgroundColor: 'transparent'
                            }}
                        />
                        <MediumText style={{ fontSize: FontSizes.subtitle, color: item.textColor }}>{item.text}</MediumText>
                    </TouchableOpacity>
                )
            } else if (item.image && item.url) {
                banners.push(
                    <TouchableOpacity style={{flexDirection: i18n.getFlexDirection(), paddingHorizontal: 10, paddingVertical: 3, backgroundColor: item.backgroundColor}} 
                        key={item.url} onPress={() => { Linking.openURL(item.url) }}>
                        <Image
                            source={item.image}
                            tintColor={item.tintColor}
                            style={{
                                width: 20, height: 20,
                                marginVertical: 1, marginRight: 5,
                                backgroundColor: 'transparent'
                            }}
                        />
                        <RegularText style={{ fontSize: FontSizes.subtitle, color: item.textColor }}>{item.text}</RegularText>
                    </TouchableOpacity>
                )
            }
        })

        return (
            // if no banners, no padding to make this element effectively have zero height
            <View>
                {banners}
            </View>
        )
    }
}