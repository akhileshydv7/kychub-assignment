/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.products = action.payload;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((e:any) => e?.id !== action.payload );
        },
        clearProduct: (state) => {
            state.products.length = 0;
        },
    },
})

export const { addProduct, removeProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;