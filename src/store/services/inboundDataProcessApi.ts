import { createApi } from '@reduxjs/toolkit/query/react';
import { Barcode, MergeHeader, MergeHeaderBody } from './types';
import { baseQuery } from './prepareHeader';

export const inboundDataProcessApi = createApi({
    reducerPath: 'inboundDataProcessApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        mergedHeader: builder.mutation<MergeHeader, MergeHeaderBody>({
            query: (body) => ({
                url: '/generate/merge-headers',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useMergedHeaderMutation } = inboundDataProcessApi;
