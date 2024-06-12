import { createApi } from '@reduxjs/toolkit/query/react';
import { CreatePromo, CreatePromoBody, DetailPromo, EditPromoBody, EditPromoResponse, PromoLists } from './types';
import { baseQuery } from './prepareHeader';

export const promoApi = createApi({
    reducerPath: 'promoApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getPromotLists: builder.query<PromoLists, { page: number; q: string }>({
            query: ({ page, q }) => `/promo?page=${page}&q=${q}`,
        }),
        detailPromo: builder.query<DetailPromo, number>({
            query: (id) => `/promo/${id}`,
        }),
        editPromo: builder.mutation<EditPromoResponse, { id: number; body: EditPromoBody }>({
            query: ({ id, body }) => ({
                url: `/promo/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deletePromo: builder.mutation<
            {
                data: {
                    status: boolean;
                    message: string;
                    resource: null;
                };
            },
            { idPromo: number; idProduct: number }
        >({
            query: ({ idPromo, idProduct }) => ({
                url: `/promo/destroy/${idPromo}/${idProduct}`,
                method: 'DELETE',
            }),
        }),
        createPromo: builder.mutation<CreatePromo, CreatePromoBody>({
            query: (body) => ({
                url: '/promo',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetPromotListsQuery, useDetailPromoQuery, useEditPromoMutation, useDeletePromoMutation, useCreatePromoMutation } = promoApi;
