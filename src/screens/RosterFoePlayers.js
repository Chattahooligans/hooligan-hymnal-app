import React from 'react';
import { Animated, Image, FlatList, Platform, ScrollView, SectionList, StyleSheet, View } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import { RectButton } from 'react-native-gesture-handler';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import NavigationBar from '../components/NavigationBar';
import { RegularText, BoldText, MediumText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { FontSizes, Icons, Layout } from '../constants';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { defaultFormatUtc } from 'moment';
import i18n from '../../i18n';

class FoePlayerRow extends React.Component {
    render() {
        const { item: player } = this.props.item;

        return (
            <View style={[styles.playerRow, { backgroundColor: this.props.backgroundColor }]}>
                <View style={{ width: 25, alignItems: 'flex-end' }}>
                    <BoldText style={{ color: this.props.textColor }}>{player.squadNumber}</BoldText>
                </View>
                <View style={{ flexDirection: i18n.getFlexDirection() }}>
                    <BoldText style={{ color: this.props.textColor }}> | {player.name} </BoldText>
                    <RegularText style={{ color: this.props.textColor }}>({player.position})</RegularText>
                </View>
            </View>
        )
    }
}

class RosterFoePlayers extends React.Component {
    state = {
        scrollY: new Animated.Value(0),
        foe: {},
        backgroundColor: DefaultColors.ButtonBackground,
        accentColor: DefaultColors.ButtonText,
        textColor: DefaultColors.ButtonText
    };

    _renderItem = item => {
        return (<FoePlayerRow item={item} onPress={this._handlePressFoeButton}
            backgroundColor={this.state.backgroundColor} accentColor={this.state.accentColor} textColor={this.state.textColor} />)
    }

    componentDidMount = () => {
        let foe = this.props.navigation.state.params.foe.item;
        let backgroundColor = DefaultColors.ButtonBackground;
        let accentColor = DefaultColors.ButtonText;
        let textColor = DefaultColors.ButtonText;

        if (foe.backgroundColor)
            backgroundColor = foe.backgroundColor;
        if (foe.accentColor)
            accentColor = foe.accentColor;
        if (foe.textColor)
            textColor = foe.textColor;

        this.setState({ foe, backgroundColor, accentColor, textColor });
    }

    render() {
        const { scrollY } = this.state;
        const scale = scrollY.interpolate({
            inputRange: [-300, 0, 1],
            outputRange: [2, 1, 1],
            extrapolate: 'clamp'
        });
        const translateX = 0;
        const translateY = scrollY.interpolate({
            inputRange: [-300, 0, 1],
            outputRange: [-50, 1, 1],
            extrapolate: 'clamp'
        });

        const headerOpacity = scrollY.interpolate({
            inputRange: [0, 30, 200],
            outputRange: [0, 0, 1]
        });

        let foe = this.state.foe;

        let foeImage =
            <View>
                <Ionicons name={Skin.Roster_FoesTabIcon} color={DefaultColors.ButtonBackground} size={150} />
                <BoldText style={{ color: DefaultColors.ColorText, marginBottom: 10 }}>{foe.opponent}</BoldText>
            </View>
        if (foe.logo) {
            let logoUri = { uri: foe.logo };
            foeImage = <Animated.View
                style={{
                    transform: [{ scale }, { translateX }, { translateY }]
                }}
            >
                <FadeIn>
                    <Image
                        source={logoUri}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                </FadeIn>
            </Animated.View>
        }

        return (
            <LoadingPlaceholder>
                <ScrollView>
                    <View style={styles.imageContainer}>{foeImage}</View>
                    {(foe.players && (foe.players.length > 0)) &&
                        <View style={{ flex: 1, flexDirection: "row", height: 3, backgroundColor: foe.accentColor }} />
                    }
                    <FlatList
                        renderScrollComponent={props => <ScrollView {...props} />}
                        data={foe.players}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {(foe.players && (foe.players.length > 0)) &&
                        <View style={{ flex: 1, flexDirection: "row", height: 3, backgroundColor: foe.accentColor }} />
                    }
                </ScrollView>
                <NavigationBar
                    animatedBackgroundOpacity={headerOpacity}
                    paddingTop={0}
                    style={[{ paddingTop: 0 },
                    Platform.OS === 'android'
                        ? { height: Layout.headerHeight + Constants.statusBarHeight }
                        : null
                    ]}
                    renderLeftButton={() => (
                        <View
                            style={{
                                // gross dumb things
                                paddingTop: Platform.OS === 'android' ? 10 : 0,
                                marginTop: Layout.notchHeight > 0 ? -5 : 0
                            }}
                        >
                            <HeaderBackButton
                                onPress={() => this.props.navigation.goBack()}
                                tintColor={DefaultColors.ButtonBackground}
                                title={null}
                            />
                        </View>
                    )}
                />
            </LoadingPlaceholder>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 175,
        height: 175,
        borderRadius: 0,
        marginBottom: 10
    },
    playerRow: {
        flex: 1,
        flexDirection: i18n.getFlexDirection()
    }
});

export default withUnstated(RosterFoePlayers, { globalData: GlobalDataContainer });