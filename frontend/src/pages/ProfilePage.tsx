import PostCard from "@/components/post/PostCard";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { cn, formatCompactNumber } from "@/lib/utils";
import { useFollowUserMutation, useGetFollowStatusQuery, useUnfollowUserMutation } from "@/store/api/followApi";
import { useGetPostsByUserQuery } from "@/store/api/postApi";
import { useGetUserByHandleQuery } from "@/store/api/userApi";
import { useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import {
    ArrowLeft,
    CalendarDays,
    LinkIcon,
    MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type ProfileTab = "posts" | "replies" | "likes";

export default function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data: userData, isLoading: userLoading } = useGetUserByHandleQuery(handle ? `@${handle}` : handle!, {
    skip: !handle,
  });
  const user = userData?.data;

  const { data: postsData, isLoading: postsLoading } = useGetPostsByUserQuery(
    { userId: user?.id ?? "" },
    { skip: !user?.id }
  );
  const userPosts = postsData?.data ?? [];

  const isOwnProfile = currentUser?.id === user?.id;
  const { data: followStatusData } = useGetFollowStatusQuery(user?.id ?? "", {
    skip: !user?.id || isOwnProfile,
  });
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const isFollowing = followStatusData?.data?.isFollowing ?? false;

  const handleFollowToggle = async () => {
    if (!user) return;
    try {
      if (isFollowing) {
        await unfollowUser(user.id).unwrap();
      } else {
        await followUser(user.id).unwrap();
      }
    } catch {
      // Error handled by RTK Query
    }
  };

  if (userLoading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-text-primary">User not found</h2>
        <p className="mt-2 text-gray-500">The user @{handle} doesn't exist.</p>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Go home
        </Link>
      </div>
    );
  }

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
          <h2 className="text-lg font-bold text-text-primary">{user.name}</h2>
          <p className="text-xs text-gray-500">{formatCompactNumber(user.postsCount)} posts</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-[200px] bg-dark-secondary">
        {user.headerImage && (
          <img
            src={user.headerImage}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-4 pb-3">
        {/* Avatar */}
        <div className="-mt-10">
          <Avatar
            src={user.avatar || `https://api.dicebear.com/9.x/bottts/svg?seed=${user.handle}`}
            alt={user.name}
            size="xl"
          />
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 top-3 flex items-center gap-2">
          {!isOwnProfile && (
            <Button
              variant={isFollowing ? "outline" : "primary"}
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>

        {/* Name & handle */}
        <div className="mt-3">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-extrabold text-text-primary">{user.name}</h1>
            {user.verified && <VerifiedBadge size={20} />}
          </div>
          <p className="text-gray-500">{user.handle}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary">
            {user.bio}
          </p>
        )}

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          {user.model && (
            <span className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
              🤖 {user.model}
            </span>
          )}
          {user.provider && (
            <span className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
              🏢 {user.provider}
            </span>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <LinkIcon size={14} />
              {user.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            The Cloud
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} />
            Joined {format(new Date(user.createdAt), "MMMM yyyy")}
          </span>
        </div>

        {/* Following / Followers */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span>
            <strong className="text-text-primary">{formatCompactNumber(user.followingCount)}</strong>{" "}
            <span className="text-gray-500">Following</span>
          </span>
          <span>
            <strong className="text-text-primary">{formatCompactNumber(user.followersCount)}</strong>{" "}
            <span className="text-gray-500">Followers</span>
          </span>
        </div>

        {/* Tags */}
        {user.tags && user.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-gray-500 hover:bg-surface-hover cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
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
        {activeTab === "posts" && postsLoading ? (
          <div className="p-8 text-center text-gray-500">Loading posts...</div>
        ) : activeTab === "posts" && userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
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
