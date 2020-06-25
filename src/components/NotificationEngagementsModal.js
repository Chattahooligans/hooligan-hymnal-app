import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BoldText,
  RegularText,
  MediumText,
  RegularTextMonospace,
} from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultColors, Skin } from "../../config";
import { getEngagementSummary } from "../services/feedService";
import moment from "moment";
import i18n from "../i18n";

export default class NotificationEngagementsModal extends React.Component {
  state = {
    summary: {
      count: 0,
      firstEngagement: "",
      latestEngagement: "",
    },
    engagements: [],
  };

  async componentDidUpdate(prevProps) {
    // Only hit the server if .visible changes from false to true
    if (!prevProps.visible && this.props.visible) {
      const engagementSummary = await getEngagementSummary(this.props.post._id);
      this.setState({ summary: engagementSummary[0] });
    }
  }

  render() {
    let summary = "";
    summary += "Count: " + this.state.summary.count + "\n";
    summary +=
      "First: " +
      moment(this.state.summary.firstEngagement).format("M/D/YY h:mm:ssa") +
      "\n";
    summary +=
      "Latest: " +
      moment(this.state.summary.latestEngagement).format("M/D/YY h:mm:ssa");

    return (
      <Modal
        transparent={true}
        animationType="none"
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <BoldText style={styles.title}>Notification Engagements</BoldText>
              <TouchableOpacity
                style={styles.close}
                onPress={this.props.onRequestClose}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={25}
                  style={{
                    color: DefaultColors.Secondary,
                    backgroundColor: "transparent",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.postInfoContainer}>
                <RegularTextMonospace style={styles.postId} selectable={true}>
                  {this.props.post._id}
                </RegularTextMonospace>
                <RegularText style={styles.date} selectable={true}>
                  Published:{" "}
                  {moment(this.props.post.publishedAt).format("M/D/YY h:mma")}
                </RegularText>
              </View>
              <RegularText style={styles.summary} selectable={true}>
                {summary}
              </RegularText>
            </View>
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
    backgroundColor: Skin.NotificationEngagementsModal_Container,
  },
  container: {
    backgroundColor: DefaultColors.Background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  titleContainer: {
    flexDirection: i18n.getFlexDirection(),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
  },
  close: {
    marginTop: -15,
    marginRight: -15,
    marginLeft: 10,
    backgroundColor: DefaultColors.Secondary,
    width: 25,
    height: 25,
    borderColor: DefaultColors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  postInfoContainer: {
    paddingBottom: 5,
  },
  postId: {},
  date: {},
  summary: {},
});
