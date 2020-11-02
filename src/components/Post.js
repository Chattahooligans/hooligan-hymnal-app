import React from "react";
import {
  Alert,
  Clipboard,
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import FadeIn from "react-native-fade-in-image";
import ReadMore from "react-native-read-more-text";
import {
  BoldText,
  RegularText,
  MediumText,
  LightText,
} from "../components/StyledText";
import ParsedText from "react-native-parsed-text";
import {
  parsePatterns,
  parsedStyles,
  renderBoldItalic,
  onUrlPress,
  onEmailPress,
} from "./ParsedTextHelper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Toast from 'react-native-simple-toast';
import Toast from "react-native-tiny-toast";
import { Skin, Settings, DefaultColors } from "../../config";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import withUnstated from "@airship/with-unstated";
import PostAttachmentGkNickname from "./PostAttachmentGkNickname";
import PostAttachmentJuanstagram from "./PostAttachmentJuanstagram";
import PostAttachmentMassInstagram from "./PostAttachmentMassInstagram";
import PostAttachmentMassTweet from "./PostAttachmentMassTweet";
import PostAttachmentPlayer from "./PostAttachmentPlayer";
import PostAttachmentPrideraiserMatch from "./PostAttachmentPrideraiserMatch";
import PostAttachmentSong from "./PostAttachmentSong";
import PostImageWrapper from "./PostImageWrapper";
import ImageViewer from "react-native-image-zoom-viewer";
import ImageViewerFooter from "./ImageViewerFooter";
import NotificationEngagementsModal from "./NotificationEngagementsModal";
import moment from "moment";
import i18n from "../i18n";
import PostAttachmentMultiTweet from "./PostAttachmentMultiTweet";

class Post extends React.Component {
  state = {
    post: {
      publishedAt: JSON.stringify(new Date()),
      channelData: { _id: -1, name: "", avatarUrl: "" },
      text: "",
      images: [],
      attachments: [],
    },
    measuredText: false,
    textGreaterThanRatio: false,
    textExpanded: false,
    textNumberOfLines: Number.MAX_SAFE_INTEGER,
    imageViewerVisible: false,
    imageViewerIndex: 0,
    imageViewerFooterVisible: true,
    statsModalVisible: false,
  };

  componentDidMount = () => this.setData();
  componentDidUpdate(prevProps) {
    if (!prevProps.post && this.props.post) this.setData();
  }

  setData() {
    if (this.props.post) {
      let post = this.props.post;
      post.channelData = this.props.globalData.getChannelBasicInfo(
        this.props.post.channel
      );
      this.setState({ post });
    }
  }

  hidePost = async () => {
    if (this.props.post) this.props.globalData.hidePost(this.props.post._id);
  };

  // new admin menu
  menu = null;
  setMenuRef = (ref) => {
    this.menu = ref;
  };
  hideMenu = () => {
    this.menu.hide();
  };
  showMenu = () => {
    this.menu.show();
  };
  showStatsModal = () => {
    this.hideMenu();

    this.setState({ statsModalVisible: true });
  };
  showHidePostAlert = () => {
    this.hideMenu();

    Alert.alert(
      i18n.t("components.post.hidealerttitle"),
      i18n.t("components.post.hidealertmessage"),
      [
        {
          text: i18n.t("components.post.hidealertcancel"),
          style: "cancel",
        },
        {
          text: i18n.t("components.post.hidealertconfirm"),
          onPress: () => {
            this.hidePost();
          },
        },
      ]
    );
  };

  getScaledUri = (uri) => {
    let host = "cloudinary.com";
    //let containerWidth = Dimensions.get("window").width - (2 * styles.container.marginHorizontal)
    //let transform = "c_scale,w_" + Math.round(containerWidth) + "/"
    let transformPrefix = "c_scale,";
    let transform = transformPrefix + "w_500/";
    let spliceAfter = "/upload/";

    // check both, in case of weirdness
    if (uri.includes(host) && uri.includes(spliceAfter)) {
      console.l;
      let scaledUri = uri;
      let position = scaledUri.indexOf(spliceAfter) + spliceAfter.length;

      // weird thing where these chained together, not sure why, but this will avoid it
      if (!scaledUri.includes(transformPrefix)) {
        scaledUri = [
          scaledUri.slice(0, position),
          transform,
          scaledUri.slice(position),
        ].join("");
      }

      return scaledUri;
    } else return uri;
  };

  render() {
    let post = this.state.post;
    let nav = this.props.navigation;
    //console.log("Rendering Post:\n" + JSON.stringify(post));

    let channelImage = Skin.Post_DefaultChannelThumbnail;
    if (post.channelData.avatarUrl)
      channelImage = { uri: post.channelData.avatarUrl };

    // display relative time only if a post is from today, else just a regular timestamp
    let publishedAtDisplay = "";
    if (moment(post.publishedAt).isSame(moment(), "day"))
      publishedAtDisplay = moment(post.publishedAt).fromNow();
    else publishedAtDisplay = moment(post.publishedAt).format("M/D/YY h:mma");

    let navToChannel = Settings.ChannelUI_Enabled;
    if (this.props.hasOwnProperty("navToChannel"))
      if (false == this.props.navToChannel) navToChannel = false;

    let fullscreen = false;
    if (this.props.hasOwnProperty("fullscreen"))
      fullscreen = this.props.fullscreen;

    let textDisplay;
    if (post.text) {
      if (Skin.Post_CollapseTextRatio) {
        textDisplay = (
          <View style={styles.textContainer}>
            <ParsedText
              numberOfLines={
                fullscreen || this.props.expand
                  ? Number.MAX_SAFE_INTEGER
                  : this.state.textNumberOfLines
              }
              onLayout={(e) => {
                if (!this.state.measuredText) {
                  let ratio =
                    e.nativeEvent.layout.height /
                    Dimensions.get("window").height;

                  if (ratio > Skin.Post_CollapseTextRatio)
                    this.setState({
                      measuredText: true,
                      textGreaterThanRatio: true,
                      textExpanded: false,
                      textNumberOfLines: Skin.Post_CollapseTextNumberOfLines,
                    });
                  else
                    this.setState({
                      measuredText: true,
                      textGreaterThanRatio: false,
                      textExpanded: true,
                      textNumberOfLines: Number.MAX_SAFE_INTEGER,
                    });
                }
              }}
              onPress={() => {
                this.setState({
                  textExpanded: true,
                  textNumberOfLines: Number.MAX_SAFE_INTEGER,
                });
              }}
              parse={[
                { type: "url", style: parsedStyles.url, onPress: onUrlPress },
                {
                  type: "email",
                  style: parsedStyles.url,
                  onPress: onEmailPress,
                },
                {
                  pattern: parsePatterns.bold,
                  style: parsedStyles.bold,
                  renderText: renderBoldItalic,
                },
                {
                  pattern: parsePatterns.italic,
                  style: parsedStyles.italic,
                  renderText: renderBoldItalic,
                },
              ]}
              style={styles.text}
              onLongPress={this._onLongPressText}
            >
              {post.text}
            </ParsedText>
            {this.state.textGreaterThanRatio &&
              !this.state.textExpanded &&
              !fullscreen &&
              !this.props.expand && (
                <LightText
                  style={{
                    color: DefaultColors.ColorText,
                    marginTop: 5,
                    fontSize: Skin.Post_FontSize - 4,
                  }}
                  onPress={() => {
                    this.setState({
                      textExpanded: true,
                      textNumberOfLines: Number.MAX_SAFE_INTEGER,
                    });
                  }}
                >
                  {i18n.t("components.post.readmore")}
                </LightText>
              )}
            {Skin.Post_CollapseTextShowHide &&
              this.state.textGreaterThanRatio &&
              this.state.textExpanded &&
              !fullscreen &&
              !this.props.expand && (
                <LightText
                  style={{
                    color: DefaultColors.ColorText,
                    marginTop: 5,
                    fontSize: Skin.Post_FontSize - 4,
                  }}
                  onPress={() => {
                    this.setState({
                      textExpanded: false,
                      textNumberOfLines: Skin.Post_CollapseTextNumberOfLines,
                    });
                  }}
                >
                  {i18n.t("components.post.hide")}
                </LightText>
              )}
          </View>
        );
      } else {
        textDisplay = (
          <View style={styles.textContainer}>
            <ReadMore
              numberOfLines={
                fullscreen || this.props.expand
                  ? Number.MAX_SAFE_INTEGER
                  : Skin.Post_CollapseTextNumberOfLines
              }
              renderTruncatedFooter={(handlePress) => (
                <LightText
                  style={{
                    color: DefaultColors.ColorText,
                    marginTop: 5,
                    fontSize: Skin.Post_FontSize - 4,
                  }}
                  onPress={handlePress}
                >
                  {i18n.t("components.post.readmore")}
                </LightText>
              )}
              renderRevealedFooter={(handlePress) => {
                if (Skin.Post_CollapseTextShowHide) {
                  return (
                    <LightText
                      style={{
                        color: DefaultColors.ColorText,
                        marginTop: 5,
                        fontSize: Skin.Post_FontSize - 4,
                      }}
                      onPress={handlePress}
                    >
                      {i18n.t("components.post.hide")}
                    </LightText>
                  );
                } else {
                  return null;
                }
              }}
            >
              <ParsedText
                parse={[
                  { type: "url", style: parsedStyles.url, onPress: onUrlPress },
                  {
                    type: "email",
                    style: parsedStyles.url,
                    onPress: onEmailPress,
                  },
                  {
                    pattern: parsePatterns.bold,
                    style: parsedStyles.bold,
                    renderText: renderBoldItalic,
                  },
                  {
                    pattern: parsePatterns.italic,
                    style: parsedStyles.italic,
                    renderText: renderBoldItalic,
                  },
                ]}
                style={styles.text}
                onLongPress={this._onLongPressText}
              >
                {post.text}
              </ParsedText>
            </ReadMore>
          </View>
        );
      }
    }

    let containerWidth =
      Dimensions.get("window").width - 2 * styles.container.marginHorizontal;
    let imageDisplay = [];
    let imageViewerData = [];
    post.images.forEach((image, index) => {
      imageViewerData.push({ url: image.uri });
    });
    if (post.images.length == 1) {
      // flow the entire image in the feed if there's only one
      post.images.forEach((image, index) => {
        // large images slow performance
        let thumbnail = { ...image };
        if (
          thumbnail.hasOwnProperty("thumbnailUri") &&
          thumbnail.thumbnailUri != ""
        ) {
          // remotely linked images may explicitly contain a thumbnail
          thumbnail.uri = thumbnail.thumbnailUri;
        } else {
          // use cloudinary transforms to only load/render a thumbnail
          thumbnail.uri = this.getScaledUri(image.uri);
        }

        imageDisplay.push(
          <TouchableOpacity
            key={post._id + "-touchable-image-" + index}
            activeOpacity={1}
            onPress={() => {
              this.setState({
                imageViewerVisible: true,
                imageViewerFooterVisible: true,
                imageViewerIndex: index,
              });
            }}
          >
            <PostImageWrapper
              containerWidth={containerWidth}
              key={post._id + "-image-" + index}
              source={thumbnail}
            />
          </TouchableOpacity>
        );
      });
    } else if (post.images.length == 2) {
      // just thumbnails if more than one
      post.images.forEach((image, index) => {
        // large images slow performance
        let thumbnail = { ...image };
        if (
          thumbnail.hasOwnProperty("thumbnailUri") &&
          thumbnail.thumbnailUri != ""
        ) {
          // remotely linked images may explicitly contain a thumbnail
          thumbnail.uri = thumbnail.thumbnailUri;
        } else {
          // use cloudinary transforms to only load/render a thumbnail
          thumbnail.uri = this.getScaledUri(image.uri);
        }

        imageDisplay.push(
          <TouchableOpacity
            key={post._id + "-touchable-image-" + index}
            activeOpacity={1}
            onPress={() => {
              this.setState({
                imageViewerVisible: true,
                imageViewerFooterVisible: true,
                imageViewerIndex: index,
              });
            }}
          >
            <Image
              key={post._id + "-image-" + index}
              style={{
                width: containerWidth / 2,
                height: containerWidth / 2,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "white",
                overflow: "hidden",
              }}
              source={thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      });
    } else {
      post.images.forEach((image, index) => {
        // large images slow performance
        let thumbnail = { ...image };
        if (
          thumbnail.hasOwnProperty("thumbnailUri") &&
          thumbnail.thumbnailUri != ""
        ) {
          // remotely linked images may explicitly contain a thumbnail
          thumbnail.uri = thumbnail.thumbnailUri;
        } else {
          // use cloudinary transforms to only load/render a thumbnail
          thumbnail.uri = this.getScaledUri(image.uri);
        }

        imageDisplay.push(
          <TouchableOpacity
            key={post._id + "-touchable-image-" + index}
            activeOpacity={1}
            onPress={() => {
              this.setState({
                imageViewerVisible: true,
                imageViewerFooterVisible: true,
                imageViewerIndex: index,
              });
            }}
          >
            <Image
              key={post._id + "-image-" + index}
              style={{
                width: containerWidth / 2.5,
                height: containerWidth / 2.5,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "white",
                overflow: "hidden",
              }}
              source={thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      });
    }

    let attachmentDisplay = [];
    let tweetablePlayers = [];
    post.attachments.forEach((attachment, index) => {
      switch (attachment.attachmentType.toLowerCase()) {
        case "player":
          let player = this.props.globalData.state.players.find(
            (player) => player._id === attachment.relatedId
          );
          let playerDisplay = (
            <PostAttachmentPlayer
              key={index}
              player={player}
              onPress={() => {
                this.props.navigation.navigate("Player", { player });
              }}
            />
          );
          attachmentDisplay.push(playerDisplay);
          if (player.hasOwnProperty("twitter") && player.twitter != "") {
            tweetablePlayers.push(player);
          }
          break;
        case "song":
          let song;
          if (attachment.relatedId) {
            song = this.props.globalData.state.songs.find(
              (song) => song._id === attachment.relatedId
            );
          } else if (attachment.data) {
            song = attachment.data;
          }
          let songDisplay = (
            <PostAttachmentSong
              key={index}
              song={song}
              onPress={() => {
                this.props.navigation.navigate("SingleSong", { song });
              }}
            />
          );
          attachmentDisplay.push(songDisplay);
          break;
        case "gknickname":
          let gkNickname = attachment.data;
          let gkNicknameDisplay = (
            <PostAttachmentGkNickname key={index} gkNickname={gkNickname} />
          );
          attachmentDisplay.push(gkNicknameDisplay);
          break;
        case "massinstagram":
          let massInstagramRoster = this.props.globalData.state.rosters.find(
            (roster) => roster._id === attachment.data.rosterId
          );
          let massInstagramDisplay = (
            <PostAttachmentMassInstagram
              key={index}
              roster={massInstagramRoster}
              onPress={() => {
                this.props.navigation.navigate("InstagramList", {
                  roster: massInstagramRoster,
                });
              }}
            />
          );
          attachmentDisplay.push(massInstagramDisplay);
          break;
        case "masstweet":
          let massTweetRoster = this.props.globalData.state.rosters.find(
            (roster) => roster._id === attachment.data.rosterId
          );
          let massTweetDisplay = (
            <PostAttachmentMassTweet
              key={index}
              roster={massTweetRoster}
              onPress={() => {
                this.props.navigation.navigate("TwitterList", {
                  massTweetRoster,
                });
              }}
            />
          );
          attachmentDisplay.push(massTweetDisplay);
          break;
        case "prideraisermatch":
          let data = attachment.data;
          let prideraiserMatchDisplay = (
            <PostAttachmentPrideraiserMatch data={data} />
          );
          attachmentDisplay.push(prideraiserMatchDisplay);
          break;
        case "juanstagram":
          let juanstagramPost = attachment.data.juanstagramPost;
          let juanstagramDisplay = (
            <PostAttachmentJuanstagram
              key={index}
              juanstagramPost={juanstagramPost}
            />
          );
          attachmentDisplay.push(juanstagramDisplay);
          break;
        default:
          attachmentDisplay.push(
            <RegularText key={index}>
              Can't render attachment {JSON.stringify(attachment)}
            </RegularText>
          );
      }
    });

    if (tweetablePlayers.length > 1) {
      attachmentDisplay.push(
        <PostAttachmentMultiTweet
          key={post.attachments.length}
          players={tweetablePlayers}
        />
      );
    }

    let menuDisplayAndroid;
    let menuOptionsAndroid = [];

    let menuDisplayIOS;
    let iosMenuOptions = [];
    iosMenuOptions.push({
      text: i18n.t("components.post.hidealertcancel"),
      style: "cancel",
    });

    if (this.props.globalData.getCurrentUser()) {
      const channelId = post.channelData._id;
      const currentUserId = this.props.globalData.getCurrentUser().user.id;
      const currentUserFeedAllowed = this.props.globalData.getCurrentUser().user
        .feedAllowed;
      const channelPermissions = this.props.globalData.getChannelPermissions(
        channelId,
        currentUserId
      );

      if (currentUserFeedAllowed) {
        if (post.push) {
          menuOptionsAndroid.push(
            <MenuItem
              onPress={this.showStatsModal}
              key={post._id + "-menu-stats"}
            >
              Stats
            </MenuItem>
          );

          iosMenuOptions.push({
            text: "Stats",
            onPress: () => {
              this.setState({ statsModalVisible: true });
            },
          });
        }
        if (channelPermissions.canEdit) {
          menuOptionsAndroid.push(
            <MenuItem key={post._id + "-menu-edit"} disabled>
              Edit Post
            </MenuItem>
          );
        }
        if (channelPermissions.canDelete) {
          menuOptionsAndroid.push(
            <MenuDivider key={post._id + "-menu-divider"} />
          );
          menuOptionsAndroid.push(
            <MenuItem
              onPress={this.showHidePostAlert}
              key={post._id + "-menu-hide"}
            >
              Hide Post
            </MenuItem>
          );

          iosMenuOptions.push({
            text: i18n.t("components.post.hidealertconfirm"),
            onPress: () => {
              this.hidePost();
            },
            style: "destructive",
          });
        }

        if (menuOptionsAndroid.length > 0) {
          menuDisplayAndroid = (
            <Menu
              ref={this.setMenuRef}
              button={
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="menu-down"
                    size={30}
                    style={styles.menu}
                    onPress={this.showMenu}
                  />
                </TouchableOpacity>
              }
            >
              {menuOptionsAndroid}
            </Menu>
          );
        }

        if (iosMenuOptions.length > 1) {
          let message = "";
          if (channelPermissions.canDelete)
            message = i18n.t("components.post.postadminalerthidemessageios");

          menuDisplayIOS = (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  i18n.t("components.post.postadminalertitleios"),
                  message,
                  iosMenuOptions
                );
              }}
            >
              <MaterialCommunityIcons
                name="menu-down"
                size={30}
                style={styles.menu}
              />
            </TouchableOpacity>
          );
        }
      }
    }

    return (
      <View style={styles.container}>
        {/* Facebook style */}
        <View style={styles.headerContainer}>
          {navToChannel && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Channel", {
                  channelData: post.channelData,
                });
              }}
            >
              <FadeIn>
                <Image source={channelImage} style={styles.channelImage} />
              </FadeIn>
            </TouchableOpacity>
          )}
          {!navToChannel && (
            <FadeIn>
              <Image source={channelImage} style={styles.channelImage} />
            </FadeIn>
          )}
          <View style={styles.headerTextContainer}>
            {navToChannel && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Channel", {
                    channelData: post.channelData,
                  });
                }}
              >
                <BoldText style={styles.channelText}>
                  {post.channelData.name}
                </BoldText>
              </TouchableOpacity>
            )}
            {!navToChannel && (
              <BoldText style={styles.channelText}>
                {post.channelData.name}
              </BoldText>
            )}
            {!fullscreen && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SinglePost", { post });
                }}
              >
                <RegularText style={styles.timestampText}>
                  {publishedAtDisplay}
                </RegularText>
              </TouchableOpacity>
            )}
            {fullscreen && (
              <RegularText style={styles.timestampText}>
                {publishedAtDisplay}
              </RegularText>
            )}
          </View>
          {post.push && (
            <MaterialCommunityIcons
              name="bell"
              size={18}
              style={styles.notificationSymbol}
            />
          )}
          {Platform.OS === "android" && menuDisplayAndroid}
          {Platform.OS === "ios" && menuDisplayIOS}
        </View>
        {textDisplay}

        {imageDisplay.length === 1 && (
          <View style={styles.imagesContainer}>{imageDisplay}</View>
        )}
        {imageDisplay.length === 2 && (
          <View
            style={[
              { flexDirection: i18n.getFlexDirection() },
              styles.imagesContainer,
            ]}
          >
            {imageDisplay}
          </View>
        )}
        {imageDisplay.length > 2 && (
          <ScrollView
            style={[
              { flexDirection: i18n.getFlexDirection() },
              styles.imagesContainer,
            ]}
            horizontal={true}
          >
            {imageDisplay}
          </ScrollView>
        )}

        {attachmentDisplay.length > 0 && (
          <View style={styles.attachmentsContainer}>{attachmentDisplay}</View>
        )}

        {imageViewerData.length > 0 && (
          <Modal
            visible={this.state.imageViewerVisible}
            transparent={true}
            onRequestClose={() => this.setState({ imageViewerVisible: false })}
          >
            <ImageViewer
              doubleClickInterval={500}
              renderIndicator={() => {}}
              enablePreload={true}
              imageUrls={imageViewerData}
              index={this.state.imageViewerIndex}
              enableSwipeDown={true}
              onSwipeDown={() => {
                this.setState({ imageViewerVisible: false });
              }}
              menuContext={{
                saveToLocal: i18n.t("components.imageviewer.savetolocal"),
                cancel: i18n.t("components.imageviewer.cancel"),
              }}
              onClick={() => {
                let imageViewerFooterVisible = this.state
                  .imageViewerFooterVisible;
                imageViewerFooterVisible = !imageViewerFooterVisible;
                this.setState({ imageViewerFooterVisible });
              }}
              renderFooter={(index) => (
                <ImageViewerFooter
                  images={post.images}
                  index={index}
                  visible={this.state.imageViewerFooterVisible}
                />
              )}
            />
          </Modal>
        )}
        <NotificationEngagementsModal
          visible={this.state.statsModalVisible}
          post={post}
          onRequestClose={() => this.setState({ statsModalVisible: false })}
        />
      </View>
    );
  }

  _onLongPressText = () => {
    Toast.show(i18n.t("components.post.copied"));
    Clipboard.setString(this.props.post.text);
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultColors.Background,
    marginBottom: Skin.Home_PostMarginVertical,
    marginHorizontal: Skin.Post_ContainerMarginHorizontal,
  },
  headerContainer: {
    flexDirection: i18n.getFlexDirection(),
    paddingTop: Skin.Post_HeaderContainerPaddingTop,
    paddingHorizontal: Skin.Post_HeaderContainerPaddingHorizontal,
  },
  channelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  channelText: {
    fontSize: 16,
    color: Skin.Post_ChannelLabel,
  },
  timestampText: {
    color: Skin.Post_TimestampLabel,
  },
  notificationSymbol: {
    color: Skin.Post_NotificationColor,
  },
  menu: {
    color: Skin.Post_ChannelLabel,
    marginLeft: 0,
    marginRight: 3 - Skin.Post_HeaderContainerPaddingHorizontal,
    marginTop: -6,
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
    paddingTop: Skin.Post_TextPaddingTop,
    paddingBottom: Skin.Post_TextPaddingBottom,
    paddingHorizontal: Skin.Post_TextPaddingHorizontal,
  },
  text: {
    fontFamily: Skin.Font_ParsedText,
    fontSize: Skin.Post_FontSize,
    lineHeight: Skin.Post_LineHeight,
    color: Skin.Post_TextColor,
    textAlign: i18n.getRTLTextAlign(),
    writingDirection: i18n.getWritingDirection(),
  },
  imagesContainer: {
    backgroundColor: "#fff",
  },
  attachmentsContainer: {},
});

export default withUnstated(Post, { globalData: GlobalDataContainer });
