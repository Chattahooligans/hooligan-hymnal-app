import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-tiny-toast";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import { FontSizes } from "../constants";
import { RegularText } from "../components/StyledText";
import SongView from "../components/SongView";
import { DefaultColors, Skin } from "../../config";
import i18n from "../i18n";

let defaultChapterTitle = i18n.t("screens.songbook.defaultchaptertitle");
const screenWidth = Dimensions.get("window").width;

class SongbookPages extends React.Component {
  state = {
    chapterTitle:
      this.props.globalData.state.songList[0].chapterTitle ||
      defaultChapterTitle,
    songList: this.props.globalData.state.songList,
    showToast: true,
    entryTime: null,
  };

  componentDidUpdate(prevProps) {
    if (this.state.songList != this.props.globalData.state.songList)
      this.setState({
        chapterTitle:
          this.props.globalData.state.songList[0].chapterTitle ||
          defaultChapterTitle,
        songList: this.props.globalData.state.songList,
      });

    if (
      this.props.route.params &&
      this.props.route.params.entryTime != this.state.entryTime
    ) {
      this.setState({ entryTime: this.props.route.params.entryTime });
      this.scrollToSong();
    }
  }

  _onSongbookMomentumScrollEnd = ({ nativeEvent }) => {
    const pageIndex = Math.round(nativeEvent.contentOffset.x / screenWidth);
    this.setState({
      chapterTitle: this.state.songList[pageIndex].chapterTitle,
    });
  };

  scrollToSong = () => {
    if (this.props.route.params && this.props.route.params.page) {
      if (this.state.showToast) {
        Toast.show(i18n.t("screens.songbook.swipetoview"));
        this.setState({ showToast: false });
      }

      const offset = (this.props.route.params.page - 1) * screenWidth;
      this.setState({
        chapterTitle: this.state.songList[this.props.route.params.page - 1]
          .chapterTitle,
      });

      this._scrollView.scrollToOffset({
        offset: offset,
        animated: false,
      });

      /*
      this._scrollView.scrollToIndex({
        index: this.props.route.params.page - 1,
        animated: false,
      });
      */
    }
  };

  _renderItem({ item, index }) {
    return (
      <View
        style={{ flex: 1, width: screenWidth }}
        key={"SongbookPages-View-" + (index + 1)}
      >
        <SongView song={item} pageCount={index + 1} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <RegularText style={styles.chapterText}>
            {this.state.chapterTitle}
          </RegularText>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            ref={(component) => (this._scrollView = component)}
            horizontal={true}
            pagingEnabled={true}
            keyExtractor={(item, index) => item._id + "-" + index}
            renderItem={this._renderItem}
            onMomentumScrollEnd={this._onSongbookMomentumScrollEnd}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            initialNumToRender={1}
            data={this.state.songList}
          />
        </View>

        <RectButton
          style={styles.tocButtonStyle}
          onPress={() => this.props.navigation.goBack()}
          underlayColor="#fff"
        >
          <MaterialCommunityIcons
            name="table-of-contents"
            size={23}
            style={{
              color: DefaultColors.ButtonText,
              marginVertical: 3,
              marginHorizontal: 5,
              backgroundColor: "transparent",
            }}
          />
          <RegularText style={styles.tocButtonText}>
            {i18n.t("screens.songbook.tableofcontents")}
          </RegularText>
        </RectButton>
      </View>
    );
  }
}

export default withUnstated(SongbookPages, { globalData: GlobalDataContainer });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin.SongbookPages_Background,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: i18n.getRTLTextAlign(),
  },
  chapterText: {
    textAlign: "center",
  },
  tocButtonStyle: {
    backgroundColor: Skin.SongbookContents_ButtonBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 0,
    width: 100 + "%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: i18n.getFlexDirection(),
  },
  tocButtonText: {
    fontSize: FontSizes.normalButton,
    color: "#fff",
    textAlign: "center",
  },
});
