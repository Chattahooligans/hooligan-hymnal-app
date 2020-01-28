import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerItems, NavigationActions, SafeAreaView } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Layout } from '../constants';
import i18n from '../../i18n';

const CustomDrawer = props => (
  <View style={styles.container}>
    <View style={styles.drawerHeader}>
      <Image
        source={require('../../assets/drawer-hero-background.png')}
        style={styles.backgroundImage}
      />
      <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
      <View style={[StyleSheet.absoluteFill, styles.logoContainer]}>
        <Image
          source={require('../../assets/drawer-hero-logo.png')}
          style={styles.logoImage}
        />
      </View>
    </View>
    <ScrollView>
      <DrawerItems
        {...props}
        activeBackgroundColor="rgba(255,255,255,0.1)"
        labelStyle={{ color: 'white', textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}
        onItemPress={({ route, focused }) => {
          if (route.routeName === 'CapoHome') {
            if (props.globalData.state.unlocked === true) {
              props.navigation.navigate('CapoHome');
            } else {
              props.navigation.navigate('CapoLogin');
            }
          } else {
            props.onItemPress({ route });
          }
        }}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    height: 140 + Layout.notchHeight,
    width: '100%',
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  imageOverlay: {
    backgroundColor: 'rgba(3, 46, 85, 0.57)'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.notchHeight + 20
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain'
  }
});

export default withUnstated(CustomDrawer, { globalData: GlobalDataContainer });
