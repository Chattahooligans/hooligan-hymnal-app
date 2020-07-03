import React from "react";
import {
  Keyboard,
  Text,
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import {
  BoldText,
  MediumText,
  RegularText,
  UnderlineText,
} from "../components/StyledText";
import { ModalLoader } from "../components/ModalLoader";
import { Colors, FontSizes } from "../constants";
import { Skin, DefaultColors } from "../../config";
import { login, checkToken } from "../services/loginService";
import i18n from "../i18n";
import { AsyncStorage } from "react-native";

// TODO: Hard code password for now
// Add top nav bar with Back button
//      on back button press, redirect to Home screen
// alternately, is there a home button for the top nav bar?
//
// If password is correct, enable capo mode (using AsyncStorage?) and go back to CapoHome.js
// If password is incorrect, show invalid password message

class AdminLogin extends React.Component {
  state = {
    password: "",
    username: "",
    loading: false,
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.adminlogin.title"),
    });

    this.setData();
  }

  setData = async () => {
    let currentUser = this.props.globalData.getCurrentUser();
    let bearerToken = "";
    if (currentUser) bearerToken = currentUser.token;
    if (bearerToken && bearerToken !== "") {
      //bearerToken is present from previous login
      //check if still valid and bypass login if so
      try {
        const responseJson = await checkToken(bearerToken);
        console.log(responseJson);
        //bearerToken is valid, skip login
        Keyboard.dismiss();
        this.props.navigation.navigate("AdminHome");
      } catch (e) {
        console.log("Bearer token check failed: " + e);
        this.populateUserCredentials();
      }
    }
    this.populateUserCredentials();
  };

  async populateUserCredentials() {
    try {
      const username = await AsyncStorage.getItem("@adminusername");
      const password = await AsyncStorage.getItem("@adminpassword");
      if (username !== null && password !== null) {
        this._setPassword(password);
        this._setUsername(username);
      } else {
      }
    } catch (e) {
      // fine then... keep your secrets
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RegularText style={styles.instructions}>
          {i18n.t("screens.adminlogin.username")}
        </RegularText>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          onChangeText={this._setUsername}
          value={this.state.username}
        />
        <RegularText style={styles.instructions}>
          {i18n.t("screens.adminlogin.password")}
        </RegularText>
        <TextInput
          style={styles.textInput}
          onChangeText={this._setPassword}
          value={this.state.password}
          secureTextEntry={true}
        />
        <ClipBorderRadius>
          <RectButton
            style={styles.bigButton}
            onPress={this._handlePressSubmitButton}
            underlayColor="#fff"
          >
            <MediumText style={styles.bigButtonText}>
              {i18n.t("screens.adminlogin.login")}
            </MediumText>
          </RectButton>
        </ClipBorderRadius>

        <ModalLoader
          loading={this.state.loading}
          label={i18n.t("screens.adminlogin.loading")}
        />
      </View>
    );
  }

  _setPassword = (password) => this.setState({ password });
  _setUsername = (username) => this.setState({ username });

  _handlePressSubmitButton = async () => {
    this.setState({ loading: true });

    try {
      const responseJson = await login({
        email: this.state.username,
        password: this.state.password,
      });
      Keyboard.dismiss();

      // .token field in response indicates valid login
      if (responseJson.token) {
        try {
          await AsyncStorage.setItem("@adminusername", this.state.username);
          await AsyncStorage.setItem("@adminpassword", this.state.password);
        } catch (e) {
          console.log("Error storing credentials: " + e);
        }

        let nav = this.props.navigation;
        function navToAdminHome() {
          nav.navigate("AdminHome");
        }
        this.setState({ loading: false });
        this.props.globalData.setCurrentUser(responseJson, navToAdminHome);
      } else {
        this.setState({ loading: false });
        alert(i18n.t("screens.adminlogin.failed"));
      }
    } catch (e) {
      this.setState({ loading: false });
      alert("Error logging in: " + e);
    }
  };
}

const ClipBorderRadius = ({ children, style }) => {
  return (
    <View
      style={[
        { borderRadius: BORDER_RADIUS, overflow: "hidden", marginTop: 10 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    paddingBottom: 8,
    paddingTop: 15,
  },
  instructions: {
    fontSize: 18,
    paddingLeft: 15,
  },
  textInput: {
    fontSize: 18,
    padding: 8,
    paddingLeft: 15,
  },
  bigButton: {
    backgroundColor: DefaultColors.ButtonBackground,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    flexDirection: i18n.getFlexDirection(),
  },
  bigButtonText: {
    fontSize: FontSizes.normalButton,
    color: DefaultColors.ButtonText,
    textAlign: "center",
  },
});

export default withUnstated(AdminLogin, { globalData: GlobalDataContainer });
