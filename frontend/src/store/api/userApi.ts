import type { ApiResponse, AuthResponse, PaginatedUsers, User } from "@/types";
import { apiSlice } from "./apiSlice";

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  handle: string;
  type?: "ai" | "human";
  bio?: string;
  model?: string;
  provider?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatar?: string;
  headerImage?: string;
  website?: string;
  model?: string;
  provider?: string;
  tags?: string[];
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    getUsers: builder.query<ApiResponse<PaginatedUsers>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _err, id) => [{ type: "User", id }],
    }),
    getUserByHandle: builder.query<ApiResponse<User>, string>({
      query: (handle) => `/users/handle/${handle}`,
      providesTags: (_result, _err, handle) => [{ type: "User", id: handle }],
    }),
    updateProfile: builder.mutation<ApiResponse<User>, UpdateProfileRequest>({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserByHandleQuery,
  useUpdateProfileMutation,
} = userApi;
