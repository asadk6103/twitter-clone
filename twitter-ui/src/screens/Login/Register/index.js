import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material"
import Dialog from "../../../components/mui/Dialog"
import { Controller, useForm } from "react-hook-form"
import { MONTHS } from "./constants"
import React from "react"
import { openErrorToast } from "../../../common/toast"
import { signupApi, verifyEmailApi } from "../../../api"
import Loader from "../../../components/mui/Loader"


const Register = ({ modalOpen, handleClose, setLoginModalOpen }) => {

    const { control, handleSubmit, setError, formState: { errors, isDirty } } = useForm({
        mode: "onChange"
    })

    const [userCreated, setUserCreated] = React.useState(false)
    const year = (new Date()).getFullYear();

    const [formfields, setFormFields] = React.useState({
        name: "",
        email: "",
        month: "",
        day: "",
        year: "",
        isEmailValid: false
    })


    const handleUpdateFrom = (key, value) => {
        const _form = { ...formfields }
        _form[key] = value
        setFormFields(_form)
    }


    const submiForm = async (data) => {
        try {
            formfields["dob"] = formfields.year + "-" + formfields.month + "-" + formfields.day
            formfields["username"] = '@' + formfields.email.split('@')[0]
            formfields["password"] = (Math.random() + 1).toString(36).substring(7);
            const { data } = await signupApi({
                name: formfields.name, email: formfields.email, username: formfields.username, password: formfields.password, dob: formfields.dob
            })
            if (data.user) {
                setUserCreated(true)
            }

        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }


    const verifyEmailExistence = async () => {
        try {
            await verifyEmailApi({ email: formfields.email })
            handleUpdateFrom("isEmailValid", true)

        } catch (err) {
            handleUpdateFrom("isEmailValid", false)
            setError("email", { type: "focus", message: "This email is already taken" }, { shouldFocus: true })
        }
    }

    return (
        <Dialog title="Sign Up" dailogOpen={modalOpen} hasCloseIcon size={"sm"} handleClose={handleClose}>
            {userCreated ? < Stack flexDirection={"column"} sx={{
                width: "85%",
                margin: "auto"
            }}>
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: 32,
                    mb: 4
                }}>Thank You for joining Twitter.</Typography>


                <Typography sx={{
                    fontSize: 18,
                    color: "#777",
                    mb: 4
                }}>Congratulations! {formfields.name} your account has been created successfully. Please use the following credentials to login to your account</Typography>

                <Typography sx={{
                    fontSize: 18,
                    color: "#777",
                }}>Username: {formfields.username}</Typography>
                <Typography sx={{
                    fontSize: 18,
                    color: "#777",
                }}>Email: {formfields.email}</Typography>
                <Typography sx={{
                    fontSize: 18,
                    color: "#777",
                    mb: 4
                }}>Password: {formfields.password}</Typography>


                <Button variant="contained" size="lg" fullWidth sx={{
                    borderRadius: 30,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "inherit"
                }}
                    onClick={() => {
                        handleClose()
                        setLoginModalOpen(true)
                    }}
                >
                    Sign in
                </Button>
            </Stack> :
                < Stack flexDirection={"column"} gap={4} sx={{
                    width: "85%",
                    margin: "auto"
                }}>
                    <Typography sx={{
                        fontSize: 32,
                        fontWeight: 700
                    }}>
                        Create your account
                    </Typography>

                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: {
                                value: isDirty,
                                message: "Name is required"
                            },
                            maxLength: {
                                value: 50,
                                message: "Name can not exceed 50 characters"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                error={errors.name && !errors.name.dirty && !errors.name.touched}
                                helperText={errors.name && errors.name.message}
                                value={formfields.name}
                                sx={{
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
                                }} id="filled-basic" label="Name" size="normal" variant="filled"
                                onChange={e => {
                                    field.onChange(e)
                                    handleUpdateFrom("name", e.target.value)
                                }}
                            />
                        )}

                    />


                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: isDirty,
                                message: "Email is mandatory"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Please enter a valid email."
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                onBlur={() => {
                                    if (!errors.email) {
                                        verifyEmailExistence()
                                    }
                                }}
                                value={formfields.email}
                                error={errors.email && !errors.email.dirty && !errors.email.touched}
                                helperText={errors.email && errors.email.message}
                                sx={{
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
                                }} id="filled-basic" label="Email Address" size="normal" variant="filled"
                                onChange={e => {
                                    field.onChange(e)
                                    console.log({ errors })
                                    handleUpdateFrom("email", e.target.value)

                                }}
                            />
                        )}

                    />

                    <Box>
                        <Typography sx={{
                            fontWeight: 600,
                            mb: 1
                        }}>Date of birth</Typography>
                        <Typography sx={{
                            fontSize: 14,
                            color: "#999",
                            fontWeight: 500,
                            lineHeight: 1.25,
                            mb: 2
                        }}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Typography>
                        <Stack sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1.5
                        }}>
                            <Controller
                                control={control}
                                name="month"
                                rules={{
                                    required: {
                                        value: isDirty,
                                        message: "Please provide a valid month"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        error={errors.month && !errors.month.dirty && !errors.month.touched}
                                        helperText={errors.month && errors.month.message}
                                        select
                                        sx={{
                                            flex: 2,
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
                                        }} id="filled-basic"
                                        label="Month"
                                        size="normal"
                                        variant="filled"
                                        onChange={e => {
                                            field.onChange(e)
                                            handleUpdateFrom("month", e.target.value)
                                        }}
                                    >
                                        <MenuItem value={""}></MenuItem>
                                        {MONTHS.map((month, index) => (
                                            <MenuItem key={month} value={index + 1}>{month.charAt(0).toUpperCase() + month.slice(1)}</MenuItem>
                                        ))}
                                    </TextField>
                                )}

                            />

                            <Controller
                                control={control}
                                name="day"
                                rules={{
                                    required: {
                                        value: isDirty,
                                        message: "Please provide a valid day"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        error={errors.day && !errors.day.dirty && !errors.day.touched}
                                        helperText={errors.day && errors.day.message}
                                        select
                                        sx={{
                                            flex: 1,
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
                                        }} id="filled-basic" label="Day" size="normal" variant="filled"
                                        onChange={e => {
                                            field.onChange(e)
                                            handleUpdateFrom("day", e.target.value)
                                        }}
                                    >
                                        <MenuItem value={""}></MenuItem>
                                        {[...Array(31).keys()].map(f => (
                                            <MenuItem key={f} value={f + 1}>{f + 1}</MenuItem>
                                        ))}
                                    </TextField>
                                )}

                            />

                            <Controller
                                control={control}
                                name="year"
                                rules={{
                                    required: {
                                        value: isDirty,
                                        message: "Please provide a valid year"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        error={errors.year && !errors.year.dirty && !errors.year.touched}
                                        helperText={errors.year && errors.year.message}

                                        sx={{
                                            flex: 1,
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
                                        }} id="filled-basic" label="Year" size="normal" variant="filled"
                                        onChange={e => {
                                            field.onChange(e)
                                            handleUpdateFrom("year", e.target.value)
                                        }}
                                    >
                                        <MenuItem value={""}></MenuItem>
                                        {Array.from(new Array(120), (val, index) => (
                                            <MenuItem key={index} value={year - index}>{year - index}</MenuItem>
                                        ))}
                                    </TextField>
                                )}

                            />
                        </Stack>
                    </Box>

                    <Button variant="contained" size="lg" onClick={handleSubmit(submiForm)} fullWidth sx={{
                        borderRadius: 30,
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fff"
                    }}
                        disabled={Object.keys(errors).length > 0 ? true : false}
                    >
                        SignUp
                    </Button>


                </Stack>
            }
        </Dialog >
    )
}

export default Register