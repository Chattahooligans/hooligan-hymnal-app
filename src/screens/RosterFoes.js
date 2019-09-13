import React from 'react';
import { FlatList, ScrollView, SectionList, StyleSheet, View} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import NavigationOptions from '../config/NavigationOptions';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, MediumText, RegularText } from '../components/StyledText';
import { FontSizes } from '../constants';
import { Palette, Skin, DefaultColors } from '../config/Settings';

class FoeRow extends React.Component {
    render() {
        const { item: foe } = this.props.item;

        if (foe.backgroundColor == null || foe.backgroundColor == '')
            foe.backgroundColor = styles.bigButton.backgroundColor;
        if (foe.accentColor == null || foe.accentColor == '')
            foe.accentColor = styles.bigButtonText.color;
        if (foe.textColor == null || foe.textColor == '')
            foe.textColor = styles.bigButtonText.color;

        return (
            <ClipBorderRadius>
                <RectButton
                    style={[styles.bigButton, {backgroundColor: foe.backgroundColor}]}
                    onPress={this._handlePress}
                    underlayColor="#fff"
                >
                    <MediumText style={[styles.bigButtonText, {color: foe.textColor}]}>
                        {foe.opponent}
                    </MediumText>
                </RectButton>
            </ClipBorderRadius>
        )
    }

    _handlePress = () => {
        this.props.onPress(this.props.item);
    };
}

class RosterFoes extends React.Component {
    state = {
        foes: []
    }

    componentDidMount() {
        this.setData();
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.foes && this.props.globalData.state.foes)
            this.setData();
    }

    setData = () => {
        let foes = [];
        this.props.globalData.state.foes.forEach(foeChild => {
            foes.push(foeChild);            
        });

        foes.sort(this.compareFoes);

        this.setState({foes});
    }

    compareFoes = (a, b) => {
        const opponentA = a.opponent;
        const opponentB = b.opponent;
    
        if (opponentA > opponentB)
          return 1;
        else if (opponentB > opponentA)
          return -1;
    
        return 0;
      };

    _renderItem = item => {
        return ( <FoeRow item={item} onPress={this._handlePressFoeButton} /> )
    }

    _handlePressFoeButton = foe => {
        this.props.navigation.navigate('FoePlayers', { foe });
    }

    render() {
        return (
            <LoadingPlaceholder>
                <FlatList
                    renderScrollComponent={props => <ScrollView {...props} />}
                    data={this.state.foes}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </LoadingPlaceholder>
        );
    }
}

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

  const BORDER_RADIUS = 3;

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
      },
      row: {
        flex: 1,
        paddingTop: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row'
    }
});

export default withUnstated(RosterFoes, { globalData: GlobalDataContainer });