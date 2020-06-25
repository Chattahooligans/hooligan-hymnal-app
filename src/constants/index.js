import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Header } from 'react-navigation';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const isIPhoneX =
  Platform.OS === 'ios' && (D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH);
const notchHeight = isIPhoneX ? 20 : 0;

const isSmallDevice = D_WIDTH < 326;

export const Layout = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  notchHeight,
  isSmallDevice,
  headerHeight: Platform.OS === 'android' ? 56 : 45 + notchHeight //64 + notchHeight
};

export const Colors = {
  green: '#002D56',
  faint: '#A3D8F7'
};

export const Icons = {
  favorite: `ios-bookmark-outline`,
  favoriteActive: `ios-bookmark`
};

export const FontSizes = {
  title: isSmallDevice ? 16 : 18,
  subtitle: isSmallDevice ? 14 : 16,
  bodyLarge: 14,
  bodyTitle: isSmallDevice ? 14 : 15,
  normalButton: isSmallDevice ? 15 : 16
};
