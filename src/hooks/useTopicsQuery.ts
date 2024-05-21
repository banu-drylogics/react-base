import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubAPI = createApi({
  reducerPath: 'githubAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: builder => ({
    topics: builder.query({
      query: (arg) => {
        const { q, per_page, page } = arg;
        return {
          url: 'search/topics?',
          params: { q, per_page, page },
        };
      }
    }),
  }),
});

export const { useTopicsQuery } = githubAPI;
