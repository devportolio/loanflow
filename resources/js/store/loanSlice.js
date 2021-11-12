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

export const fetchLending = createAsyncThunk('loan/fetchLending',
    async (_, { rejectWithValue  }) => {
        try {
            const response = await apiHttp.get(`lending`)
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

export const createNewLoanPayment = createAsyncThunk('loan/createNewLoanPayment',
    async (data, { rejectWithValue  }) => {
        try {
            const form = new FormData()

            for(const key in data) {
                if (key != 'screenshot') {
                    form.append(key, data[key])
                } else {
                    form.append(key, data[key][0])

                }
            }

            const response = await apiHttp.post(`loan-payments`, form)
            return response.data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        list: [],
        lendingList: [],
        loanPayments: []
    },

    reducers: {},

    extraReducers: {
        [createNewLoan.fulfilled]: (state, { payload }) => {
            state.list = [...state.list, payload]
        },  

        [fetchLoans.fulfilled]: (state, { payload }) => {
            state.list = payload
        },  

        [fetchLending.fulfilled]: (state, { payload }) => {
            state.lendingList = payload
        },  

        [createNewLoanPayment.fulfilled]: (state, { payload }) => {
            state.loanPayments = [...state.loanPayments, payload]
        },  
    }
})

export const { } = loanSlice.actions

export default loanSlice.reducer