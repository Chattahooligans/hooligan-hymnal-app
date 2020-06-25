import React from 'react';
import { Animated, Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Layout } from '../constants';
import { Skin, DefaultColors } from '../../config';
import i18n from '../i18n';

export default class NavigationBar extends React.Component {
  render() {
    if (this.props.animatedBackgroundOpacity) {
      return this._renderAnimated();
    } else {
      return this._renderStatic();
    }
  }

  _renderAnimated = () => {
    return (
      <View style={[styles.navigationBarContainer, this.props.style]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: DefaultColors.HeaderBackground,
              opacity: this.props.animatedBackgroundOpacity,
            },
          ]}>
          <View style={[styles.navigationBarTitleContainer]}>
            {this.props.renderTitle && this.props.renderTitle()}
          </View>
        </Animated.View>

        <View style={styles.navigationBarLeftButton}>
          {this.props.renderLeftButton && this.props.renderLeftButton()}
        </View>


        <View style={styles.navigationBarRightButton}>
          {this.props.renderRightButton && this.props.renderRightButton()}
        </View>
      </View>
    );
  };

  _renderStatic = () => {
    return (
      <View style={styles.navigationBarContainer}>
        <View style={styles.navigationBarLeftButton}>
          {this.props.renderLeftButton && this.props.renderLeftButton()}
        </View>

        <View style={styles.navigationBarTitleContainer}>
          {this.props.renderTitle && this.props.renderTitle()}
        </View>

        <View style={styles.navigationBarRightButton}>
          {this.props.renderRightButton && this.props.renderRightButton()}
        </View>
      </View>
    );
  };
}

// Didn't want to investigate why I needed to offset this a bit, surely there is a good reason
const MARGIN_TOP = Platform.OS === 'ios' ? Constants.statusBarHeight : 4;

const styles = StyleSheet.create({
  navigationBarContainer: {
    backgroundColor: 'transparent',
    height: Platform.OS === 'ios' ? Layout.headerHeight + Constants.statusBarHeight : Layout.headerHeight,
    position: 'absolute',
    paddingTop: MARGIN_TOP,
    top: 0,
    left: 0,
    right: 0,
  },
  navigationBarTitleContainer: {
    marginVertical: MARGIN_TOP,
  },
  navigationBarLeftButton: {
    marginTop: Platform.OS === 'ios' ? 4 : 10,
    width: 80,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  navigationBarRightButton: {
    top: MARGIN_TOP,
    width: 80,
    right: Platform.OS === 'android' ? 8 : 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
  },
});
