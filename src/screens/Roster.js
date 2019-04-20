import React from 'react';
import {
  Platform,
  Image,
  SectionList,
  StyleSheet,
  View,
  Text
} from 'react-native';

import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import { BoldText, MediumText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import Players from '../data/players.json';
import Squads from '../data/roster.json';

import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';

import { find, propEq } from 'ramda';

let rosterData = [];
Squads.squads.forEach(squadChild => {
  let playerList = [];

  //console.log(squadChild.squad_title);
  squadChild.players.forEach(playerChild => {
    try {
      let player = Players.filter(player => player._id === playerChild._id)[0];
      //console.log(player._id + " " + player.name);
      playerList.push(player);
    } catch (err) {
      console.log(playerChild._id + ' not found in players database');
    }
  });

  if (0 < playerList.length)
    rosterData.push({ title: squadChild.squad_title, data: playerList });
});

class PlayerRow extends React.Component {
  render() {
    const { item: player } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowAvatarContainer}>
            <FadeIn>
              <Image
                source={require('../../assets/chattfc_logo.png')}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </FadeIn>
          </View>
          <View style={styles.rowData}>
            <View
              style={{ width: 25, alignItems: 'flex-end', paddingRight: 5 }}
            >
              <BoldText>{player.squadNumber}</BoldText>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <MediumText>{player.name}</MediumText>
              <RegularText>{player.position}</RegularText>
            </View>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

class Roster extends React.Component {
  static navigationOptions = {
    headerTitle: "Roster",
    ...NavigationOptions
  };
  
  state = {
    rosterTitle: "Roster",
    squads: []
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.players &&
      this.props.globalData.state.players
    ) {
      this.setData();
    }
  }

  setData = () => {
    console.log('setData');

    let rosterTitle = this.props.globalData.state.roster.rosterTitle;
    let squads = [];
    let players = this.props.globalData.state.players;
    
    this.props.globalData.state.roster.squads.forEach(squadChild => {
      let playerList = [];

      //console.log(squadChild.squad_title);
      squadChild.players.forEach(playerChild => {
        try {
          let player = players.filter(player => player._id === playerChild._id)[0];
          //console.log(player._id + " " + player.name);
          playerList.push(player);
        } catch (err) {
          console.log(playerChild._id + ' not found in players database');
        }
      });

      if (0 < playerList.length)
        squads.push({ title: squadChild.squadTitle, data: playerList });
    });

    this.setState({ rosterTitle, squads });

    // TODO:
    // line 92
    // fix static navigationOptions.headerTitle = state.rosterTitle (there is a scoping issue here) 
  }

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SectionList
            renderScrollComponent={props => <ScrollView {...props} />}
            stickySectionHeadersEnabled={true}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={this.state.squads}
            keyExtractor={(item, index) => index}
          />
        </View>
      </LoadingPlaceholder>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <RegularText>{section.title}</RegularText>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return <PlayerRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = player => {
    // console.log('player click', player.name);
    this.props.navigation.navigate('Player', { player });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%'
  },
  row: {
    flex: 1,
    paddingTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row'
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0
  },
  rowData: {
    flex: 1,
    flexDirection: 'row'
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  }
});

export default withUnstated(Roster, { globalData: GlobalDataContainer });