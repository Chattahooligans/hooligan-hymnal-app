/* @flow */

// This is copied from react-navigation and changed to use BorderlessButton from RGNH

import * as React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import TabBarIcon from 'react-navigation/src/views/TabView/TabBarIcon';
import SafeAreaView from 'react-navigation/src/views/SafeAreaView';
import withOrientation from 'react-navigation/src/views/withOrientation';
import { BorderlessButton } from 'react-native-gesture-handler';

import type {
  NavigationRoute,
  NavigationState,
  NavigationScreenProp,
  ViewStyleProp,
  TextStyleProp,
} from 'react-navigation/src/TypeDefinition';

import type { TabScene } from 'react-navigation/src/views/TabView/TabView';

type Props = {
  activeTintColor: string,
  activeBackgroundColor: string,
  inactiveTintColor: string,
  inactiveBackgroundColor: string,
  showLabel: boolean,
  showIcon: boolean,
  allowFontScaling: boolean,
  position: Animated.Value,
  navigation: NavigationScreenProp<NavigationState>,
  jumpToIndex: (index: number) => void,
  getLabel: (scene: TabScene) => ?(React.Node | string),
  getOnPress: (
    scene: TabScene
  ) => (scene: TabScene, jumpToIndex: (index: number) => void) => void,
  getTestIDProps: (scene: TabScene) => (scene: TabScene) => any,
  renderIcon: (scene: TabScene) => React.Node,
  style?: ViewStyleProp,
  labelStyle?: TextStyleProp,
  tabStyle?: ViewStyleProp,
  showIcon?: boolean,
  isLandscape: boolean,
};

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const useHorizontalTabs = majorVersion >= 11 && isIos;

class TabBarBottom extends React.PureComponent<Props> {
  // See https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/UIKitUICatalog/UITabBar.html
  static defaultProps = {
    activeTintColor: '#3478f6', // Default active tint color in iOS 10
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true,
    allowFontScaling: true,
  };

  props: Props;

  _renderLabel = (scene: TabScene) => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      labelStyle,
      showLabel,
      showIcon,
      isLandscape,
      allowFontScaling,
    } = this.props;
    if (showLabel === false) {
      return null;
    }
    const { index } = scene;
    const { routes } = navigation.state;
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x: *, i: number) => i)];
    const outputRange = inputRange.map(
      (inputIndex: number) =>
        inputIndex === index ? activeTintColor : inactiveTintColor
    );
    const color = position.interpolate({
      inputRange,
      outputRange: (outputRange: Array<string>),
    });

    const tintColor = scene.focused ? activeTintColor : inactiveTintColor;
    const label = this.props.getLabel({ ...scene, tintColor });
    let marginLeft = 0;
    if (isLandscape && showIcon && useHorizontalTabs) {
      marginLeft = LABEL_LEFT_MARGIN;
    }
    let marginTop = 0;
    if (!isLandscape && showIcon && useHorizontalTabs) {
      marginTop = LABEL_TOP_MARGIN;
    }

    if (typeof label === 'string') {
      return (
        <Animated.Text
          style={[styles.label, { color, marginLeft, marginTop }, labelStyle]}
          allowFontScaling={allowFontScaling}
        >
          {label}
        </Animated.Text>
      );
    }

    if (typeof label === 'function') {
      return label({ ...scene, tintColor });
    }

    return label;
  };

  _renderIcon = (scene: TabScene) => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon,
      showLabel,
    } = this.props;
    if (showIcon === false) {
      return null;
    }
    return (
      <TabBarIcon
        position={position}
        navigation={navigation}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        scene={scene}
        style={showLabel && useHorizontalTabs ? {} : styles.icon}
      />
    );
  };

  _renderTestIDProps = (scene: TabScene) => {
    const testIDProps =
      this.props.getTestIDProps && this.props.getTestIDProps(scene);
    return testIDProps;
  };

  render() {
    const {
      position,
      navigation,
      jumpToIndex,
      getOnPress,
      getTestIDProps,
      activeBackgroundColor,
      inactiveBackgroundColor,
      style,
      tabStyle,
      isLandscape,
    } = this.props;
    const { routes } = navigation.state;
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x: *, i: number) => i)];

    const tabBarStyle = [
      styles.tabBar,
      isLandscape && useHorizontalTabs
        ? styles.tabBarLandscape
        : styles.tabBarPortrait,
      style,
    ];

    return (
      <Animated.View>
        <SafeAreaView
          style={tabBarStyle}
          forceInset={{ bottom: 'always', top: 'never' }}
        >
          {routes.map((route: NavigationRoute, index: number) => {
            const focused = index === navigation.state.index;
            const scene = { route, index, focused };
            /*const onPress = getOnPress(scene);*/
            const outputRange = inputRange.map(
              (inputIndex: number) =>
                inputIndex === index
                  ? activeBackgroundColor
                  : inactiveBackgroundColor
            );
            const backgroundColor = position.interpolate({
              inputRange,
              outputRange: (outputRange: Array<string>),
            });

            const justifyContent = this.props.showIcon ? 'flex-end' : 'center';
            const extraProps = this._renderTestIDProps(scene) || {};
            const { testID, accessibilityLabel } = extraProps;

            return (
              <BorderlessButton
                key={route.key}
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                style={{ flex: 1 }}
                onPress={() => {
                  jumpToIndex(index)
                }}
              >
                <Animated.View
                  style={[
                    styles.tab,
                    isLandscape && useHorizontalTabs && styles.tabLandscape,
                    !isLandscape && useHorizontalTabs && styles.tabPortrait,
                    { backgroundColor },
                    tabStyle,
                  ]}
                >
                  {this._renderIcon(scene)}
                  {this._renderLabel(scene)}
                </Animated.View>
              </BorderlessButton>
            );
          })}
        </SafeAreaView>
      </Animated.View>
    );
  }
}

const LABEL_LEFT_MARGIN = 20;
const LABEL_TOP_MARGIN = 15;
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F7F7F7', // Default background color in iOS 10
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    flexDirection: 'row',
  },
  tabBarLandscape: {
    height: 29,
  },
  tabBarPortrait: {
    height: 49,
  },
  tab: {
    flex: 1,
    alignItems: isIos ? 'center' : 'stretch',
    justifyContent: 'flex-end',
    paddingBottom: 3,
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    flexGrow: 1,
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
});

export default withOrientation(TabBarBottom);
