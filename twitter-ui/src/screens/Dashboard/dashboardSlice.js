import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DASHBOARD_SLICE_NAME, FOLLOW_REQUESTED, POST_TWEET_REQUESTED, TWEETS_REQUESTED } from './constants';
import { getFollowApi, getTweetLikesApi, getTweetLikesCountApi, getTweetsApi, getUsersApi, postTweetApi } from '../../api';

export const tweetsRequested = createAsyncThunk(TWEETS_REQUESTED, async ({ id }) => {
    try {
        const response = await getTweetsApi({ id })
        const tweets_count = await getTweetLikesCountApi()
        const tweet_likes = await getTweetLikesApi()
        return {
            tweets: response,
            tweets_count,
            tweet_likes
        }
    } catch (err) {
        throw err
    }
})

export const followRequested = createAsyncThunk(FOLLOW_REQUESTED, async ({ userId }) => {
    try {
        const follow = await getFollowApi()
        const users = await getUsersApi()
        return {
            follow, users, userId
        }
    } catch (err) {
        throw err
    }
})




const dashboardSlice = createSlice({
    name: DASHBOARD_SLICE_NAME,
    initialState: {
        tweetsList: [],
        currentPage: 1,
        followers: [],
        following: [],
        users: []
    },
    reducers: {
        handleChangeCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        handleResetSlice: (state) => {
            state.tweetsList = []
            state.currentPage = 1
            state.followers = []
            state.following = []
            state.users = []
        }
    },
    extraReducers: builder => {
        builder.addCase(tweetsRequested.fulfilled, (state, action) => {
            const tweets = action.payload.tweets.data.posts
            const tweets_count = action.payload.tweets_count.data.likes
            const tweet_likes = action.payload.tweet_likes.data.likes
            if (tweets.length > 0) {
                state.tweetsList = tweets.map(t => {
                    if (tweets_count.find(tc => tc.postId === t.id)) {
                        return { ...t, counts: tweets_count.find(tc => tc.postId === t.id).count, people: tweet_likes.filter(e => e.postId === t.id).map(e => ({ name: e["users.name"], userId: e.userId })) }
                    } else {
                        return { ...t, counts: 0, people: [] }
                    }
                }).sort((a, b) => a.id > b.id ? -1 : 1)
            } else {
                state.tweetsList = []
            }
        })

        builder.addCase(followRequested.fulfilled, (state, action) => {
            const users = action.payload.users.data.user
            const follow = action.payload.follow.data.follows
            const userId = action.payload.userId

            if (follow.length > 0) {
                follow.map(f => {
                    if (f.followerId === userId) {
                        state.following = [...state.following, { id: users.find(u => u.id === f.followingId).id, name: users.find(u => u.id === f.followingId).name }]
                    }
                    if (f.followingId === userId) {
                        state.followers = [...state.followers, { id: users.find(u => u.id === f.followerId).id, name: users.find(u => u.id === f.followerId).name }]
                    }
                })
            } else {
                state.following = []
                state.followers = []
            }
            state.users = users
        })
    }
});

export const { handleChangeCurrentPage, handleResetSlice } = dashboardSlice.actions;

export const getTweetsList = (state) => state.dashboard.tweetsList
export const getCurrentPage = (state) => state.dashboard.currentPage
export const getFollowers = (state) => state.dashboard.followers
export const getFollowing = (state) => state.dashboard.following
export const getUsers = (state) => state.dashboard.users

export default dashboardSlice.reducer;