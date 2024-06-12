import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://server.wms-liquid8.online/api',
    // baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
