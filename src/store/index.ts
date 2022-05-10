import {configureStore, combineReducers} from "@reduxjs/toolkit"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
    userReducer: userReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

    devTools: true,
})

export const persistor = persistStore(store)
export default store

//Helpers
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>