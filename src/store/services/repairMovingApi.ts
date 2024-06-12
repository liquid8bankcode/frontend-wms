import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { DetailRepairResponse, RepairResponse } from './types';

export const repairMovingProductsApi = createApi({
    reducerPath: 'repairMovingProductsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRepairMovingProducts: builder.query<RepairResponse, any>({
            query: () => '/repair-mv',
        }),
        getFilterRepairMovingProducts: builder.query({
            query: (page) => `/repair-mv/filter_product?page=${page}`,
        }),
        filterRepairMovingProducts: builder.mutation({
            query: (id) => ({
                url: `/repair-mv/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        deleteFilterRepairMovingProducts: builder.mutation({
            query: (id) => ({
                url: `/repair-mv/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createRepairMovingProducts: builder.mutation({
            query: (body) => ({
                url: `/repair-mv`,
                method: 'POST',
                body,
            }),
        }),
        getShowRepairMovingProducts: builder.query<DetailRepairResponse, any>({
            query: (id) => `/repair-mv/${id}`,
        }),
        unrepairMovingProduct: builder.mutation<any, number>({
            query: (id) => ({
                url: `/repair-mv/${id}`,
                method: 'DELETE',
            }),
        }),
        updateThrowsDetail: builder.mutation<any, any>({
            query: (id,) => ({
                url: `/update-repair-dump/${id}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useGetRepairMovingProductsQuery,
    useGetFilterRepairMovingProductsQuery,
    useFilterRepairMovingProductsMutation,
    useDeleteFilterRepairMovingProductsMutation,
    useCreateRepairMovingProductsMutation,
    useGetShowRepairMovingProductsQuery,
    useUnrepairMovingProductMutation,
    useUpdateThrowsDetailMutation,
} = repairMovingProductsApi;
