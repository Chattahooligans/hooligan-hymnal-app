import React from 'react';
import {
    FlatList,
    Picker,
    ScrollView,
    StyleSheet
} from 'react-native';
import { BigButton } from '../components/BigButton';
import ModalSelector from 'react-native-modal-selector';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
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
            <BigButton
                style={{
                    marginTop: 10,
                    backgroundColor: foe.backgroundColor,
                    tintColor: foe.textColor
                }}
                label={foe.opponent}
                onPress={this._handlePress} />
        )
    }

    _handlePress = () => {
        this.props.onPress(this.props.item);
    };
}

class RosterFoes extends React.Component {
    state = {
        foes: {},
        selectedCompetition: ""
    }

    componentDidMount() {
        this.setData();
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.foes && this.props.globalData.state.foes)
            this.setData();
    }

    setData = () => {
        let foes = {}
        let competitions = []

        // bucket by competition
        this.props.globalData.state.foes.forEach(foe => {
            if (!competitions.includes(foe.competition))
                competitions.push(foe.competition)
        })
        competitions.sort((a, b) => a > b)
        competitions.forEach(competition => foes[competition] = [])

        // sort foes into buckets
        this.props.globalData.state.foes.forEach(foe => (foes[foe.competition]).push(foe))
        competitions.forEach(competition => foes[competition].sort((a, b) => a.opponent > b.opponent))

        this.setState({ foes, selectedCompetition: competitions.length > 0 ? competitions[0] : "" });
    }

    _renderItem = item => {
        return (<FoeRow item={item} onPress={this._handlePressFoeButton} />)
    }

    _handlePressFoeButton = foe => {
        this.props.navigation.navigate('FoePlayers', { foe });
    }

    render() {
        let pickerItems = [];

        return (
            <LoadingPlaceholder>
                <FlatList
                    renderScrollComponent={props => <ScrollView {...props} />}
                    data={this.state.foes[this.state.selectedCompetition]}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </LoadingPlaceholder>
        );
    }
}

const styles = StyleSheet.create({

});

export default withUnstated(RosterFoes, { globalData: GlobalDataContainer });