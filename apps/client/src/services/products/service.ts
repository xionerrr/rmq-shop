import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from 'services/utils'

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery,
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query<unknown, void>({
      query: () => ({
        url: `/products`,
      }),
      providesTags: ['Products'],
    }),
    getProduct: build.query<unknown, string>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<unknown, { title: string }>({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation<unknown, { id: string; title: string; count: number }>({
      query: ({ id, ...rest }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: build.mutation<unknown, string[]>({
      query: (ids) => ({
        url: `/products`,
        method: 'DELETE',
        body: ids,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})
