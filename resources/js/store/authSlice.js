import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHttp, setToken, getToken } from '../utilities/http';

export const fetchLogin = createAsyncThunk('auth/fetchLogin',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post('login', data)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const logout = createAsyncThunk('auth/logout',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post('logout')
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchUser = createAsyncThunk('auth/fetchUser',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get('me')
            return response? response.data: null;
        } catch(err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchRegister = createAsyncThunk('auth/fetchRegister',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post('register', data)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchVerifyEmail = createAsyncThunk('auth/fetchVerifyEmail',
    async (fetchUrl, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(fetchUrl)
            return response? response.data: null;
        } catch(err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchForgotPassword = createAsyncThunk('auth/fetchForgotPassword',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post('forgot-password', data)
            return response.data
        } catch(err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchResetPassword = createAsyncThunk('auth/fetchResetPassword',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post('reset-password', data)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    user: null,
    accessToken: getToken(),
    errorMessage: '',
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        reset: (state) => {
            state = initialState
        }
    },
    
    extraReducers: {
        [fetchLogin.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchLogin.fulfilled]: (state, { payload }) => {
            const { user, access_token: accessToken } = payload
            state.user = user
            state.accessToken = accessToken
            state.errorMessage = ''
            state.isLoading = false

            setToken(accessToken)
        },
        [logout.fulfilled]: (state, action) => {
            state.accessToken = '' // to trigger the callback effect
            setToken('')
            state = initialState 
        },
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.user = payload
        },
        [fetchLogin.rejected]: (state, action) => {
            state.errorMessage = action.payload? action.payload.message: 'Error'
            state.isLoading = false
        },

        [fetchRegister.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchRegister.fulfilled]: (state, { payload }) => {
            const { user, access_token: accessToken } = payload
            state.user = user
            state.accessToken = accessToken
            state.errorMessage = ''
            state.isLoading = false
            setToken(accessToken)
        },
        [fetchRegister.rejected]: (state, action) => {
            state.errorMessage = action.payload? action.payload.message: 'Error'
            state.isLoading = false
        }
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer