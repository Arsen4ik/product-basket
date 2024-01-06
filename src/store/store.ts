import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './productListSlice'
import showModalReducer from "./showModal";

export const store = configureStore({
    reducer: {
        productList: productListReducer,
        showModal: showModalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch