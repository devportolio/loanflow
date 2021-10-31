import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiHttp } from '../utilities/http';

export const fetchFriendList = createAsyncThunk('friend/fetchFriendList',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp().get('user-friends')
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        list: []
    },

    extraReducers: {
        [fetchFriendList.fulfilled]: (state, { payload }) => {
            state.list = payload
        },
    }
})

export const { } = friendSlice.actions

export default friendSlice.reducer