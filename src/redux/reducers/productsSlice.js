import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProductsThunk = createAsyncThunk( 'api/products', async () => {
    const response = await axios.get('https://northwind.vercel.app/api/categories')
    return response.data
})

export const postProductThunk = createAsyncThunk('api/post', async (data) => {
    const response = await axios.post('https://northwind.vercel.app/api/categories', data)
    return response.data
}) 

export const deleteProductThunk = createAsyncThunk('product/del', async (id) => {
    const response = await axios.delete(`https://northwind.vercel.app/api/categories/${id}`)
    return id
})


export const productsSlice = createSlice({
    name:'products',
    initialState:{},
    extraReducers: builder => {
        builder 
        //GET
        .addCase(getProductsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(getProductsThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(getProductsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        //POST
        .addCase(postProductThunk.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        //DELETE
        .addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.products = state.products.filter(item => item.id != action.payload)
        })
    }
})

export default productsSlice.reducer