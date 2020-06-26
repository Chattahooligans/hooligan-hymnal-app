import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Post from "../components/Post";
import { HeaderBackButton } from "react-navigation";
import appJson from "../../app.json";

export default class SinglePost extends React.Component {
  render() {
    this.props.navigation.setOptions({
      headerTitle: appJson.expo.name + ": View Post",
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="#fff"
        />
      ),
    });

    return (
      <ScrollView style={styles.container}>
        <Post
          style={{ flex: 1 }}
          post={this.props.route.params.post}
          navigation={this.props.navigation}
          fullScreen={true}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
