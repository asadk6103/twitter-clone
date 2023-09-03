import { Button, Divider, Stack, TextField, Typography } from "@mui/material"
import Dialog from "../../../components/mui/Dialog"
import React from "react"
import { useDispatch } from "react-redux"
import { loginRequested } from "../loginSlice"


const LoginPage = ({ modalOpen, handleClose }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const dispatch = useDispatch()

    return (
        <Dialog dailogOpen={modalOpen} handleClose={handleClose} hasCloseIcon size={"sm"} title="">
            < Stack flexDirection={"column"} sx={{
                width: "50%",
                margin: "auto"
            }}>

                <Typography sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    mb: 4
                }}>Sign In to Twitter</Typography>


                <Button variant="outlined" sx={{
                    borderRadius: 30,
                    fontWeight: 600,
                    textTransform: "inherit",
                    mb: 2
                }}>
                    Sign up with Google
                </Button>
                <Button variant="outlined" sx={{
                    borderRadius: 30,
                    fontWeight: 600,
                    textTransform: "inherit",
                    color: "#000",
                    borderColor: "#000",
                    mb: 2
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
                    },
                    mb: 4

                }}>Or</Divider>


                <TextField
                    value={username}
                    sx={{
                        mb: 2,
                        '& .MuiFormLabel-root .MuiInputLabel-root .Mui-focused': {
                            color: "#000"
                        },
                        '& .MuiInputBase-root': {
                            background: "#fff",
                            border: '1px solid #000',
                            "& :after": {
                                borderBottom: 'none'
                            }
                        },
                        '& .MuiInputBase-root .Mui-focused': {
                            background: "#fff",
                        }
                    }} id="filled-basic" label="Email or Username" size="normal" variant="filled"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />

                <TextField
                    value={password}
                    type="password"
                    sx={{
                        mb: 2,
                        '& .MuiFormLabel-root .MuiInputLabel-root .Mui-focused': {
                            color: "#000"
                        },
                        '& .MuiInputBase-root': {
                            background: "#fff",
                            border: '1px solid #000',
                            "& :after": {
                                borderBottom: 'none'
                            }
                        },
                        '& .MuiInputBase-root .Mui-focused': {
                            background: "#fff",
                        }
                    }} id="filled-basic" label="Password" size="normal" variant="filled"
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />

                <Button variant="outlined" sx={{
                    borderRadius: 30,
                    fontWeight: 600,
                    textTransform: "inherit",
                    color: "#fff",
                    borderColor: "#000", mb: 2,
                    background: "#000",
                    '&:hover': {
                        borderColor: "#000",
                        background: "#000",
                    }
                }} onClick={() => {
                    dispatch(loginRequested({ username, password }))
                }} >
                    Login
                </Button>
                <Button variant="outlined" sx={{
                    borderRadius: 30,
                    fontWeight: 600,
                    textTransform: "inherit",
                    color: "#000",
                    borderColor: "#000"
                }}>
                    Forgotten Password?
                </Button>
            </Stack>
        </Dialog>
    )
}

export default LoginPage