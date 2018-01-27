import React from 'react';
import { Image, Platform, StyleSheet, View, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';
import { Colors, FontSizes } from '../constants';

// TODO: If capo mode is not enabled (using AsyncStorage?), redirect to CapoLogin
// TODO: Create Song object, set title and lyrics based on data on this screen and pass to next screen (CapoConfirmSend)
//      maybe by reading in /src/data/song_schema.json as an object and setting those properties?
// Back Button on the nav bar for this screen, goes back to capo dashboard

@withNavigation
export default class CapoComposeSong extends React.Component {
    static navigationOptions = {
        title: 'Capo Compose Song',
        ...NavigationOptions
      };
  
    render() {
    return (
        <LoadingPlaceholder>
            <Text>Title</Text>
            <TextInput style={styles.titleField} />
            <Text>Lyrics</Text>
            <TextInput style={styles.lyricsField} multiline={true} />
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={this._handlePressContinueButton}
                    underlayColor="#fff">
                    <Ionicons
                        size={23}
                        style={{
                            color: '#fff',
                            marginTop: 3,
                            backgroundColor: 'transparent',
                            marginRight: 5
                        }}
                    />
                    <SemiBoldText style={styles.bigButtonText}>Continue</SemiBoldText>
                </RectButton>
            </ClipBorderRadius>
        </LoadingPlaceholder>
    );
  }

  _handlePressContinueutton = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'CapoConfirmSend'
      })
    );
  };
}

const ClipBorderRadius = ({ children, style }) => {
    return (
      <View
        style={[
          { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10, marginBottom: 10 },
          style
        ]}
      >
        {children}
      </View>
    );
  };
  
  const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  titleField:{
    fontSize: 24,
    fontWeight: 'bold',
    height: 50
  },
  lyricsField: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 }
      },
      android: {
        elevation: 3
      }
    })
  },
  bigButton: {
    backgroundColor: Colors.green,
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
    color: '#fff',
    textAlign: 'center'
  },
});
