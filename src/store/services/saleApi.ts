import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListSale, GetListSaleDocument, GetShowSaleDocument, SaleReportResponse } from './types';
import { baseQuery } from './prepareHeader';

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListSale: builder.query<GetListSale, number>({
            query: (page) => `/sales?page=${page}`,
        }),
        addSale: builder.mutation<any, any>({
            query: (body) => ({
                url: '/sales',
                method: 'POST',
                body,
            }),
        }),
        saleFinish: builder.mutation<any, any>({
            query: () => ({
                url: '/sale-finish',
                method: 'POST',
            }),
        }),
        deleteSale: builder.mutation<any, any>({
            query: (id) => ({
                url: `/sales/${id}`,
                method: 'DELETE',
            }),
        }),
        putGabor: builder.mutation<any, any>({
            query: ({id, body}) => ({
                url: `/sales/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        getListSaleDocument: builder.query<GetListSaleDocument, { page: number; q: string }>({
            query: ({ page, q }) => `/sale-documents?page=${page}&q=${q}`,
        }),
        getShowSale: builder.query<GetShowSaleDocument, string | undefined>({
            query: (id) => `/sale-documents/${id}`,
        }),
        getSaleReport: builder.query<SaleReportResponse, string | undefined>({
            query: (code_document_sale) => `/sale-report?code_document_sale=${code_document_sale}`,
        }),
    }),
});

export const { useGetListSaleQuery, useAddSaleMutation, useSaleFinishMutation, useDeleteSaleMutation, useGetListSaleDocumentQuery, useGetShowSaleQuery, useGetSaleReportQuery, usePutGaborMutation } = saleApi;
