import React from "react";
import {
  Button,
  Modal,
  Text,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ModalSelector from "react-native-modal-selector";
import DraggableFlatList from "react-native-draggable-flatlist";
import { BigButton } from "../components/BigButton";
import { BoldText, RegularText, MediumText } from "../components/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import withUnstated from "@airship/with-unstated";
import GlobalDataContainer from "../containers/GlobalDataContainer";
import { DefaultColors, Settings } from "../../config";
import { HeaderBackButton } from "@react-navigation/stack";
import i18n from "../i18n";
import * as mime from "react-native-mime-types";

import PostAttachmentTypesNavigation from "../navigation/PostAttachmentTypesNavigation";
import PostCreateAttachmentWrapper from "../components/PostCreateAttachmentWrapper";
import PostCreateImageWrapper from "../components/PostCreateImageWrapper";

class PostCreate extends React.Component {
  // TODO: get locales from server
  // We put some dummy data in here for the initial render
  state = {
    channels: [
      { _id: -1, name: "initial def", defaultLocale: "en", users: [] },
    ],
    locales: ["de", "en", "es", "pt"],
    selectedChannel: {
      _id: -1,
      name: "initial def",
      defaultLocale: "en",
      users: [],
    },
    post: {
      channel: -1,
      locale: "en",
      push: false,
      images: [],
      attachments: [],
    },
    attachmentModalVisible: false,
    linkImageModalVisible: false,
    linkImageUri: "",
    linkImageThumbnailUri: "",
  };

  setAttachmentModalVisible(visible) {
    this.setState({ attachmentModalVisible: visible });
  }
  addAttachment = (attachment) => {
    console.log("addAttachment: " + JSON.stringify(attachment));
    let post = this.state.post;
    post.attachments.push(attachment);
    this.setState({ post });
  };

  onAttachmentComplete = (attachment) => {
    this.addAttachment(attachment);
    this.setAttachmentModalVisible(false);
  };

  _handlePressAddAttachment = () => {
    this.setAttachmentModalVisible(true);
  };

  setLinkImageModalVisible(visible) {
    this.setState({ linkImageModalVisible: visible });
  }
  _handlePressLinkImage = () => {
    this.setLinkImageModalVisible(true);
  };

  _handlePressUploadImage = async () => {
    let cameraAllowed = (await Permissions.getAsync(Permissions.CAMERA)).status;
    if (cameraAllowed !== "granted")
      cameraAllowed = (await Permissions.askAsync(Permissions.CAMERA)).status;
    let cameraRollAllowed = (
      await Permissions.getAsync(Permissions.CAMERA_ROLL)
    ).status;
    if (cameraRollAllowed !== "granted")
      cameraRollAllowed = (await Permissions.askAsync(Permissions.CAMERA_ROLL))
        .status;

    if (!cameraAllowed || !cameraRollAllowed) {
      alert(i18n.t("screens.postcreate.nopermission"));
      return;
    } else {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!selectedImage.cancelled) {
        let post = this.state.post;
        // selectedImage is either the string "image" or "video", depending on what was selected, not file extension
        post.images.push({
          uri: selectedImage.uri,
          width: selectedImage.width,
          height: selectedImage.height,
          metadata: {
            caption: "",
            credit: "",
          },
        });

        this.setState({ post });
      }
    }
  };

  _handlePressContinueButton = () => {
    let nav = this.props.navigation;
    function navToPostPreview() {
      nav.navigate("PostPreview");
    }

    let post = this.state.post;
    post.publishedAt = new Date().toISOString();

    this.props.globalData.setCurrentPostDraft(post, navToPostPreview);
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: i18n.t("screens.postcreate.title"),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => this.props.navigation.goBack()}
          tintColor="#fff"
        />
      ),
      headerRight: () => (
        <MaterialCommunityIcons
          name="keyboard-close"
          size={23}
          style={{
            color: "#fff",
            backgroundColor: "transparent",
            marginRight: 16,
          }}
          onPress={() => Keyboard.dismiss()}
        />
      ),
    });

    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.currentPostDraft &&
        this.props.globalData.state.currentPostDraft) ||
      (!prevProps.globalData.state.channels &&
        this.props.globalData.state.channels)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let currentUserId = this.props.globalData.state.currentUser.user.id;
    let channels = this.props.globalData.state.channels;
    let selectedChannel;
    let post = this.props.globalData.state.currentPostDraft;

    let allowedChannels = [];

    channels.forEach((channel) => {
      channel.users.forEach((user) => {
        if (user._id === currentUserId && user.canCreate)
          allowedChannels.push(channel);
      });
    });

    if (allowedChannels.length > 0) {
      if (post.channel == null) {
        post.channel = allowedChannels[0]._id;
        selectedChannel = allowedChannels[0];

        // we need .users to exist, at least as an empty array
        if (!selectedChannel.hasOwnProperty("users"))
          selectedChannel.users = [];
      }
      if (post.locale == null) post.locale = allowedChannels[0].defaultLocale;
    }

    this.setState({ channels: allowedChannels, selectedChannel, post });

    if (0 === allowedChannels.length) {
      alert(
        "No allowed channels for user: " +
          currentUserId +
          " " +
          this.props.globalData.state.currentUser.user.email
      );
      this.props.navigation.goBack();
    }
  };

  deleteImage = (toDelete) => {
    let post = this.state.post;
    let imageToDelete = post.images.filter((img) => img.uri === toDelete)[0];
    if (imageToDelete) {
      post.images = post.images.filter((img) => img.uri !== imageToDelete.uri);

      this.setState({ post });
    }
  };
  saveMetadata = (uri, metadata) => {
    let post = this.state.post;
    let index = post.images.findIndex((img) => img.uri === uri);
    if (index != -1) {
      post.images[index].metadata = metadata;

      this.setState({ post });
    }
  };
  renderImageItem({ item, index, drag, isActive }, deleteImage, saveMetadata) {
    let image = item;
    return (
      <TouchableOpacity onLongPress={drag}>
        <PostCreateImageWrapper
          key={"image-" + index}
          uri={image.uri}
          metadata={image.metadata}
          onPressDelete={deleteImage}
          onSaveMetadata={saveMetadata}
        />
      </TouchableOpacity>
    );
  }

  deleteAttachment = (toDelete) => {
    let post = this.state.post;
    let indexToDelete = post.attachments.indexOf(toDelete);
    if (indexToDelete != -1) post.attachments.splice(indexToDelete, 1);

    this.setState({ post });
  };

  renderAttachmentItem({ item, index, drag, isActive }, deleteAttachment) {
    let attachment = item;
    return (
      <TouchableOpacity onLongPress={drag}>
        <PostCreateAttachmentWrapper
          attachment={attachment}
          key={"attachment-" + attachment.attachmentType + "-" + index}
          onPressDelete={deleteAttachment}
        />
      </TouchableOpacity>
    );
  }

  render() {
    let currentUserId = this.props.globalData.state.currentUser.user.id;
    let channelPicker = null;
    let localePicker = null;

    if (Platform.OS === "ios") {
      let channelPickerItems = [];
      this.state.channels.forEach((element) => {
        channelPickerItems.push({
          key: element._id,
          label: element.name,
          value: element,
        });
      });
      channelPickerItems = channelPickerItems.sort((a, b) => a.name > b.name);
      let localePickerItems = [];
      this.state.locales.forEach((element) => {
        localePickerItems.push({ key: element, label: element });
      });

      channelPicker = (
        <ModalSelector
          style={{ flex: 1 }}
          data={channelPickerItems}
          selectedKey={this.state.selectedChannel._id}
          onModalClose={(selectedChannelItem) => {
            if (this.state.selectedChannel != selectedChannelItem.value) {
              let post = this.state.post;
              post.channel = selectedChannelItem.value._id;
              post.locale = selectedChannelItem.value.defaultLocale;
              this.setState({
                selectedChannel: selectedChannelItem.value,
                post,
              });
            }
          }}
        >
          <View
            style={{
              flexDirection: i18n.getFlexDirection(),
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1 }}>{this.state.selectedChannel.name}</Text>
            <MaterialCommunityIcons name={"menu-down"} />
          </View>
        </ModalSelector>
      );

      localePicker = (
        <ModalSelector
          style={{ width: 60 }}
          data={localePickerItems}
          selectedKey={this.state.post.locale}
          disabled={localePickerItems.length < 1}
          onModalClose={(localeItem) => {
            if (this.state.post.locale != localeItem.key) {
              let post = this.state.post;
              post.locale = localeItem.key;
              this.setState({ post });
            }
          }}
        >
          <View
            style={{
              flexDirection: i18n.getFlexDirection(),
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1 }}>{this.state.post.locale}</Text>
            <MaterialCommunityIcons name={"menu-down"} />
          </View>
        </ModalSelector>
      );
    } else {
      let channelPickerItems = [];
      this.state.channels.forEach((element) => {
        channelPickerItems.push(
          <Picker.Item label={element.name} value={element} key={element._id} />
        );
      });
      channelPickerItems = channelPickerItems.sort((a, b) => a.name > b.name);
      let localePickerItems = [];
      this.state.locales.forEach((element) => {
        localePickerItems.push(
          <Picker.Item label={element} value={element} key={element} />
        );
      });

      channelPicker = (
        <Picker
          style={{ flex: 1 }}
          mode="dropdown"
          enabled={channelPickerItems.length > 1}
          selectedValue={this.state.selectedChannel}
          onValueChange={(selectedChannel) => {
            let post = this.state.post;
            post.channel = selectedChannel._id;
            post.locale = selectedChannel.defaultLocale;
            this.setState({ selectedChannel, post });
          }}
        >
          {channelPickerItems}
        </Picker>
      );

      localePicker = (
        <Picker
          style={{ width: 100 }}
          mode="dropdown"
          visible={localePickerItems.length > 1}
          selectedValue={this.state.post.locale}
          onValueChange={(itemValue) => {
            let post = this.state.post;
            post.locale = itemValue;
            this.setState({ post });
          }}
        >
          {localePickerItems}
        </Picker>
      );
    }

    let post = this.state.post;

    let imagesDisplay = [];
    post.images.forEach((image, index) => {
      imagesDisplay.push(
        <PostCreateImageWrapper
          key={"image-" + index}
          uri={image.uri}
          metadata={image.metadata}
          onPressDelete={this.deleteImage}
          onSaveMetadata={this.saveMetadata}
        />
      );
    });

    /*
    let attachmentsDisplay = [];
    post.attachments.forEach((attachment, index) =>
      attachmentsDisplay.push(
        <PostCreateAttachmentWrapper
          attachment={attachment}
          key={"attachment-" + attachment.attachmentType + "-" + index}
          onPressDelete={this.deleteAttachment}
        />
      )
    );
    */

    let canPush = false;
    if (this.state.selectedChannel)
      if (this.state.selectedChannel.users.length > 0)
        canPush = this.state.selectedChannel.users.find(
          (user) => user._id == currentUserId
        ).canPush;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.postAsContainer}>
            {channelPicker}
            {localePicker}
          </View>
          <TextInput
            style={styles.textInput}
            multiline={true}
            onChangeText={(text) => {
              let post = this.state.post;
              post.text = text;
              this.setState({ post });
            }}
          >
            {this.state.post.text}
          </TextInput>
          {/*
          <ScrollView
            style={{ flex: 1, backgroundColor: "pink" }}
            horizontal={true}
          >
            {imagesDisplay}
          </ScrollView>
          */}
          {/*attachmentsDisplay*/}
          <DraggableFlatList
            horizontal={true}
            style={{ flex: 1 }}
            data={this.state.post.images}
            renderItem={({ item, index, drag, isActive }) =>
              // gotta pass deleteImage and saveMetadata this way for some reason, it is so janky
              this.renderImageItem(
                { item, index, drag, isActive },
                this.deleteImage,
                this.saveMetadata
              )
            }
            keyExtractor={(item, index) => `draggable-image-${index}`}
            onDragEnd={({ data }) => {
              let post = this.state.post;
              post.images = data;
              this.setState({ post });
            }}
          />
          <DraggableFlatList
            style={{ flex: 1 }}
            data={this.state.post.attachments}
            renderItem={({ item, index, drag, isActive }) =>
              // gotta pass deleteAttachment this way for some reason, it is so janky
              this.renderAttachmentItem(
                { item, index, drag, isActive },
                this.deleteAttachment
              )
            }
            keyExtractor={(item, index) => `draggable-attachment-${index}`}
            onDragEnd={({ data }) => {
              let post = this.state.post;
              post.attachments = data;
              this.setState({ post });
            }}
          />
          <Button
            title={i18n.t("screens.postcreate.linkimage")}
            color={DefaultColors.ButtonBackground}
            onPress={this._handlePressLinkImage}
          />
          {Settings.PostCreate_UploadImageEnabled && (
            <Button
              title={i18n.t("screens.postcreate.uploadimage")}
              color={DefaultColors.ButtonBackground}
              onPress={this._handlePressUploadImage}
            />
          )}
          <Button
            title={i18n.t("screens.postcreate.addattachment")}
            color={DefaultColors.ButtonBackground}
            onPress={this._handlePressAddAttachment}
          />
          <View style={styles.toggleContainer}>
            <RegularText style={styles.toggleLabel}>
              {i18n.t("screens.postcreate.push")}
            </RegularText>
            <Switch
              enabled={canPush}
              value={this.state.post.push}
              onValueChange={(value) => {
                let post = this.state.post;
                post.push = value;
                this.setState({ post });
              }}
            />
          </View>
          <BigButton
            buttonStyle={{ marginBottom: 10 }}
            label={i18n.t("screens.postcreate.continue")}
            onPress={this._handlePressContinueButton}
          />
        </ScrollView>

        <Modal
          style={{ flex: 1 }}
          animationType="slide"
          transparent={false}
          visible={this.state.linkImageModalVisible}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 10 }}>
              <RegularText style={styles.linkImageTitle}>
                {i18n.t("screens.postcreate.linkimageinstructions")}
              </RegularText>
              <BoldText style={styles.linkImageTitle}>
                {i18n.t("screens.postcreate.pasteuri")}
              </BoldText>
              <TextInput
                style={styles.linkImageTextInput}
                placeholder={i18n.t("screens.postcreate.pasteuri")}
                value={this.state.linkImageUri}
                onChangeText={(text) => {
                  this.setState({ linkImageUri: text });
                }}
              />

              <BoldText style={styles.linkImageTitle}>
                {i18n.t("screens.postcreate.pastethumbnailuri")}
              </BoldText>
              <TextInput
                style={styles.linkImageTextInput}
                placeholder={i18n.t("screens.postcreate.pastethumbnailuri")}
                value={this.state.linkImageThumbnailUri}
                onChangeText={(text) => {
                  this.setState({ linkImageThumbnailUri: text });
                }}
              />

              <BigButton
                label={i18n.t("screens.postcreate.link")}
                iconName="link"
                iconPosition="right"
                inModal={true}
                onPress={() => {
                  let post = this.state.post;
                  post.images.push({
                    remote: true,
                    uri: this.state.linkImageUri,
                    thumbnailUri: this.state.linkImageThumbnailUri,
                    metadata: {
                      caption: "",
                      credit: "",
                    },
                  });
                  this.setState({
                    linkImageModalVisible: false,
                    post,
                    linkImageUri: "",
                    linkImageThumbnailUri: "",
                  });
                }}
              />
              <RegularText style={styles.linkImageTitle}>
                {i18n.t("screens.postcreate.linkimagewarning")}
              </RegularText>
            </View>
            <Button
              title={i18n.t("screens.postcreate.cancel")}
              color={DefaultColors.ButtonBackground}
              onPress={() => this.setLinkImageModalVisible(false)}
            />
          </View>
        </Modal>

        <Modal
          style={{ flex: 1 }}
          animationType="slide"
          transparent={false}
          visible={this.state.attachmentModalVisible}
        >
          <View style={{ flex: 1 }}>
            <PostAttachmentTypesNavigation
              onAttachmentComplete={this.onAttachmentComplete}
            />

            <Button
              title={i18n.t("screens.postcreate.cancel")}
              color={DefaultColors.ButtonBackground}
              onPress={() => this.setAttachmentModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postAsContainer: {
    flexDirection: i18n.getFlexDirection(),
  },
  textInput: {
    height: 200,
    paddingHorizontal: 4,
    borderWidth: 1,
    fontSize: 18,
    textAlign: i18n.getRTLTextAlign(),
    textAlignVertical: "top",
  },
  toggleContainer: {
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1,
    flexDirection: i18n.getFlexDirection(),
  },
  toggleLabel: {
    flex: 1,
    textAlign: i18n.getRTLTextAlign(),
  },
  linkImageTitle: {
    fontSize: 18,
  },
  linkImageTextInput: {
    height: 50,
  },
});

export default withUnstated(PostCreate, { globalData: GlobalDataContainer });
