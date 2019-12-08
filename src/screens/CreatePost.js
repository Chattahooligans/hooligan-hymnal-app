import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  Keyboard
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Colors, FontSizes, Layout } from '../constants';
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import i18n from "../../i18n";

class CreatePost extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.createpost.title'),
        ...NavigationOptions,
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        post: null
    }

    componentDidMount() {
        this.setData();
    }

    setData = () => {
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}

const BORDER_RADIUS = 3;
const styles = StyleSheet.create({
});

export default withUnstated(CreatePost, { globalData: GlobalDataContainer });