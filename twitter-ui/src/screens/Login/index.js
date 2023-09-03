import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Divider, Box } from "@mui/material";
import { loginRequested } from "./loginSlice";
import { useDispatch } from 'react-redux';
import TwitterSVG from './images/icons8-twitter.svg'
import { Link } from "react-router-dom";
import Dialog from "../../components/mui/Dialog";
import Register from "./Register";
import LoginPage from "./LoginPage";
const Login = () => {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false)
    const [loginModalOpen, setLoginModalOpen] = React.useState(false)
    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12} md={7} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img src={TwitterSVG} alt={"Twitter Logo"} />
                </Grid>
                <Grid item xs={12} md={5} display={"flex"} alignItems={"start"} flexDirection={"column"} justifyContent={"space-around"}>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: 64,
                    }}>Happening Now</Typography>
                    <Box sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography sx={{
                            fontWeight: 900,
                            fontSize: 32,
                        }}>Join today.</Typography>
                        <Button variant="outlined" sx={{
                            borderRadius: 30,
                            fontWeight: 600,
                            textTransform: "inherit"
                        }}>
                            Sign up with Google
                        </Button>
                        <Button variant="outlined" sx={{
                            borderRadius: 30,
                            fontWeight: 600,
                            textTransform: "inherit",
                            color: "#000",
                            borderColor: "#000"
                        }}>
                            Sign up with Apple
                        </Button>
                        <Divider component="div" role="presentation" sx={{
                            fontSize: 14,
                            '&:before': {
                                top: 0
                            },
                            '&:after': {
                                top: 0
                            }

                        }}>Or</Divider>
                        <Button variant="contained"
                            onClick={e => {
                                setRegisterModalOpen(true)
                            }}
                            sx={{
                                borderRadius: 30,
                                fontWeight: 600,
                                textTransform: "inherit",
                            }}>
                            Create account
                        </Button>
                        <Typography sx={{
                            fontSize: 10,
                            fontWeight: 500,
                            color: "#888"
                        }}>
                            By signing up, you agree to the <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>, including <Link>Cookie Use</Link>.
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography sx={{
                            fontWeight: 700,
                            fontSize: 18,
                        }}>
                            Already have an account?
                        </Typography>
                        <Button variant="outlined" onClick={() =>setLoginModalOpen(true)}
                            sx={{
                                borderRadius: 30,
                                fontWeight: 600,
                                textTransform: "inherit",
                            }}>
                            Sign in
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {registerModalOpen ? <Register modalOpen={registerModalOpen} handleClose={() => {setRegisterModalOpen(false)}} setLoginModalOpen={setLoginModalOpen}  /> : ""}
            {loginModalOpen ? <LoginPage modalOpen={loginModalOpen} handleClose={() => {setLoginModalOpen(false)}} /> : ""}

        </React.Fragment>
    );
}

export default Login;