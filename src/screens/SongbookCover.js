import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Skin } from "../../config";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import i18n from "../i18n";

class SongbookCover extends React.Component {
  state = {
    showSongbookCover: this.props.globalData.state.showSongbookCover,
    songListExists: this.props.globalData.state.songList ? true : false,
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.songbook.title"),
    });

    this.setData();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.globalData.state.songList !=
      this.props.globalData.state.songList
    )
      this.setData();
  }

  setData() {
    if (!this.props.globalData.state.songList)
      this.props.globalData.computeSongbook(() =>
        this.setState({
          songListExists: this.props.globalData.state.songList ? true : false,
        })
      );

    // force this page to render with something so the top level drawer doesn't hang up
    if (this.state.showSongbookCover) {
      setTimeout(() => {
        this.props.globalData.setShowSongbookCover(false);
        this.setState({ showSongbookCover: false });
      }, 500);
    }
  }

  render() {
    let songbookCover = Skin.SongbookCover_DefaultImage;
    if (this.props.globalData.state.songbook.frontCover)
      songbookCover = { uri: this.props.globalData.state.songbook.frontCover };

    let { width, height } = Image.resolveAssetSource(songbookCover);
    let ratio = width / height;
    let scaledHeight = Dimensions.get("window").width / ratio;

    if (this.state.songListExists && !this.state.showSongbookCover)
      this.props.navigation.reset({ index: 0, routes: [{ name: "Songbook" }] });

    return (
      <View style={styles.container}>
        <Image
          style={{
            width: Dimensions.get("window").width,
            height: scaledHeight,
          }}
          source={songbookCover}
        />
        <ActivityIndicator
          size="large"
          animating={true}
          color={Skin.SongbookCover_ActivityIndicatorColor}
        />
      </View>
    );
  }
}

export default withUnstated(SongbookCover, { globalData: GlobalDataContainer });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin.SongbookCover_Background,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
