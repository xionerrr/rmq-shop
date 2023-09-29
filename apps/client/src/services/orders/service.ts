import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from 'services/utils'

export const ordersAPI = createApi({
  reducerPath: 'ordersAPI',
  baseQuery,
  tagTypes: ['Orders'],
  endpoints: (build) => ({
    getOrders: build.query<unknown, void>({
      query: () => ({
        url: `/orders`,
      }),
      providesTags: ['Orders'],
    }),
    getOrder: build.query<unknown, string>({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      providesTags: ['Orders'],
    }),
    createOrder: build.mutation<unknown, { customer: string; products: string[] }>({
      query: (body) => ({
        url: `/orders`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
})
