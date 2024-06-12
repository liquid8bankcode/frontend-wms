import { createApi } from '@reduxjs/toolkit/query/react';
import { CreatePaletBody, CreatePaletResponse, DeletePaletList, DetailPalletProps, DisplayPallet, FilterDisplayPallet, PaletLists, filterPalletLists } from './types';
import { baseQuery } from './prepareHeader';

export const palletApi = createApi({
    reducerPath: 'palletApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        palletLists: builder.query<PaletLists, { page: number; q: string }>({
            query: ({ page, q }) => `/palet?page=${page}&q=${q}`,
        }),
        deletePallet: builder.mutation<DeletePaletList, number>({
            query: (id) => ({
                url: `/palet/${id}`,
                method: 'DELETE',
            }),
        }),
        displayPalletLists: builder.query<DisplayPallet, { page: number; q: string }>({
            query: ({ page, q }) => `/palet/display?page=${page}&q=${q}`,
        }),
        filterPallet: builder.mutation<FilterDisplayPallet, number>({
            query: (id) => ({
                url: `/palet/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        filterProductLists: builder.query<filterPalletLists, number>({
            query: (page) => `/palet/filter_product?page=${page}`,
        }),
        deleteFilterProduct: builder.mutation<DeletePaletList, number>({
            query: (id) => ({
                url: `/palet/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createPallete: builder.mutation<CreatePaletResponse, CreatePaletBody>({
            query: (body) => ({
                url: '/palet',
                method: 'POST',
                body,
            }),
        }),
        showPallet: builder.query<DetailPalletProps, number>({
            query: (id) => `/palet/${id}`,
        }),
    }),
});

export const {
    usePalletListsQuery,
    useDeletePalletMutation,
    useDisplayPalletListsQuery,
    useFilterPalletMutation,
    useFilterProductListsQuery,
    useDeleteFilterProductMutation,
    useCreatePalleteMutation,
    useShowPalletQuery,
} = palletApi;
