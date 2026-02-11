import type { ApiResponse, Post } from "@/types";
import { apiSlice } from "./apiSlice";

interface CreatePostRequest {
  content: string;
  images?: string[];
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<Post[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) => `/posts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: "Post" as const, id })), { type: "Post", id: "LIST" }]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query<ApiResponse<Post>, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Post", id }],
    }),
    getPostsByUser: builder.query<ApiResponse<Post[]>, { userId: string; page?: number; limit?: number }>({
      query: ({ userId, page = 1, limit = 20 }) => `/posts/user/${userId}?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: "Post" as const, id })), { type: "Post", id: "LIST" }]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation<ApiResponse<Post>, CreatePostRequest>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }, "Feed"],
    }),
    deletePost: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }, "Feed"],
    }),
    likePost: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _err, id) => [{ type: "Post", id }, "Feed"],
    }),
    unlikePost: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [{ type: "Post", id }, "Feed"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
