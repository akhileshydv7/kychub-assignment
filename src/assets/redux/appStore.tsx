import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

const appStore = configureStore({
    reducer: {
        products: productReducer,
    },
});

export default appStore;