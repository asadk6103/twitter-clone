

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import Icons from '../../../common/icons';
import { openErrorToast } from '../../../common/toast';
import { postFollowApi } from '../../../api';
import { useDispatch } from 'react-redux';
import { followRequested, tweetsRequested } from '../../../screens/Dashboard/dashboardSlice';



export default function FollowCard({ cuid, uid, name, username, isFollowing }) {
    const dispatch = useDispatch()

    return (
        <Card  >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={name}
                subheader={username}
            />
            <CardActions disableSpacing>
                <Button sx={{
                    fontWeight: 700,
                    borderRadius: 30,
                    textTransform: "inherit"
                }}
                    variant={isFollowing ? "contained" : 'outlined'}
                    size='small'
                    fullWidth
                    onClick={async e => {
                        try {
                            await postFollowApi({ followerId: cuid, followingId: uid })
                            dispatch(followRequested({ userId: cuid })).unwrap()
                            dispatch(tweetsRequested({ id: cuid })).unwrap()
                        } catch (err) {
                            openErrorToast(err.message ? err.message : err)
                        }
                    }}
                >
                    {!isFollowing && <Icons.Add />}
                    {isFollowing ? "Following" : "Follow"}
                </Button>
            </CardActions>
        </Card>
    );
}