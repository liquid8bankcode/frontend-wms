import { createApi } from '@reduxjs/toolkit/query/react';
import { BundleResponse, DetailBundleResponse, DeleteBundleResponse, FilterProduct, GetFilterProductBundles, CreateBundle, CreateBundleBody } from './types';
import { baseQuery } from './prepareHeader';

export const bundleProductApi = createApi({
    reducerPath: 'bundleProductApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBundleProducts: builder.query<BundleResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/bundle?page=${page}&q=${q}`,
        }),
        detailBundleProduct: builder.query<DetailBundleResponse, number>({
            query: (id) => `/bundle/${id}`,
        }),
        deleteBundleProduct: builder.mutation<DeleteBundleResponse, number | undefined>({
            query: (id) => ({
                url: `/bundle/${id}`,
                method: 'DELETE',
            }),
        }),
        filterProductBundle: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/bundle/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        getFilterProductBundles: builder.query<GetFilterProductBundles, number>({
            query: (page) => `/bundle/filter_product?page=${page}`,
        }),
        deleteFilterProductBundles: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `bundle/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createBundle: builder.mutation<CreateBundle, any>({
            query: (body) => ({
                url: '/bundle',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetBundleProductsQuery,
    useDetailBundleProductQuery,
    useDeleteBundleProductMutation,
    useFilterProductBundleMutation,
    useGetFilterProductBundlesQuery,
    useDeleteFilterProductBundlesMutation,
    useCreateBundleMutation,
} = bundleProductApi;
