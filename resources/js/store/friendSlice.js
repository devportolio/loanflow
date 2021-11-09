import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiHttp } from '../utilities/http';

export const fetchFriendList = createAsyncThunk('friend/fetchFriendList',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get('user-friends')
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const acceptFriend = createAsyncThunk('friend/acceptFriend',
    async (id, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(`user-friends/${id}/accept`)
            return id
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const declineFriend = createAsyncThunk('friend/declineFriend',
    async (id, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(`user-friends/${id}/decline`)
            return id
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const searchFriend = createAsyncThunk('friend/searchFriend',
    async (email, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(`user-friends/${email}/search`)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const addFriend = createAsyncThunk('friend/addFriend',
    async (friend_id, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post(`user-friends`, { friend_id })
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    list: [],
    friend: null
}

export const friendSlice = createSlice({
    name: 'friend',
    initialState,

    reducers: {
        reset: (state) => {
            state = initialState
        },

        setFriend: (state, { payload }) => {
            state.friend = payload
        }
    },

    extraReducers: {
        [fetchFriendList.fulfilled]: (state, { payload }) => {
            state.list = payload
        },
        [acceptFriend.fulfilled]: (state, { payload: id }) => {
            const index = state.list.findIndex(l => l.id == id)

            if (index>-1) {
                state.list[index].is_accepted = 1
            }
        },

        [declineFriend.fulfilled]: (state, { payload: id }) => {
            state.list = [...state.list].filter(l => l.id != id)
        },

        [searchFriend.fulfilled]: (state, { payload }) => {
            state.friend = payload
        },

        [addFriend.fulfilled]: (state, { payload }) => {
            if (!state.list.find(l => l.user_id == payload.user_id)) {
                state.list = [...state.list, payload]
            }

            state.friend = null
        },
    }
})

export const { setFriend } = friendSlice.actions

export default friendSlice.reducer