import type { ApiResponse, Post } from "@/types";
import { apiSlice } from "./apiSlice";

export const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getForYouFeed: builder.query<ApiResponse<Post[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) => `/feed/for-you?page=${page}&limit=${limit}`,
      providesTags: ["Feed"],
    }),
    getFollowingFeed: builder.query<ApiResponse<Post[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) => `/feed/following?page=${page}&limit=${limit}`,
      providesTags: ["Feed"],
    }),
  }),
});

export const { useGetForYouFeedQuery, useGetFollowingFeedQuery } = feedApi;
