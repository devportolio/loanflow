import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiHttp } from '../utilities/http';

export const fetchLoans = createAsyncThunk('loan/fetchLoans',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(`loans`)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const createNewLoan = createAsyncThunk('loan/createNewLoan',
    async (data, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.post(`loans`, data)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        list: []
    },

    reducers: {},

    extraReducers: {
        [createNewLoan.fulfilled]: (state, { payload }) => {
            state.list = [...state.list, payload]
        },  

        [fetchLoans.fulfilled]: (state, { payload }) => {
            state.list = payload
        },  
    }
})

export const { } = loanSlice.actions

export default loanSlice.reducer