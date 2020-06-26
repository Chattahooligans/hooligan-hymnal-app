import React from "react";
import {
  ViewPagerAndroid,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import SongView from "../components/SongView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import { FontSizes, Layout } from "../constants";
import {
  BoldText,
  MediumText,
  RegularText,
  UnderlineText,
} from "../components/StyledText";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import TableOfContentsInline from "./TableOfContentsInline";
import { Skin, DefaultColors } from "../../config";
import i18n from "../i18n";

const screenWidth = Dimensions.get("window").width;
const firstValidPageIndex = 1;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    width: 100 + "%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Skin.Songbook_Background,
  },
});

let defaultChapterTitle = i18n.t("screens.songbook.defaultchaptertitle");

// Android uses ViewPagerAndroid
// iOS uses ScrollView with pagingEnabled and horizontal properties
class Songbook extends React.Component {
  state = {
    chapterTitle: defaultChapterTitle,
    tocButtonDisplay: true,
    songViews: [],
    songs: [],
    pageCount: 0,
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.songbook.title"),
    });

    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.songs &&
      this.props.globalData.state.songs
    ) {
      this.setData();
    }
  }

  setData = () => {
    let songViews = [];
    let songs = [];
    let pageCount = 0;
    this.props.globalData.state.songbook.chapters.forEach((chapterChild) => {
      chapterChild.songs.forEach((songChild, index) => {
        try {
          let item = this.props.globalData.state.songs.filter(
            (song) => song._id === songChild._id
          )[0];
          item.chapterTitle = chapterChild.chapterTitle;
          pageCount++;
          songs.push({ index: pageCount, song: item });
          songViews.push(
            <View
              key={index + "-" + item._id}
              chapterTitle={chapterChild.chapterTitle}
              style={{
                flex: 1,
                width: screenWidth,
                textAlign: i18n.getRTLTextAlign(),
                writingDirection: i18n.getWritingDirection(),
              }}
            >
              <SongView song={item} pageCount={pageCount} />
            </View>
          );
        } catch (err) {
          console.log(songChild._id + " not found in songs database");
        }
      });
    });

    this.setState({ songViews, songs, pageCount });
  };

  update() {
    console.log("update");
  }

  render() {
    let tocButton = null;

    if (this.state.tocButtonDisplay) {
      tocButton = (
        <RectButton
          style={styles.tocButtonStyle}
          onPress={this._handlePressTOCButton}
          underlayColor="#fff"
        >
          <MaterialCommunityIcons
            name="table-of-contents"
            size={23}
            style={{
              color: "#fff",
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 5,
              marginRight: 5,
              backgroundColor: "transparent",
            }}
          />
          <RegularText style={styles.tocButtonText}>
            {i18n.t("screens.songbook.tableofcontents")}
          </RegularText>
        </RectButton>
      );
    }

    return (
      <LoadingPlaceholder>
        <View style={styles.sectionHeader}>
          <RegularText style={styles.chapterText}>
            {this.state.chapterTitle}
          </RegularText>
        </View>
        <View style={styles.container}>
          <ScrollView
            key={"songbookScrollView"}
            ref={(view) => (this._scrollView = view)}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            horizontal={true}
            pagingEnabled={true}
            onMomentumScrollEnd={this._onSongbookMomentumScrollEnd}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: 1 }} />
              <Image
                style={{ width: screenWidth, height: screenWidth }}
                source={Skin.Songbook_Cover}
              />
              <View style={{ flex: 1 }} />
              <RegularText
                style={{
                  textAlign: "center",
                  writingDirection: i18n.getWritingDirection(),
                }}
              >
                {i18n.t("screens.songbook.swipetoview")}
              </RegularText>
              <View style={{ flex: 1 }} />
            </View>
            {this.state.songViews}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: screenWidth,
              }}
            >
              <TableOfContentsInline
                style={{ width: screenWidth }}
                scrollToSong={this.scrollToSong}
                setCurrentSong={this.props.globalData.setCurrentSong}
                songbook={this.props.globalData.state.songbook}
                songs={this.props.globalData.state.songs}
              />
            </View>
          </ScrollView>
          {tocButton}
        </View>
      </LoadingPlaceholder>
    );
  }

  _handlePressTOCButton = () => {
    this.scrollToToC();
  };

  _onSongbookMomentumScrollEnd = ({ nativeEvent }) => {
    const pageIndex = Math.round(nativeEvent.contentOffset.x / screenWidth);

    if (this.state.pageCount + 1 === pageIndex) {
      this.setState({
        tocButtonDisplay: false,
        chapterTitle: i18n.t("screens.songbook.tableofcontents"),
      });
    } else if (firstValidPageIndex <= pageIndex) {
      this.setState({
        tocButtonDisplay: true,
        chapterTitle: this.state.songs[pageIndex - firstValidPageIndex].song
          .chapterTitle,
      });
    } else {
      this.setState({
        tocButtonDisplay: true,
        chapterTitle: defaultChapterTitle,
      });
    }
  };

  scrollToToC = () => {
    this.setState({
      tocButtonDisplay: false,
      chapterTitle: i18n.t("screens.songbook.tableofcontents"),
    });
    this._scrollView.scrollTo({
      x: screenWidth * (this.state.pageCount + 1),
      y: 0,
      animated: false,
    });
  };

  scrollToSong = () => {
    const { currentSong } = this.props.globalData.state;
    this.setState({
      tocButtonDisplay: true,
      chapterTitle: currentSong.chapterTitle,
    });
    this._scrollView.scrollTo({
      x: (currentSong.page - 1 + firstValidPageIndex) * screenWidth,
      y: 0,
      animated: false,
    });
  };
}

export default withUnstated(Songbook, { globalData: GlobalDataContainer });
