import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListAkun, } from './types';
import { baseQuery } from './prepareHeader';

export const listAkunApi = createApi({
    reducerPath: 'listAkunApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListAkun: builder.query<GetListAkun, { page: number; q: string }>({
            query: ({ page, q }) => `/users?page=${page}&q=${q}`,
        }),
        createAccount: builder.mutation<any, any>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
        updateAccount: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteAccount: builder.mutation<any, any>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetListAkunQuery, useCreateAccountMutation, useUpdateAccountMutation, useDeleteAccountMutation } = listAkunApi;
