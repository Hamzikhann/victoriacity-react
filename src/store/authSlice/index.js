import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { post } from '../../helpers/api_Helper';


// thunks
// Signin By Email Thunk
export const SigninByEmailThunk = createAsyncThunk(
    'user/SigninByEmail', async (value, { rejectWithValue }) => {

        try {
            const { data } = await post('/login', value);
            return data;
        } catch (err) {

            return rejectWithValue(err.response.data)
        }
    })


const initialState = {
    user: {},
    showHeaderBtn: false,
    token: null,
    showProfileDrawer: false,
    hash: null,
    loading: false,
    isAuth: false,

}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    loading: false,
    reducers: {



    },


    extraReducers: {
        // *******************pending**********************
        [SigninByEmailThunk.pending]: (state) => {
            state.loading = true
        },

        // *******************fullfiled**********************
        [SigninByEmailThunk.fulfilled]: (state, { payload }) => {

        },

        // ______________________Rejected_________________*
        [SigninByEmailThunk.rejected]: (state, { payload }) => {
            state.loading = false;
            state.message = payload.message;
        },





    }
})

// Action creators are generated for each case reducer function
export const { } = authSlice.actions

export default authSlice.reducer