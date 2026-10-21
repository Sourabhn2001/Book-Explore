import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://dummyjson.com/auth";

export const login = createAsyncThunk(
    'login',
    async (data) => {
        const response = await axios.post(`${BASE_URL}/login`, data);
        return response.data;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        user: null,
        loading: false,
    },
    reducers: {
          logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.loading = false;
            })
    }

});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;