import { createApi } from '@reduxjs/toolkit/query/react';
import { BundleResponse, DetailQCDResponse, DumpProps, GetFilterProductBundles, GetListDump, GetListProductRepair, NewProduct, ProdcutItem, QCDResponse } from './types';
import { baseQuery } from './prepareHeader';

export const listDumpApi = createApi({
    reducerPath: 'listDumpApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListDump: builder.query<QCDResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/bundle/qcd?page=${page}&q=${q}`,
        }),
        addListDump: builder.mutation<GetListDump, any>({
            query: (body) => ({ url: `/bundle/qcd`, method: 'POST', body }),
        }),
        unbundleListDump: builder.mutation<any, any>({
            query: (id) => ({ url: `/bundle/qcd/${id}`, method: 'DELETE' }),
        }),
        deleteListDump: builder.mutation<any, any>({
            query: (id) => ({ url: `/bundle/qcd/${id}/destroy`, method: 'DELETE' }),
        }),
        detailDump: builder.query<DetailQCDResponse, number>({
            query: (id) => `/bundle/qcd/${id}`,
        }),
        getFilterDump: builder.query<GetFilterProductBundles, { page: number }>({
            query: ({ page }) => `/qcd/filter_product?page=${page}`,
        }),
        getDumps: builder.query<DumpProps, { page: number; q: string }>({
            query: ({ page, q }) => `/dumps?page=${page}&q=${q}`,
        }),
        addFilterDump: builder.mutation<any, number>({
            query: (id) => ({ url: `/qcd/filter_product/${id}/add`, method: 'POST' }),
        }),
        deleteFilterDump: builder.mutation<any, number>({
            query: (id) => ({ url: `qcd/destroy/${id}`, method: 'DELETE' }),
        }),
        exportDump: builder.query<any, number>({
            query: (id) => `/export-dumps-excel/${id}`,
        }),
        deleteNewProduct: builder.mutation<any, any>({
            query: (id) => ({
                url: `/new_products/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetListDumpQuery,
    useGetFilterDumpQuery,
    useAddFilterDumpMutation,
    useAddListDumpMutation,
    useDeleteFilterDumpMutation,
    useGetDumpsQuery,
    useUnbundleListDumpMutation,
    useDetailDumpQuery,
    useDeleteListDumpMutation,
    useExportDumpQuery,
    useDeleteNewProductMutation,
} = listDumpApi;
