import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListProductRepair, NewProduct, ProdcutItem } from './types';
import { baseQuery } from './prepareHeader';

export const listProductApi = createApi({
    reducerPath: 'listProductApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetListProductRepair: builder.query<GetListProductRepair, { page: number; q: string }>({
            query: ({ page, q }) => `/repair?page=${page}&q=${q}`,
        }),
        GetProductItem: builder.query<ProdcutItem, undefined>({
            query: (id) => `/new_products/${id}`,
        }),
        updateProductRepair: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/repair/update/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        updateThrows: builder.mutation<any, any>({
            query: (id) => ({
                url: `/update-dumps/${id}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useGetListProductRepairQuery, useGetProductItemQuery, useUpdateProductRepairMutation, useUpdateThrowsMutation} = listProductApi;
