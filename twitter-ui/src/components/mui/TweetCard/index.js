

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TwiiterIcon from '../../../screens/Login/images/icons8-twitter.svg'
import { Button, Checkbox, Divider, FormControlLabel, List, ListItemText, Tooltip } from '@mui/material';
import Icons from '../../../common/icons';
import { openErrorToast } from '../../../common/toast';
import { postLikeApi } from '../../../api';
import { useDispatch } from 'react-redux';
import { tweetsRequested } from '../../../screens/Dashboard/dashboardSlice';
import { Link } from 'react-router-dom';
import { handleChangeProfileUserId } from '../../../screens/Profile/profileSlice';

export default function TweetCard({ navigateUserProfile, handleFollow, hideFollowButton, following, peoples, tweetCounts, name, username, description, postId, userId }) {
    const dispatch = useDispatch()
    return (
        <>
            <Card sx={{ mb: 2, border: "none", boxShadow: "none" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={TwiiterIcon} />
                    }
                    action={
                        hideFollowButton &&
                        <Button variant="contained" sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#FFF',
                            textTransform: "inherit"
                        }}
                            onClick={handleFollow}
                        >
                            {following ? "Following" : "Follow"}
                        </Button>
                    }
                    title={

                        <Typography component={Link} to={"/profile"} onClick={navigateUserProfile} sx={{ fontWeight: 700 }}>{name}</Typography>
                    }
                    subheader={
                        <Typography sx={{ color: '#666', fontSize: 12 }}>{username}</Typography>
                    }
                />
                <CardContent>
                    <Typography sx={{
                        fontSize: 28,
                        fontWeight: 500
                    }} variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip placement='top' title={
                        <>
                            {peoples.length > 0 ?
                                peoples.map((p, i) => {
                                    if (i < 5) {
                                        return <Typography sx={{
                                            fontSize: 10
                                        }}>{p.name}</Typography>
                                    }
                                })
                                : "No likes yet"}
                        </>
                    }>
                        <IconButton disableRipple aria-label="add to favorites">
                            <FormControlLabel

                                checked={peoples.find(p => p.userId === userId)}
                                control={
                                    <Checkbox disableRipple onChange={async (e) => {
                                        try {
                                            await postLikeApi({ postId, userId })
                                            dispatch(tweetsRequested({ id: userId })).unwrap()
                                        } catch (err) {
                                            openErrorToast(err.message ? err.message : err)
                                        }
                                    }} icon={<Icons.FavoriteOutlined />} checkedIcon={<Icons.Favorite />} />
                                }
                                label={tweetCounts}
                            />

                        </IconButton>
                    </Tooltip>

                </CardActions>
            </Card>
            <Divider /></>
    );
}