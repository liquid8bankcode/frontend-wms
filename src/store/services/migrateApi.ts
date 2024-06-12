import { createApi } from '@reduxjs/toolkit/query/react';
import { GetCountColor, GetListMigrate } from './types';
import { baseQuery } from './prepareHeader';

interface GetListMigrateIndex {
    data: {
        resource: {
            code_document_migrate: string;
            migrate: {
                total: number;
                per_page: number;
                data: { id: number; old_barcode_product: number; new_name_product: string; new_price_product: number }[];
            };
            new_product: {
                total: number;
                per_page: number;
                data: {
                    id: number;
                    old_barcode_product: number;
                    new_name_product: string;
                    new_price_product: number;
                }[];
            };
        };
    };
}

interface GetShowMigrateProps {
    data: {
        resource: {
            code_document_migrate: string;
            destiny_document_migrate: string;
            total_price_document_migrate: number;
            total_product_document_migrate: number;
            migrates: {
                old_barcode_product: number;
                new_barcode_product: number;
                new_name_product: string;
                new_price_product: number;
                new_qty_product: number;
            }[];
        };
    };
}

export const migrateApi = createApi({
    reducerPath: 'migrateApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListMigrate: builder.query<GetListMigrate, { page: number; q: string }>({
            query: ({ page, q }) => `/migrate-documents?page=${page}&q=${q}`,
        }),
        getIndexMigrate: builder.query<GetListMigrateIndex, { q: string; migratePage: number; productPage: number }>({
            query: ({ q, migratePage, productPage }) => `/migrates?migrate_page=${migratePage}&product_page=${productPage}&q=${q}`,
        }),
        postMigrate: builder.mutation<any, any>({
            query: (id) => ({
                url: `/migrate-add/${id}`,
                method: 'PUT',
            }),
        }),
        deleteMigrate: builder.mutation<any, any>({
            query: (id) => ({
                url: `/migrates/${id}`,
                method: 'DELETE',
            }),
        }),
        migrateFinish: builder.mutation<any, any>({
            query: (body) => ({
                url: '/migrate-finish',
                method: 'POST',
                body,
            }),
        }),
        getShowMigrate: builder.query<GetShowMigrateProps, string | undefined>({
            query: (id) => `/migrate-documents/${id}`,
        }),
        getColorCount: builder.query<GetCountColor, undefined>({
            query: () => '/countColor',
        }),
        addMigrate: builder.mutation<any, any>({
            query: (body) => ({
                url: '/bundleMigrate',
                method: 'POST',
                body,
            }),
        }),
        migrate: builder.mutation<any, any>({
            query: (body) => ({
                url: '/migrates',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetListMigrateQuery, useGetIndexMigrateQuery, usePostMigrateMutation, useDeleteMigrateMutation, useMigrateFinishMutation, useGetShowMigrateQuery, useGetColorCountQuery, useAddMigrateMutation, useMigrateMutation } = migrateApi;
