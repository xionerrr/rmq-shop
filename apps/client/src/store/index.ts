import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { userInterfaceSlice } from './user-interface'

const rootReducer = combineReducers({
  [userInterfaceSlice.name]: userInterfaceSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
})

export type RootState = ReturnType<typeof store.getState>

export type RootDispatch = typeof store.dispatch
