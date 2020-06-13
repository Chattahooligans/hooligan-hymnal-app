import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from "react-native-tiny-toast";
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { FontSizes } from '../constants';
import { RegularText } from '../components/StyledText';
import SongView from '../components/SongView';
import { DefaultColors, Skin } from '../../config';
import i18n from '../i18n';

let defaultChapterTitle = i18n.t('screens.songbook.defaultchaptertitle');
const screenWidth = Dimensions.get('window').width;
const firstValidPageIndex = 0;

class SongbookPages extends React.Component {
  state = {
    chapterTitle: defaultChapterTitle,
    songList: this.props.globalData.state.songList,
    songViews: [],
    showToast: true
  };

  componentDidMount() {
    /*
    this.props.navigation.setOptions({
      headerTitle: i18n.t('screens.songbook.title'),
      headerLeft: () => <HeaderBackButton onPress={() => this.props.navigation.goBack()} tintColor={DefaultColors.HeaderText} />
    })
    */

    this.buildSongViews();
  }

  buildSongViews() {
    if (this.state.songList) {
      let views = []

      this.state.songList.forEach((element, index) => {
        views.push(
          <View style={{ flex: 1, width: screenWidth }}
            key={"SongbookPages-View-" + (index + 1)}>
            <SongView song={element} pageCount={index + 1} />
          </View>
        )
      });

      this.setState({ songViews: views })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.songList != this.props.globalData.state.songList) {
      this.setState({ songList: this.props.globalData.state.songList }, () => this.buildSongViews())
    }

    if (this.props.route.params) {
      if (!prevProps.route.params)
        this.scrollToSong()
      else if (prevProps.route.params.page != this.props.route.params.page)
        this.scrollToSong()
    }
  }

  _onSongbookMomentumScrollEnd = ({ nativeEvent }) => {
    const pageIndex = Math.round(nativeEvent.contentOffset.x / screenWidth);
    this.setState({
      chapterTitle: this.state.songList[pageIndex - firstValidPageIndex].chapterTitle
    });
  };

  scrollToSong = () => {
    if (this.props.route.params && this.props.route.params.page) {
      if (this.state.showToast) {
        Toast.show(i18n.t('screens.songbook.swipetoview'))
        this.setState({ showToast: false })
      }

      const offset = (this.props.route.params.page - 1 + firstValidPageIndex) * screenWidth;
      this.setState({
        chapterTitle: this.state.songList[this.props.route.params.page - 1].chapterTitle
      });

      this._scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <RegularText style={styles.chapterText}>{this.state.chapterTitle}</RegularText>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            ref={component => (this._scrollView = component)}
            horizontal={true}
            pagingEnabled={true}
            keyExtractor={(item, index) => item._id + "-" + index}
            onMomentumScrollEnd={this._onSongbookMomentumScrollEnd}>
            {this.state.songViews}
          </ScrollView>
        </View>

        <RectButton
          style={styles.tocButtonStyle}
          onPress={() => this.props.navigation.goBack()}
          underlayColor="#fff">
          <MaterialCommunityIcons
            name="table-of-contents"
            size={23}
            style={{
              color: DefaultColors.ButtonText,
              marginVertical: 3,
              marginHorizontal: 5,
              backgroundColor: 'transparent'
            }} />
          <RegularText style={styles.tocButtonText}>
            {i18n.t('screens.songbook.tableofcontents')}
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
    backgroundColor: Skin.Songbook_Background
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: i18n.getRTLTextAlign()
  },
  chapterText: {
    textAlign: 'center',
  },
  tocButtonStyle: {
    backgroundColor: Skin.Songbook_ToCButtonBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 0,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: i18n.getFlexDirection()
  },
  tocButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  },
})
