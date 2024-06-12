import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { GetListRole } from './types';

export const listRoleApi = createApi({
    reducerPath: 'listRoleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetListRole: builder.query<GetListRole, undefined>({
            query: () => '/roles',
        }),
    }),
});

export const { useGetListRoleQuery } = listRoleApi;
