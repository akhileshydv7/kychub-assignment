/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state: any, action: any) => {
        action.payload = action.payload?.filter((f:any) => f);
      if (action.payload.length === 1) {
        state.products = [...state.products, ...action.payload];
      } else {
        const newElement = action.payload.filter((f:any) => !state.products.map((e:any) => e?.id).includes(f?.id) );
        console.log("new-->",newElement);
        
        state.products = [...state.products, ...newElement];
    }
    console.log("acton-->",action.payload,state.products);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (e: any) => e?.id !== action.payload
      );
    },
    clearProduct: (state) => {
      state.products.length = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
