import React from 'react';
import {
    FlatList,
    Picker,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { BigButton } from '../components/BigButton';
import ModalSelector from 'react-native-modal-selector';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { Ionicons } from '@expo/vector-icons';
import { Settings } from '../config/Settings';
import i18n from "../../i18n";

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
                buttonStyle={{ backgroundColor: foe.backgroundColor, borderWidth: 3, borderColor: foe.accentColor }}
                tintColor={foe.textColor}
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

        let selectedCompetition = ""
        if (competitions.length > 0)
            selectedCompetition = competitions[0]
        if (competitions.includes(Settings.RosterFoes_DefaultCompetition))
            selectedCompetition = Settings.RosterFoes_DefaultCompetition

        this.setState({ foes, selectedCompetition });
    }

    _renderItem = item => {
        return (<FoeRow item={item} onPress={this._handlePressFoeButton} />)
    }

    _handlePressFoeButton = foe => {
        this.props.navigation.navigate('FoePlayers', { foe });
    }

    render() {
        let header = null;
        if (Object.keys(this.state.foes).length > 0) {
            let pickerItems = [];

            if (Platform.OS === "ios") {
                Object.keys(this.state.foes).forEach(competition => {
                    pickerItems.push({ key: competition, label: competition });
                });
                header =
                    <ModalSelector
                        data={pickerItems}
                        selectedKey={this.state.selectedCompetition}
                        onChange={(item) => this.setState({ selectedCompetition: item.key })}>
                        <View style={{ flexDirection: i18n.getFlexDirection(), padding: 10, alignItems: "center" }}>
                            <Text style={{ flex: 1 }}>{this.state.selectedCompetition}</Text>
                            <Ionicons name={'md-arrow-dropdown'} />
                        </View>
                    </ModalSelector>
            }
            else {
                let pickerItems = [];
                Object.keys(this.state.foes).forEach(competition => {
                    pickerItems.push(<Picker.Item label={competition} value={competition} key={competition} />);
                });
                header =
                    <Picker
                        mode='dropdown'
                        enabled={pickerItems.length > 1}
                        selectedValue={this.state.selectedCompetition}
                        onValueChange={(itemValue) => this.setState({ selectedCompetition: itemValue })} >
                        {pickerItems}
                    </Picker>
            }
        }
        else {
            if (Platform.OS === "ios") {
                header =
                    <View style={{ flexDirection: i18n.getFlexDirection(), padding: 10, alignItems: "center" }}>
                        <Text style={{ flex: 1 }}>{i18n.t('screens.rosterfoes.nonefound')}</Text>
                        <Ionicons name={'md-arrow-dropdown'} />
                    </View>
            }
            else {
                header =
                    <Picker>
                        <Picker.Item label={i18n.t('screens.rosterfoes.nonefound')} />
                    </Picker>
            }
        }

        return (
            <LoadingPlaceholder>
                {header}
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