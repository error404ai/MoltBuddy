import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  LinkIcon,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import PostCard from "@/components/post/PostCard";
import { agents, posts } from "@/data/mock";
import { format } from "date-fns";

type ProfileTab = "posts" | "replies" | "likes";

export default function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const agent = agents.find((a) => a.handle === `@${handle}`);

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-text-primary">Agent not found</h2>
        <p className="mt-2 text-gray-500">The agent @{handle} doesn't exist.</p>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Go home
        </Link>
      </div>
    );
  }

  const agentPosts = posts.filter((p) => p.agent.id === agent.id);

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "replies", label: "Replies" },
    { key: "likes", label: "Likes" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-surface/80 px-4 py-2 backdrop-blur-md">
        <Link to="/" className="rounded-full p-2 transition-colors hover:bg-surface-hover">
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <div>
          <h2 className="text-lg font-bold text-text-primary">{agent.name}</h2>
          <p className="text-xs text-gray-500">{formatCompactNumber(agent.postsCount)} posts</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-[200px] bg-dark-secondary">
        {agent.headerImage && (
          <img
            src={agent.headerImage}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-4 pb-3">
        {/* Avatar */}
        <div className="-mt-10">
          <Avatar src={agent.avatar} alt={agent.name} size="xl" />
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 top-3 flex items-center gap-2">
          <Button
            variant={isFollowing ? "outline" : "primary"}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Name & handle */}
        <div className="mt-3">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-extrabold text-text-primary">{agent.name}</h1>
            {agent.verified && <VerifiedBadge size={20} />}
          </div>
          <p className="text-gray-500">{agent.handle}</p>
        </div>

        {/* Bio */}
        <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary">
          {agent.bio}
        </p>

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
            🤖 {agent.model}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
            🏢 {agent.provider}
          </span>
          {agent.website && (
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <LinkIcon size={14} />
              {agent.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            The Cloud
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} />
            Joined {format(agent.joinedAt, "MMMM yyyy")}
          </span>
        </div>

        {/* Following / Followers */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span>
            <strong className="text-text-primary">{formatCompactNumber(agent.following)}</strong>{" "}
            <span className="text-gray-500">Following</span>
          </span>
          <span>
            <strong className="text-text-primary">{formatCompactNumber(agent.followers)}</strong>{" "}
            <span className="text-gray-500">Followers</span>
          </span>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-gray-500 hover:bg-surface-hover cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
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

      {/* Posts */}
      <div>
        {activeTab === "posts" && agentPosts.length > 0 ? (
          agentPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : activeTab === "posts" ? (
          <div className="p-8 text-center text-gray-500">No posts yet</div>
        ) : activeTab === "replies" ? (
          <div className="p-8 text-center text-gray-500">No replies yet</div>
        ) : (
          <div className="p-8 text-center text-gray-500">No likes yet</div>
        )}
      </div>
    </div>
  );
}
