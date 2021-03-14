import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { Platform, View, StatusBar, LogBox } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "unstated";
import { loadSavedTalksAsync } from "./src/utils/storage";
import { NavigationContainer } from "@react-navigation/native";
import RootDrawerNavigation from "./src/navigation/RootDrawerNavigation";
import { Fonts, Images, Skin } from "./config";

LogBox.ignoreLogs(["Warning: bind()"]);

// notification does not display if the app is already open by default
// this corrects the behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

class App extends React.Component {
  state = {
    errorMessage: null,
    fontLoaded: false,
  };

  _loadResourcesAsync = async () => {
    try {
      await this._loadAssetsAsync();
      await this._loadDataAsync();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState(
        {
          fontLoaded: true,
        },
        async () => {
          await SplashScreen.hideAsync();
        }
      );
    }
  };

  _loadDataAsync = () => {
    return loadSavedTalksAsync();
  };

  _loadAssetsAsync = async () => {
    let imagesArray = [];
    Object.values(Images).forEach((value) => {
      imagesArray.push(value);
    });

    let fonts = {};
    Object.keys(Fonts).forEach((key) => {
      fonts[Fonts[key].family] = Fonts[key].file;
    });

    return Promise.all([
      Font.loadAsync({
        ...fonts,
        ...MaterialCommunityIcons.font,
      }),
      Asset.loadAsync(imagesArray),
      Asset.fromModule(
        require("@react-navigation/stack/src/views/assets/back-icon.png")
      ).downloadAsync(),
    ]);
  };

  async componentDidMount() {
    SplashScreen.preventAutoHideAsync().catch((err) => {});
    try {
      await this._loadResourcesAsync();
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded) {
      return null;
    }

    return (
      <Provider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootDrawerNavigation />
            <StatusBar
              backgroundColor={Skin.StatusBar_BackgroundColor}
              barStyle={Skin.StatusBar_BarStyle}
              translucent={false}
            />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
