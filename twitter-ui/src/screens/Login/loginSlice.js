import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeAuthToken } from '../../api/utils';
import { AUTH_TOKEN_KEY } from '../../common/constants';
import { removeItem } from '../../utils/storage';
import { loginUserApi } from '../../api';
import { LOGIN_SLICE_NAME, LOGIN_REQUESTED, TOKEN_MISSING_ERROR } from './constants';

export const loginRequested = createAsyncThunk(LOGIN_REQUESTED, async ({ username, password }) => {
    try {
        const response = await loginUserApi(username, password);
        // if(response.headers.authorization) {
            return response;
        // }
        // throw TOKEN_MISSING_ERROR;
    }
    catch(err) {
        throw err;
    }
});

const loginSlice = createSlice({
    name: LOGIN_SLICE_NAME,
    initialState: {
        isLoggedIn: false,
        user: [],
        permissions: [],
        role: null,
    },
    reducers: {
        handleLogout: (state, action) => {
            removeItem(AUTH_TOKEN_KEY);
            removeAuthToken();
            state.isLoggedIn = false;
            state.user = [];
            state.permissions = [];
            state.role = '';
        }
    },
    extraReducers: {
        [loginRequested.pending]: (state) => {
            state.isLoading = true;
        },
        [loginRequested.fulfilled]: (state, user) => {
            state.user = user.payload.data.user[0]
            state.isLoggedIn = true;
            state.role = user.payload.data.role;
            state.permissions = user.payload.data.permissions;
            state.isLoading = false;
        },
        [loginRequested.rejected]: (state, data) => {
            state.isLoggedIn = false;
            state.error = data;
            state.isLoading = false;
        }
    }
});

export const { handleLogout } = loginSlice.actions;

export const isUserLoggedIn = (state) => state.login.isLoggedIn;
export const getUser = (state) => state.login.user;
export const getUserPermissions = (state) => state.login.permissions;
export const getUserRole = (state) => state.login.role;

export default loginSlice.reducer;