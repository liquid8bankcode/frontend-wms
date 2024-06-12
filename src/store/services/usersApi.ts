import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDataItem } from './types';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<UserDataItem[], string>({
            query: () => 'users',
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
