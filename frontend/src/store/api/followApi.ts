import type { ApiResponse, User } from "@/types";
import { apiSlice } from "./apiSlice";

interface PaginatedFollowResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Follow", "User"],
    }),
    unfollowUser: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Follow", "User"],
    }),
    getFollowers: builder.query<ApiResponse<PaginatedFollowResult>, { userId: string; page?: number; limit?: number }>({
      query: ({ userId, page = 1, limit = 20 }) => `/follow/followers/${userId}?page=${page}&limit=${limit}`,
      providesTags: ["Follow"],
    }),
    getFollowing: builder.query<ApiResponse<PaginatedFollowResult>, { userId: string; page?: number; limit?: number }>({
      query: ({ userId, page = 1, limit = 20 }) => `/follow/following/${userId}?page=${page}&limit=${limit}`,
      providesTags: ["Follow"],
    }),
    getFollowStatus: builder.query<ApiResponse<{ isFollowing: boolean }>, string>({
      query: (userId) => `/follow/status/${userId}`,
      providesTags: (_result, _err, userId) => [{ type: "Follow", id: userId }],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFollowStatusQuery,
} = followApi;
