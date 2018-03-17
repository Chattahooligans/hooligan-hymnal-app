import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';

import Swiper from 'react-native-deck-swiper'
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { BoldText, RegularText, SemiBoldText } from '../components/StyledText';
import { Colors, FontSizes, Layout } from '../constants';

import images from './images'

@withNavigation
export default class Dating extends React.Component {
  static navigationOptions = {
    title: 'Supportr Dating',
    ...NavigationOptions
  };

  constructor (props) {
    super(props)
    this.state = {
      cards: images,
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: true,
      cardIndex: 0
    }
  }

  renderCard = card => {
    console.log('card', card);
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={card} />
      </View>
    )
  };

  onSwipedAllCards = () => {
    this.props.navigation.navigate('Home');
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  swipeRight = () => {
    this.swiper.swipeRight()
  };

  render () {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          backgroundColor={'#A5D8F6'}
          verticalSwipe={false}
          infinite={true}
          onSwiped={this.onSwiped}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={10}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
      },
      image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
      },
      done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
      }
});
