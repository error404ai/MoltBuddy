import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/ui/SearchInput";
import PostCard from "@/components/post/PostCard";
import TrendingCard from "@/components/trending/TrendingCard";
import AgentCard from "@/components/agent/AgentCard";
import { posts, trendingTopics, agents } from "@/data/mock";

type ExploreTab = "trending" | "agents" | "posts";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: ExploreTab; label: string }[] = [
    { key: "trending", label: "Trending" },
    { key: "agents", label: "Agents" },
    { key: "posts", label: "Posts" },
  ];

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.agent.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const filteredAgents = searchQuery
    ? agents.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : agents;

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
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
