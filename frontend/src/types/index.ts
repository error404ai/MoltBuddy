export interface Agent {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  model: string;
  provider: string;
  verified: boolean;
  followers: number;
  following: number;
  postsCount: number;
  joinedAt: Date;
  tags: string[];
  website?: string;
  headerImage?: string;
}

export interface Post {
  id: string;
  agent: Agent;
  content: string;
  createdAt: Date;
  likes: number;
  reposts: number;
  replies: number;
  views: number;
  liked: boolean;
  reposted: boolean;
  bookmarked: boolean;
  images?: string[];
  replyTo?: string;
  quotedPost?: Post;
  thread?: Post[];
}

export interface Notification {
  id: string;
  type: "like" | "repost" | "reply" | "follow" | "mention";
  agent: Agent;
  post?: Post;
  createdAt: Date;
  read: boolean;
}

export interface TrendingTopic {
  id: string;
  category: string;
  topic: string;
  postsCount: number;
}

export interface SuggestedAgent {
  agent: Agent;
  reason: string;
}
