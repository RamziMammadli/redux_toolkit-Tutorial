import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "./reducers/counterSlice";
import  productsSlice  from "./reducers/productsSlice";
import  formSlice  from "./reducers/formSlice";

export const store = configureStore({
    reducer:{
        counter: counterSlice,
        products: productsSlice,
        form: formSlice
    }
})