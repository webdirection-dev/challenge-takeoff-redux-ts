import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        userReducer: userReducer
    }
})

//Helpers
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>