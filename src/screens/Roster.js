import React from 'react';
import {
  Platform,
  Image,
  SectionList,
  StyleSheet,
  View,
  Text
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import NavigationOptions from '../config/NavigationOptions';
import { NavigationActions } from 'react-navigation';

import { BoldText, SemiBoldText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import state from '../state';

import Players from '../data/players.json';
import Squads from '../data/roster.json';

import NavigationBar from '../components/NavigationBar';
import { Colors, FontSizes, Layout } from '../constants';
import { Constants } from 'expo';

import { find, propEq } from 'ramda';

// on click on a song row
// search each page in parent.parent component and look for a _id property (yet to be created), snap to that page

//
//  Note: ToC may not live within the pager forever,
//  it is just hanging out there now.
//  ToC may be a button on this screen or somewhere else
//

let rosterData = [];
Squads.squads.forEach(squadChild => {
  let playerList = [];

  //console.log(squadChild.squad_title);
  squadChild.players.forEach(playerChild => {
    try {
      let player = Players.filter(player => player._id === playerChild._id)[0]
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
                source={require('../assets/chattfc_logo.png')}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </FadeIn>
          </View>
          <View style={styles.rowData}>
            <BoldText>{player.name}</BoldText>
            {player.squad_number ? (
              <SemiBoldText>{player.squad_number}</SemiBoldText>
            ) : null}
            <RegularText>{player.position}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class Roster extends React.Component {
  static navigationOptions = {
    title: Squads.roster_title,
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <View style={styles.container}>
          <SectionList
            renderScrollComponent={props => <ScrollView {...props} />}
            stickySectionHeadersEnabled={true}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={rosterData}
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

  _handlePressRow = item => {
    const player = find(propEq('_id', item._id), Players);
    // console.log('player', player);
    state.currentPlayer = player;
    this.props.navigation.navigate('Player');
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
    flex: 1
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
