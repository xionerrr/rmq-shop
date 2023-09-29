import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

import { LocalStorageNamespace } from 'helpers'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.SERVER_LINK,
  prepareHeaders: (headers) => {
    const accessToken = LocalStorageNamespace.getAuthToken()
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

    return headers
  },
})
