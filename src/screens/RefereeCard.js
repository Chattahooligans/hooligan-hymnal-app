import React from "react";
import { StyleSheet, View } from "react-native";

export default class RefereeCard extends React.Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.color }]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
