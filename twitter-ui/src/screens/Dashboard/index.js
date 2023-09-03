import React from "react";
import TweetCard from "../../components/mui/TweetCard";
import TweetBox from "./TweetBox";
import { openErrorToast } from "../../common/toast";
import { useDispatch, useSelector } from "react-redux";
import { followRequested, getCurrentPage, getFollowers, getFollowing, getTweetsList, handleChangeCurrentPage, handleResetSlice, tweetsRequested } from "./dashboardSlice";
import { Pagination, Typography } from "@mui/material";
import { getUser } from "../Login/loginSlice";
import { postFollowApi } from "../../api";
import { handleChangeProfileUserId } from "../Profile/profileSlice";

const Dashboard = () => {

    const dispatch = useDispatch()
    const tweetsList = useSelector(getTweetsList)
    const user = useSelector(getUser)
    const currentPage = useSelector(getCurrentPage)
    const followers = useSelector(getFollowers)
    const following = useSelector(getFollowing)

    const [noOfPages, setNoOfPages] = React.useState(0)
    const [posts, setPosts] = React.useState([])



    function paginate(array, page_size, page_number) {
        setPosts(array.slice((page_number - 1) * page_size, page_number * page_size))
    }

    function calCulatePages(array, per_page) {
        console.log({ array })
        setNoOfPages(Math.ceil(array / per_page))
    }


    const loadTweets = async () => {
        try {
            dispatch(tweetsRequested({ id: user.id })).unwrap()
            dispatch(followRequested({ userId: user.id })).unwrap()
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }
    React.useEffect(() => {
        loadTweets()
        return () => { dispatch(handleResetSlice()) }
    }, [])

    React.useEffect(() => {
            calCulatePages(tweetsList.length, 11)
        paginate(tweetsList, 11, currentPage)
        setPosts(tweetsList)
    }, [tweetsList])

    React.useEffect(() => {
        paginate(tweetsList, 11, currentPage)
    }, [currentPage])
    return (
        <>
            <TweetBox name={user.name} username={user.username} />
            {console.log({ posts })}
            {posts.length > 0 ? posts.map(tweet => (
                <>
                    <TweetCard
                    navigateUserProfile={() => {
                        dispatch(handleChangeProfileUserId(tweet.userId))
                    }}
                    handleFollow={async () => {
                        try {
                            await postFollowApi({ followerId: user.id, followingId: tweet.userId })
                            dispatch(followRequested({ userId: user.id })).unwrap()
                            dispatch(tweetsRequested({ id: user.id })).unwrap()
                        } catch (err) {
                            openErrorToast(err.message ? err.message : err)
                        }
                    }} hideFollowButton={tweet.userId !== user.id} following={following.filter(f => f.id === tweet.userId).length > 0 ? true : false} peoples={tweet.people} tweetCounts={tweet.counts} userId={user.id} postId={tweet.id} name={tweet.name} username={tweet.username} description={tweet.description} />
                </>
            )) : <Typography sx={{
                fontWeight: 700,
                textAlign: "center",
                p: 2
            }}>No Tweets Found, Please follow someone to view tweets</Typography>}
            <Pagination sx={{ mt: 2, width: "100%" }} count={noOfPages} hideNextButton hidePrevButton onChange={(e, v) => {
                dispatch(handleChangeCurrentPage(v))
            }} />
        </>
    );
}

export default Dashboard;