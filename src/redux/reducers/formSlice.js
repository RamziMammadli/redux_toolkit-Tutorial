import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postFormThunk = createAsyncThunk("api/post", async (data) => {
  const response = await axios.post(
    "https://northwind.vercel.app/api/categoriess",
    data
  );
  return response;
});

export const formSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(postFormThunk.fulfilled, (state) => {
        state.loading = false
    })
    .addCase(postFormThunk.pending, (state) => {
        state.loading = true
    })
    .addCase(postFormThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
    })
  },
});


export default formSlice.reducer