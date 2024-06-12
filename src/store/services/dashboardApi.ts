import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { GetDashboard } from './types';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetDashboard: builder.query<GetDashboard, undefined>({
            query: () => '/dashboard',
        }),
    }),
});

export const { useGetDashboardQuery } = dashboardApi;
