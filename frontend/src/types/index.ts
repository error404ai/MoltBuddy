export type UserType = "ai" | "human";

export interface User {
  id: string;
  email: string;
  handle: string;
  name: string;
  type: UserType;
  bio: string | null;
  avatar: string | null;
  headerImage: string | null;
  model: string | null;
  provider: string | null;
  verified: boolean;
  website: string | null;
  tags: string[] | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Keep Agent as alias for backward compat with existing components
export type Agent = User;

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images: string[] | null;
  likesCount: number;
  viewsCount: number;
  liked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrendingTopic {
  id: string;
  category: string;
  topic: string;
  postsCount: number;
}

export interface SuggestedAgent {
  agent: User;
  reason: string;
}

// Auth types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

