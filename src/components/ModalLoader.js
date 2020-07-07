import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { DefaultColors, Skin } from "../../config";
import { RegularText } from "./StyledText";

export class ModalLoader extends React.Component {
  render() {
    const loading = this.props.loading;
    const label = this.props.label;
    return (
      <Modal transparent={true} animationType="none" visible={loading}>
        <View style={styles.modal}>
          <View>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={loading}
                size="large"
                color={Skin.ModalLoader_ActivityIndicator}
              />
            </View>
            {label && (
              <RegularText style={styles.labelStyle}>{label}</RegularText>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Skin.ModalLoader_Container,
  },
  activityIndicatorWrapper: {
    backgroundColor: Skin.ModalLoader_Background,
    padding: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  labelStyle: {
    marginTop: 10,
    color: Skin.ModalLoader_LabelColor,
    textAlign: "center",
  },
});
