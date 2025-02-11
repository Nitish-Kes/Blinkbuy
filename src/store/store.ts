import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from './commonSlice'

export const store = configureStore({
    reducer: {
        commonReducer: CommonSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

