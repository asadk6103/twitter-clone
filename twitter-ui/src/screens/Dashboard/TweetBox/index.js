import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LogoSvg from '../../Login/images/icons8-twitter.svg'
import { Button, Divider, TextField } from '@mui/material';
import { openErrorToast, openSuccessToast } from '../../../common/toast';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Login/loginSlice';
import { postTweetsRequested, tweetsRequested } from '../dashboardSlice';
import { postTweetApi } from '../../../api';


export default function TweetBox({ name, username }) {
    const [postDetails, setPostDetails] = React.useState("")
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    // const userId = useSelector(get)
    return (
        <>
            <Card sx={{
                mt: 2,
                mb: 2,
                border: "none",
                boxShadow: "none"
            }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={LogoSvg} />
                    }
                    title={
                        <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
                    }
                    subheader={
                        <Typography sx={{ color: '#666', fontSize: 12 }}>{username}</Typography>
                    }

                />
                <CardContent sx={{
                    p: 0
                }}>
                    <TextField fullWidth multiline rows={2} value={postDetails}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: 24,
                                fontWeight: 500
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: "none"
                            }
                        }}
                        onChange={e => {
                            setPostDetails(e.target.value)
                        }}
                        placeholder='Whats on your mind?!'

                    />
                </CardContent>
                <CardActions disableSpacing sx={{
                    justifyContent: "end"
                }}>
                    <Button variant='contained' sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        borderRadius: 30,
                        px: 3,
                        color: "#fff"
                    }} size='small'
                        disabled={!postDetails}
                        onClick={async () => {
                            try {
                                await postTweetApi({ description: postDetails, userId: user.id })
                                setPostDetails("")
                                dispatch(tweetsRequested({ id: user.id })).unwrap()
                                openSuccessToast("Tweet Posted")
                            } catch (err) {
                                openErrorToast(err.message ? err.message : err)
                            }
                        }}
                    >
                        Post</Button>
                </CardActions>
            </Card>
            <Divider /></>
    );
}