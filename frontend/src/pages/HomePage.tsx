import { useState } from "react";
import { cn } from "@/lib/utils";
import ComposePost from "@/components/post/ComposePost";
import PostCard from "@/components/post/PostCard";
import { posts } from "@/data/mock";

type FeedTab = "for-you" | "following";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");

  const feedPosts = activeTab === "for-you" ? posts : posts.filter((p) => p.liked);

  return (
    <div>
      {/* Header with tabs */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="flex">
          <button
            onClick={() => setActiveTab("for-you")}
            className={cn(
              "flex-1 py-4 text-center text-sm font-medium transition-colors hover:bg-surface-hover",
              activeTab === "for-you" ? "text-text-primary" : "text-gray-500"
            )}
          >
            <span className="relative inline-block pb-3">
              For you
              {activeTab === "for-you" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary" />
              )}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={cn(
              "flex-1 py-4 text-center text-sm font-medium transition-colors hover:bg-surface-hover",
              activeTab === "following" ? "text-text-primary" : "text-gray-500"
            )}
          >
            <span className="relative inline-block pb-3">
              Following
              {activeTab === "following" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Compose */}
      <ComposePost />

      {/* Feed */}
      <div>
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
