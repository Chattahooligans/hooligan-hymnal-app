import React from 'react';
import {
    Clipboard,
    ScrollView,
    StyleSheet,
    View,
    Platform
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import { BigButton } from '../components/BigButton';
import { ModalLoader } from '../components/ModalLoader';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { Skin, DefaultColors, Settings } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
import * as mime from 'react-native-mime-types';
import i18n from "../../i18n";
import { createPost } from '../services/feedService';

class PostPreview extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: i18n.t('screens.postpreview.title'),
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        post: null,
        loading: false,
        dateTimePickerVisible: false,
        dateTimePickerInitialDate: new Date()
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.globalData.state.currentPostDraft &&
            this.props.globalData.state.currentPostDraft) {
            this.setData();
        }
    }

    setData = () => {
        this.setState({ post: this.props.globalData.state.currentPostDraft });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View pointerEvents="none">
                    <Post
                        post={this.state.post}
                        navigation={this.props.navigation} />
                </View>
                <BigButton
                    label={i18n.t('screens.postpreview.submit')}
                    iconName="md-send" iconPosition="right"
                    onPress={this._handlePressSubmitButton} />
                <BigButton
                    disabled={true}
                    buttonStyle={{ marginBottom: 10, backgroundColor: "gray" }}
                    label={i18n.t('screens.postpreview.schedule')}
                    iconName="md-time" iconPosition="right"
                    onPress={this._handlePressScheduleButton} />

                {/*
                <DateTimePickerModal
                    isVisible={this.state.dateTimePickerVisible}
                    mode="datetime"
                    date={this.state.dateTimePickerInitialDate}
                    onCancel={this.onScheduleCancel}
                    onConfirm={this.onScheduleConfirm} />
                */}

                <ModalLoader loading={this.state.loading} />
            </ScrollView>
        )
    }

    serializeImageBase64 = async (image) => {
        let serializedImage = "";

        serializedImage = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });

        return serializedImage;
    }

    resizeJpeg = async (image) => {
        console.log("ATTEMPT RESIZE " + JSON.stringify(image))

        if (image.height > image.width) {
            // portrait orientation, but maybe not 3:4 or 9:16 (we don't care)
            if (image.height > Settings.ImageResizeDimensions.larger || image.width > Settings.ImageResizeDimensions.smaller) {
                let manipResult = await ImageManipulator.manipulateAsync(
                    image.uri,
                    [{ resize: { height: Settings.ImageResizeDimensions.larger } }],
                    { compress: Settings.ImageResizeQuality, format: ImageManipulator.SaveFormat.JPEG })

                return manipResult.uri
            }

            return image.uri
        }
        else if (image.width > image.height) {
            // landscape orientation, but maybe not 3:4 or 16:9 (we don't care)
            if (image.width > Settings.ImageResizeDimensions.larger || image.height > Settings.ImageResizeDimensions.smaller) {
                let manipResult = await ImageManipulator.manipulateAsync(
                    image.uri,
                    [{ resize: { width: Settings.ImageResizeDimensions.larger } }],
                    { compress: Settings.ImageResizeQuality, format: ImageManipulator.SaveFormat.JPEG })

                return manipResult.uri
            }

            return image.uri
        }
        else {
            // must be a square
            if (image.width > Settings.ImageResizeDimensions.smaller) {
                let manipResult = await ImageManipulator.manipulateAsync(
                    image.uri,
                    [{ resize: { width: Settings.ImageResizeDimensions.smaller } }],
                    { compress: Settings.ImageResizeQuality, format: ImageManipulator.SaveFormat.JPEG })

                return manipResult.uri
            }

            return image.uri
        }
    }

    processImages = async (images) => {
        // do renaming, resizing, compressing, etc from this function, as necessary
        let processedImages = []

        for (let i = 0; i < images.length; i++) {
            if (!images[i].hasOwnProperty("remote")) {
                let imageToProcess = images[i]

                // ImagePicker already gives us a generated unique file name
                let splits = images[i].uri.split("/")
                imageToProcess.name = splits[splits.length - 1]
                // get MIME type
                imageToProcess.type = mime.lookup(imageToProcess.name)

                // resize
                if (imageToProcess.type == "image/jpeg")
                    imageToProcess.uri = await this.resizeJpeg(images[i])

                delete imageToProcess.width
                delete imageToProcess.height

                processedImages.push(imageToProcess)
            }
            else {
                processedImages.push(images[i])
            }
        }

        return processedImages
    }

    _handlePressSubmitButton = async () => {
        this.setState({
            loading: true
        });

        let post = {};
        Object.assign(post, this.state.post);
        const { token } = this.props.globalData.getCurrentUser();

        post.images = await this.processImages(post.images);

        const formData = new FormData();
        formData.append("sender", JSON.stringify(post.sender));
        formData.append("publishedAt", post.publishedAt);
        formData.append("push", post.push ? "true" : "false");
        formData.append("channel", post.channel);
        formData.append("locale", post.locale);
        formData.append("text", post.text);

        post.images.forEach((image, index) => {
            if (image.hasOwnProperty("remote")) {
                formData.append("remoteImages", JSON.stringify({
                    index: index,
                    uri: image.uri,
                    thumbnailUri: image.thumbnailUri
                }));
                formData.append("remoteMetadata", JSON.stringify({
                    index: index,
                    caption: image.metadata.caption,
                    credit: image.metadata.credit
                }));
            }
            else {
                formData.append("images", {
                    index: index,
                    uri: image.uri,
                    name: image.name,
                    type: image.type
                });
                formData.append("metadata", JSON.stringify({
                    index: index,
                    caption: image.metadata.caption,
                    credit: image.metadata.credit
                }));
            }
        })

        /*
        if (post.images || post.images.length) {
          const localImages = post.images.filter(i => !i.hasOwnProperty("remote"))
          const remoteImages = post.images.filter(i => i.hasOwnProperty("remote"))
          localImages.forEach(image => {
            formData.append("images", {
              uri: image.uri,
              name: image.name,
              type: image.type
            });
            formData.append("metadata", JSON.stringify({
              caption: image.metadata.caption,
              credit: image.metadata.credit
            }));
          });
          remoteImages.forEach(image => {
            formData.append("remoteImages", JSON.stringify({
              uri: image.uri,
              thumbnailUri: image.thumbnailUri
            }));
            formData.append("remoteMetadata", JSON.stringify({
              caption: image.metadata.caption,
              credit: image.metadata.credit
            }));
          });
        }
        */
        if (post.attachments || post.attachments.length) {
            formData.append("attachments", JSON.stringify(post.attachments))
        }

        try {
            console.log("SEND THIS TO SERVER")
            console.log(formData)
            const response = await createPost(formData, token)
            this.setState({
                loading: false
            });
            this.props.globalData.setResponse(response)
            this.props.navigation.popToTop()
            this.props.navigation.navigate('Home')
        } catch (ex) {
            console.log(ex)
        }
    }
    _handlePressScheduleButton = () => {
        //this.setState({ dateTimePickerVisible: true, dateTimePickerInitialDate: new Date() })
    }
    onScheduleConfirm = (date) => {
        let now = new Date()
        console.log("future? " + (date > now))
        this.setState({ dateTimePickerVisible: false })
    }
    onScheduleCancel = () => {
        this.setState({ dateTimePickerVisible: false })
    }
}

const styles = StyleSheet.create({

});

export default withUnstated(PostPreview, { globalData: GlobalDataContainer });
