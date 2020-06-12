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
    tocButtonDisplay: true,
    songList: this.props.globalData.state.songList,
    songViews: this.props.globalData.state.songViews,
    pageCount: 0
  };

  componentDidMount() {
    /*
    this.props.navigation.setOptions({
      headerTitle: i18n.t('screens.songbook.title'),
      headerLeft: () => <HeaderBackButton onPress={() => this.props.navigation.goBack()} tintColor={DefaultColors.HeaderText} />
    })
    */

    if (this.props.route.params && this.props.route.params.page)
      setTimeout(() => this.scrollToSong(), 0);

    Toast.show(i18n.t('screens.songbook.swipetoview'))
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params && this.props.route.params.page)
      if (this.props.route.params.page != prevProps.route.params.page)
        setTimeout(() => this.scrollToSong(), 0);
  }

  _onSongbookMomentumScrollEnd = ({ nativeEvent }) => {
    const pageIndex = Math.round(nativeEvent.contentOffset.x / screenWidth);
    this.setState({
      tocButtonDisplay: true,
      chapterTitle: this.state.songList[pageIndex - firstValidPageIndex].chapterTitle
    });
  };

  scrollToSong = () => {
    if (this.props.route.params && this.props.route.params.page) {

      const offset = (this.props.route.params.page - 1 + firstValidPageIndex) * screenWidth;
      this.setState({
        tocButtonDisplay: true,
        chapterTitle: this.state.songList[this.props.route.params.page - 1].chapterTitle
      });

      this._scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: false
      });
    }
  };

  _renderItem = ({ item, index }) => {
    // FlatList implementation
    return item

    // or use globalData.state.songList and return
    /*
    <View
              style={{ flex: 1, width: screenWidth, textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>
              <SongView song={song} pageCount={index + 1} />
            </View>
    */
  }

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
