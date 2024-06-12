import { createApi } from '@reduxjs/toolkit/query/react';
import { DeleteNewProductResponse, DetailExpiredProduct, DetailNewProduct, GetAllNewProduct, ProductExpired, SaleProductsProps } from './types';
import { baseQuery } from './prepareHeader';

export const productNewApi = createApi({
    reducerPath: 'productNewApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllProductNew: builder.query<GetAllNewProduct, { page: number; q: string }>({
            query: ({ page, q }) => `/new_products?page=${page}&q=${q}`,
        }),
        getSaleProducts: builder.query<SaleProductsProps, { page: number; q: string }>({
            query: ({ page, q }) => `/sale-products?page=${page}&q=${q}`,
        }),
        deleteProductNew: builder.mutation<DeleteNewProductResponse, number>({
            query: (id) => ({
                url: `new_products/${id}`,
                method: 'DELETE',
            }),
        }),
        detailProductNew: builder.query<DetailNewProduct, number | undefined | string>({
            query: (id) => `new_products/${id}`,
        }),
        getExpiredProducts: builder.query<ProductExpired, { page: number; q: string }>({
            query: ({ page, q }) => `/new_product/expired?page=${page}&q=${q}`,
        }),
        getDetailExpiredProduct: builder.query<DetailExpiredProduct, number | undefined>({
            query: (id) => `/new_products/${id}`,
        }),
        editDetailProduct: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/new_products/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        getDisplayExpired: builder.query<ProductExpired, { page: number; q: string }>({
            query: ({ page, q }) => `/new_product/display-expired?page=${page}&q=${q}`,
        }),
        productByCategory: builder.query<any, { q: string; page: number }>({
            query: ({ q, page }) => `/product_byCategory?page=${page}&q=${q}`,
        }),
        productByColor: builder.query<any, { q: string; page: number }>({
            query: ({ q, page }) => `/product_byColor?page=${page}&q=${q}`,
        }),
        updatePriceByProductOld: builder.query<any, string | undefined>({
            query: (oldProduct) => `/get-latestPrice?old_price_product=${oldProduct}`,
        }),
    }),
});

export const {
    useGetAllProductNewQuery,
    useGetSaleProductsQuery,
    useDeleteProductNewMutation,
    useDetailProductNewQuery,
    useGetExpiredProductsQuery,
    useGetDetailExpiredProductQuery,
    useEditDetailProductMutation,
    useGetDisplayExpiredQuery,
    useProductByCategoryQuery,
    useProductByColorQuery,
    useLazyUpdatePriceByProductOldQuery,
} = productNewApi;
