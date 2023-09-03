import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Navigation from './Navigation';
import { Backdrop, CircularProgress, Divider, Grid, ListItemIcon, ListItemText, MenuList, TextField } from '@mui/material';
import { handleLogout, isUserLoggedIn, getUserPermissions, getUserRole, getUser } from '../screens/Login/loginSlice';
import { APP_ROUTES } from './Navigation/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoadings } from '../common/commonSlice';
import LOGOSVG from '../screens/Login/images/icons8-twitter.svg'
import FollowCard from '../components/mui/FollowCard';
import { getFollowing, getUsers } from '../screens/Dashboard/dashboardSlice';

const settings = ['Profile', 'Account', 'Dashboard'];

const Layout = (props) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isUserLoggedIn);
    const userPermissions = useSelector(getUserPermissions);
    const userRole = useSelector(getUserRole);
    const loadings = useSelector(getLoadings);
    const users = useSelector(getUsers)
    const follwing = useSelector(getFollowing)
    const user = useSelector(getUser)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='lg' >

                <Grid container>
                    {isLoggedIn ? <Grid item md={3}>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}
                            >
                                <img src={LOGOSVG} style={{
                                    width: 50
                                }} />
                            </Typography>
                        </Toolbar>

                        <MenuList sx={{
                            '& :hover': {
                                width: 'fit-content',
                                borderRadius: 30
                            }
                        }}>
                            {APP_ROUTES.map(e => (
                                <MenuItem onClick={() => {
                                    navigate(`${e.url}`)
                                }} >
                                    <ListItemIcon>
                                        <e.icon />
                                    </ListItemIcon>
                                    <ListItemText>{e.label.charAt(0).toUpperCase() + e.label.slice(1)}</ListItemText>
                                </MenuItem>
                            ))}
                        </MenuList>

                        <Divider />
                        <MenuList sx={{
                            '& :hover': {
                                width: 'fit-content',
                                borderRadius: 30
                            }
                        }}>
                            <MenuItem sx={{ color: '#f00', }} onClick={e => {
                                dispatch(handleLogout())
                            }} >
                                <ListItemIcon>
                                    <img src={LOGOSVG} style={{
                                        width: 30
                                    }} />
                                </ListItemIcon>
                                <ListItemText sx={{ fontWeight: 700 }} >Logout</ListItemText>
                            </MenuItem>

                        </MenuList>

                    </Grid> : ""}
                    <Grid item md={isLoggedIn ? 6 : 12} sx={{ background: "#ecf0f6" }}>
                        <Box sx={{
                            p: 2,

                        }}>
                            {isLoggedIn ? <Typography sx={{
                                fontWeight: 600,
                                fontSize: 18
                            }}>Home</Typography> : ""}
                            <Navigation />
                        </Box>
                    </Grid>
                    {isLoggedIn ? <Grid item md={3}>
                        <Toolbar>
                            <TextField fullWidth
                                sx={{
                                    '& .MuiFormLabel-root .MuiInputLabel-root .Mui-focused': {
                                        color: "#000"
                                    },
                                    '& .MuiInputBase-root': {
                                        background: "#fff",
                                        borderRadius: 30,
                                        border: '1px solid #000',
                                        "& :after": {
                                            borderBottom: 'none'
                                        }
                                    },
                                    '& .MuiInputBase-root .Mui-focused': {
                                        background: "#fff",
                                    }
                                }}
                                size='small'
                                label=""
                                placeholder='Search'
                            />
                        </Toolbar>
                        <Box sx={{
                            width: "90%",
                            margin: "Auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}>
                            {console.log({ follwing })}
                            {users.length > 0 ?
                                users.filter(u => u.id !== user.id).map(usr => (
                                    <>
                                        <FollowCard cuid={user.id} uid={usr.id} isFollowing={follwing.filter(f => f.id === usr.id).length > 0 ? true : false} name={usr.name} username={usr.username} />
                                    </>
                                ))

                                : ""}
                        </Box>
                    </Grid> : ""}
                </Grid>


                <Backdrop
                    sx={{ color: 'red', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loadings.length > 0}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
            </Container>
        </React.Fragment>
    );
}

export default Layout;