import React from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
// TODO: import PostImageWrapper after create-post-images is merged
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { DefaultColors, Palette, Skin, Settings } from '../config/Settings';
import { getFeedForChannel, getMoreFeedForChannel } from '../services/feedService';

class Channel extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Channel: " + navigation.state.params.channelData.name,
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        channelData: { _id: "", name: "init name", description: "", avatarUrl: "", headerUrl: "" },
        feed: [],
        loadDataComplete: false,
        refreshing: false,
        feedAtEnd: false,
        loadingMore: false
    }

    componentDidMount = async () => {

        if (!this.state.loadDataComplete) {
            await this.onRefresh()

            this.setState({ loadDataComplete: true })
        }
    }

    onRefresh = async () => {
        this.setState({ refreshing: true })

        let feed = await getFeedForChannel(this.props.navigation.state.params.channelData._id)
        const feedAtEnd = feed.length < Settings.Home_PostsPerPage

        this.setState({ feed, refreshing: false, feedAtEnd })
    }

    onLoadMore = async () => {
        // don't load more if we're already loading
        if (this.state.loadingMore === false && !this.state.feedAtEnd) {
            this.setState({ loadingMore: true })

            let moreFeed = await getMoreFeedForChannel(this.props.navigation.state.params.channelData._id, this.state.feed[this.state.feed.length - 1].publishedAt)
            const feedAtEnd = moreFeed.length < Settings.Home_PostsPerPage
            const prevFeed = this.state.feed
            const feed = prevFeed.concat(moreFeed)

            this.setState({ feed, loadingMore: false, feedAtEnd })
        }
    }

    render() {
        let channelData = this.props.navigation.state.params.channelData
        let channelPostsDisplay = []

        this.state.feed.forEach((post) => {
            channelPostsDisplay.push(
                <Post key={post._id} post={post} navToChannel={false} navigation={this.props.navigation} />
            )
        })


        return (
            <ScrollView
                style={styles.container}
                onScroll={(event) => {
                    if ((event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >
                        (event.nativeEvent.contentSize.height - 20)) && ((event.nativeEvent.contentOffset.y + event.nativeEvent.contentSize.height) > event.nativeEvent.contentSize.height)) {
                        this.onLoadMore();
                    }
                }}
                refreshControl={
                    Platform.OS === "ios" ?
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this.onRefresh} />
                        :
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            progressBackgroundColor={Skin.Home_RefreshBackground_Android}
                            colors={[Skin.Home_Refresh_Android]} />
                }
            >
                {(this.state.refreshing && Platform.OS == "ios") &&
                    <View style={{ paddingTop: Constants.statusBarHeight }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color={Skin.Home_LoadMoreActivityIndicator_iOS} />
                    </View>
                }
                <Image
                    style={styles.header}
                    source={{ uri: channelData.headerUrl }} />
                <View style={styles.channelInfoContainer}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: channelData.avatarUrl }} />
                        <BoldText style={styles.channelName}>{channelData.name}</BoldText>
                    </View>
                    <RegularText style={styles.description}>{channelData.description}</RegularText>
                </View>
                {channelPostsDisplay}
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", paddingVertical: 10 }}>
                    {this.state.loadingMore &&
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color={Platform.OS === "ios" ? Skin.Home_LoadMoreActivityIndicator_iOS : Skin.Home_LoadMoreActivityIndicator_Android} />
                    }
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultColors.Primary
    },
    channelInfoContainer: {
        backgroundColor: Palette.White
    },
    header: {

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 8
    },
    channelName: {
        color: Skin.Post_ChannelTextColor
    },
    channelDescription: {
        color: Skin.Post_ChannelTextColor
    }
});

export default withUnstated(Channel, { globalData: GlobalDataContainer });