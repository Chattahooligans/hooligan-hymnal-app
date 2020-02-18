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
import { Skin, DefaultColors } from '../config/Settings';
import { Constants } from 'expo';
import { HeaderBackButton } from 'react-navigation';
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
                    style={{ marginBottom: 10, backgroundColor: "gray" }}
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

    serializeImage = async (image) => {
        let serializedImage = "";

        serializedImage = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });

        return serializedImage;
    }

    processImages = async (images) => {
        // do renaming, resizing, compressing, etc from this function, as necessary
        let processedImages = []

        for (let i = 0; i < images.length; i++) {
            let imageToProcess = images[i]
            // this is Collin code that used to live on PostCreate.js
            //imageToProcess.fileName = `IMG_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`

            // ImagePicker already gives us a generated unique file name
            let splits = images[i].uri.split("/")
            imageToProcess.name = splits[splits.length - 1]

            // metadata was converted to top-level props on PostCreate, remove it here
            delete imageToProcess.metadata

            processedImages.push(imageToProcess)
        }

        return processedImages
    }

    _handlePressSubmitButton = async () => {
      this.setState({
        loading: true
      });

      const { post } = this.state;
      const { token } = this.props.globalData.getCurrentUser();

      const formData = new FormData();
      formData.append("sender", JSON.stringify(post.sender));
      formData.append("publishedAt", post.publishedAt);
      formData.append("push", post.push ? "true" : "false");
      formData.append("channel", post.channel);
      formData.append("locale", post.locale);
      formData.append("text", post.text);

      if (post.images || post.images.length) {
        post.images.forEach(image => {
          const imgUri = image.uri.split('/');
          formData.append("images", {
            uri: image.uri,
            name: imgUri[imgUri.length - 1],
            type: `${image.type}/${imgUri[imgUri.length - 1].split('.')[1]}`,
          })
          formData.append("metadata", JSON.stringify({
            caption: image.metadata.caption,
            credit: image.metadata.credit
          }));
        })
      }
      if (post.attachments || post.attachments.length) {
        post.attachments.forEach(attachment => {
          formData.append("attachments", JSON.stringify(attachment))
        })
      }

      try {
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

      // debugger;


      // fetch(`https://f20e6790.ngrok.io/api/feed`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: formData
      // }).then(response => {
      //   console.log(response)
      //   this.setState({
      //     loading: false
      //   });
      //   this.props.navigation.popToTop()
      //   this.props.navigation.navigate('Home')
      // }).catch(error => {
      //   this.setState({
      //     loading: false
      //   })
      //   console.log(error)
      //   debugger;
      // })

        // this.setState({ loading: true })

        // const data = new FormData()
        // let post = {}
        // Object.assign(post, this.state.post)

        // // publishedAt was set when we started creating the post, and time has elapsed since then
        // // update publishedAt to the current time
        // const publishedAt = new Date().toISOString()
        // post.publishedAt = publishedAt
        // // TODO: check to see if publishedAt is in the future, because we are scheduling it for the future, and don't override

        // post.images = await this.processImages(post.images)

        // // unnecessary to send this to the server
        // delete post.channelData

        // // what if we just put the whole post in one object, rather than key by key?
        // // will simplify the server logic as well
        // // data.append("post", post)
        // /*
        // // maybe we need an extra block in formdata for uploads
        // post.images.forEach(image => {
        //     data.append("files", {
        //         uri: image.uri,
        //         name: image.name,
        //         type: image.type
        //     })
        // });
        // */


        // // Collin's original code
        // Object.keys(post).forEach(key => {
        //     if (key == 'sender') {
        //         const senderInfo = {
        //             user: post[key].user || 'test',
        //             pushToken: post[key].pushToken || 'teser'
        //         }
        //         data.append(key, JSON.stringify(senderInfo))
        //     } else {
        //         data.append(key, post[key])
        //     }
        // });
        // if (post.images.length > 0) {
        //     const { images } = post;
        //     images.forEach(image => {
        //         data.append("images", image)
        //     })
        // }
        // if (post.attachments.length > 0) {
        //     const { attachments } = post;
        //     attachments.forEach(attach => {
        //         data.append("attachments", JSON.stringify(attach))
        //     });
        // }


        // try {
        //     console.log("send this to the server")
        //     console.log(data)
        //     let response = await createPost(data, this.props.globalData.getCurrentUser().token)
        //     console.log("createPost() response")
        //     console.log(response);

        //     this.props.globalData.setResponse(response)

        //     this.setState({ loading: false });

        //     this.props.navigation.popToTop();
        //     this.props.navigation.navigate("Home");
        // }
        // catch (ex) {
        //     alert(ex.toString())

        //     this.setState({ loading: false });
        // }
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
