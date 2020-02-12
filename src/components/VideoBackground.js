import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';
import { View as AnimatableView } from 'react-native-animatable';
import { Skin } from '../config/Settings';

export default class VideoBackground extends React.Component {
  state = {
    videoLoaded: false
  };

  async componentDidMount() {
    if (!this.state.videoLoaded) {
      try {
        await Asset.fromModule(
          Skin.Home_Video
        ).downloadAsync();
        this.setState({ videoLoaded: true });
      } catch (e) {
        // Not working, oh well, no video for you
      }
    }
  }

  render() {
    if (this.state.videoLoaded) {
      return (
        <AnimatableView
          animation="fadeIn"
          style={{ flex: 1 }}
          useNativeDriver
          duration={5000}
        >
          <Video
            source={Skin.Home_Video}
            style={{ flex: 1 }}
            resizeMode="cover"
            shouldPlay
            isMuted={true}
            isLooping
          />
        </AnimatableView>
      );
    } else {
      return <View style={{ flex: 1 }} />;
    }
  }
}
