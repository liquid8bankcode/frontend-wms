import { createApi } from '@reduxjs/toolkit/query/react';
import { CheckProductDocument, GetBarcodeBody, GetBarcodeResponse } from './types';
import { baseQuery } from './prepareHeader';

export const checkProduct = createApi({
    reducerPath: 'checkProduct',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        documentsCheckProducts: builder.query<CheckProductDocument, number>({
            query: (page) => `/documents?page=${page}`,
        }),
        getBarcode: builder.query<GetBarcodeResponse | undefined, GetBarcodeBody>({
            query: ({ code_document, old_barcode_product }) => `/search_barcode_product?code_document=${code_document}&old_barcode_product=${old_barcode_product}`,
        }),
        getProductRepair: builder.query<GetBarcodeResponse | undefined, GetBarcodeBody>({
            query: ({ code_document, old_barcode_product }) => `/getProductRepair?code_document=${code_document}&old_barcode_product=${old_barcode_product}`,
        }),
        deleteDocument: builder.mutation<any, any>({
            query: (id) => ({
                url: `/documents/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteApprove: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-approves/${id}`,
                method: 'DELETE',
            }),
        }),
        checkPrice: builder.mutation<any, any>({
            query: (body) => ({
                url: '/check-price',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useDocumentsCheckProductsQuery, useLazyGetBarcodeQuery, useDeleteDocumentMutation, useDeleteApproveMutation, useLazyGetProductRepairQuery, useCheckPriceMutation } = checkProduct;
