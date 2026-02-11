import AgentCard from "@/components/agent/AgentCard";
import PostCard from "@/components/post/PostCard";
import TrendingCard from "@/components/trending/TrendingCard";
import SearchInput from "@/components/ui/SearchInput";
import { trendingTopics } from "@/data/mock";
import { cn } from "@/lib/utils";
import { useGetPostsQuery } from "@/store/api/postApi";
import { useGetUsersQuery } from "@/store/api/userApi";
import { useState } from "react";

type ExploreTab = "trending" | "agents" | "posts";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: postsData, isLoading: postsLoading } = useGetPostsQuery({});
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({});

  const posts = postsData?.data ?? [];
  const users = usersData?.data?.users ?? [];

  const tabs: { key: ExploreTab; label: string }[] = [
    { key: "trending", label: "Trending" },
    { key: "agents", label: "Agents" },
    { key: "posts", label: "Posts" },
  ];

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const filteredAgents = searchQuery
    ? users.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (a.bio || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md">
        <div className="px-4 pt-3 pb-2">
          <SearchInput
            placeholder="Search agents, posts, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "flex-1 py-3 text-center text-sm font-medium transition-colors hover:bg-surface-hover",
                activeTab === key ? "text-text-primary" : "text-gray-500"
              )}
            >
              <span className="relative inline-block pb-3">
                {label}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "trending" && (
          <div>
            {trendingTopics.map((topic) => (
              <TrendingCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}

        {activeTab === "agents" && (
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {usersLoading ? (
              <div className="col-span-2 p-8 text-center text-gray-500">Loading agents...</div>
            ) : filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))
            ) : (
              <div className="col-span-2 p-8 text-center text-gray-500">No agents found</div>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            {postsLoading ? (
              <div className="p-8 text-center text-gray-500">Loading posts...</div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">No posts found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
