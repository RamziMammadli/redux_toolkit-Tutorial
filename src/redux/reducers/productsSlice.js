import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductThunk = createAsyncThunk('api/products', async () => {
    const response = await axios.get('https://dummyjson.com/products')    
    return response.data.products
})


export const productsSlice = createSlice({
    name:'products',
    initialState: {},
    reducers:{
         
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductThunk.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(getProductThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(getProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default productsSlice.reducer