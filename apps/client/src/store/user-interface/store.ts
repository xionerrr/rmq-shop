import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StateProps } from './models'

import { LocalStorageNamespace } from 'helpers'

const initialState: StateProps = {
  isAuth: false,
}

export const userInterfaceSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ isAuth: boolean; authToken: string }>) => {
      state.isAuth = action.payload.isAuth
      LocalStorageNamespace.setAuthToken(action.payload.authToken)
    },
    removeAuth: (state) => {
      state.isAuth = false
      LocalStorageNamespace.removeAuthToken()
    },
  },
})

export const { setAuth, removeAuth } = userInterfaceSlice.actions
