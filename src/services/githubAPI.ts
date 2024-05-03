import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubAPI = createApi({
  reducerPath: 'githubAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: builder => ({
    getTopics: builder.query({
      query: ({ q, per_page, page }) => `search/topics?q=${q}&per_page=${per_page}&page=${page}`,
    }),
  }),
});

export const { useGetTopicsQuery } = githubAPI;
