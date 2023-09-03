import { Avatar, Box, Typography } from "@mui/material"
import React, { Fragment } from "react"
import Logo from '..//Login/images/icons8-twitter.svg'
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPage, getFollowing, getProfileUserId, getTweetsList, getUserInfo, handleChangeProfileUserId, handleResetSlice, userFeedsRequested } from "./profileSlice"
import { openErrorToast } from "../../common/toast"
import TweetCard from "../../components/mui/TweetCard"
import { postFollowApi } from "../../api"
import { followRequested, tweetsRequested } from "../Dashboard/dashboardSlice"
import { getUser } from "../Login/loginSlice"

const Profile = () => {
    const userId = useSelector(getProfileUserId)
    const userInfo = useSelector(getUserInfo)
    const tweetsList = useSelector(getTweetsList)
    const currentPage = useSelector(getCurrentPage)
    const following = useSelector(getFollowing)
    const _user = useSelector(getUser)
    const dispatch = useDispatch()


    const [noOfPages, setNoOfPages] = React.useState(0)
    const [posts, setPosts] = React.useState([])



    function paginate(array, page_size, page_number) {
        setPosts(array.slice((page_number - 1) * page_size, page_number * page_size))
    }

    function calCulatePages(array, per_page) {
        console.log({ array })
        setNoOfPages(Math.ceil(array / per_page))
    }

    React.useEffect(() => {
        calCulatePages(tweetsList.length, 11)
        paginate(tweetsList, 11, currentPage)
        setPosts(tweetsList)
    }, [tweetsList])

    React.useEffect(() => {
        paginate(tweetsList, 11, currentPage)
    }, [currentPage])

    const loadData = () => {
        try {
            dispatch(userFeedsRequested({ id: userId })).unwrap()
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

    React.useEffect(() => {
        if (userId === null) {
            dispatch(handleChangeProfileUserId(_user.id))
        }
        return () => {
            dispatch(handleResetSlice())
        }
    }, [])
    React.useEffect(() => {
        if (userId) {
            loadData()
        }


    }, [userId])


    return (
        <Fragment>
            {userInfo?.name ? <>
                <Box sx={{
                    height: 120,
                    position: "relative",
                    display: "Flex",
                    alignItems: "end",
                    justifyContent: "center", mb: 4
                }}>

                    <Box sx={{
                        height: 80,
                        background: theme => theme.palette.background.paper,
                        position: "Absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>
                    </Box>
                    <Box sx={{
                        width: "90%",
                        display: "flex",
                        zIndex: 1000,
                        alignItems: "center",
                        gap: 2
                    }}>
                        <Avatar src={Logo} sx={{
                            background: "#fff",
                            width: 80,
                            height: 80,
                            boxShadow: theme => theme.shadows[4]
                        }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{
                                fontWeight: 700
                            }}>{userInfo.name}</Typography>
                            <Typography sx={{
                                color: theme => theme.palette.primary.main
                            }}>{userInfo.username} </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontWeight: 700
                            }}>Followers</Typography>
                            <Typography sx={{
                                color: theme => theme.palette.primary.main
                            }}>user </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontWeight: 700
                            }}>Following</Typography>
                            <Typography sx={{
                                color: theme => theme.palette.primary.main
                            }}>user </Typography>
                        </Box>
                    </Box>

                </Box>


                {posts.length > 0 ? posts.map(tweet => (
                    <>
                        <TweetCard
                            navigateUserProfile={() => {
                                dispatch(handleChangeProfileUserId(userId))
                            }}
                            handleFollow={async () => {
                                try {
                                    await postFollowApi({ followerId: userInfo.id, followingId: tweet.userId })
                                    dispatch(followRequested({ userId: userInfo.id })).unwrap()
                                    dispatch(tweetsRequested({ id: userInfo.id })).unwrap()
                                } catch (err) {
                                    openErrorToast(err.message ? err.message : err)
                                }
                            }} hideFollowButton={false} following={following.filter(f => f.id === tweet.userId).length > 0 ? true : false} peoples={tweet.people} tweetCounts={tweet.counts} userId={userInfo.id} postId={tweet.id} name={tweet.name} username={tweet.username} description={tweet.description} />
                    </>
                )) : "No Tweets Posted Yet"}</> : "Loading"}

        </Fragment>
    )
}

export default Profile