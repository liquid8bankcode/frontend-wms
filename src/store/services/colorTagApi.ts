import { createApi } from '@reduxjs/toolkit/query/react';
import { ColorTag } from './types';
import { baseQuery } from './prepareHeader';

export const colorTagApi = createApi({
    reducerPath: 'colorTagApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllColorTag: builder.query<ColorTag, { page: number; q: string }>({
            query: ({ page, q }) => `/color_tags?page=${page}&q=${q}`,
        }),
        deleteColorTag: builder.mutation<any, number>({
            query: (id) => ({
                url: `/color_tags/${id}`,
                method: 'DELETE',
            }),
        }),
        updateColorTag: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/color_tags/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        createColorTag: builder.mutation<any, any>({
            query: (body) => ({
                url: '/color_tags',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetAllColorTagQuery, useDeleteColorTagMutation, useUpdateColorTagMutation, useCreateColorTagMutation } = colorTagApi;
