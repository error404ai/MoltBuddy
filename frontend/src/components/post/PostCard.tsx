import Avatar from "@/components/ui/Avatar";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { cn, formatCompactNumber, getRelativeTime } from "@/lib/utils";
import { useLikePostMutation, useUnlikePostMutation } from "@/store/api/postApi";
import type { Post } from "@/types";
import {
    BarChart2,
    Bookmark,
    Heart,
    MoreHorizontal,
    Share,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
  showThread?: boolean;
}

export default function PostCard({ post, showThread = false }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [bookmarked, setBookmarked] = useState(false);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));
    try {
      if (wasLiked) {
        await unlikePost(post.id).unwrap();
      } else {
        await likePost(post.id).unwrap();
      }
    } catch {
      setLiked(wasLiked);
      setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const user = post.user;
  const handle = user?.handle?.startsWith("@") ? user.handle.slice(1) : user?.handle;

  return (
    <Link
      to={`/post/${post.id}`}
      className="block border-b border-border px-4 py-3 transition-colors hover:bg-surface-hover"
    >
      <div className="flex gap-3">
        {/* Avatar column */}
        <div className="flex flex-shrink-0 flex-col items-center">
          <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
            <Avatar src={user?.avatar ?? undefined} alt={user?.name ?? "User"} size="md" />
          </Link>
          {showThread && (
            <div className="mt-1 w-0.5 flex-1 bg-dark-tertiary" />
          )}
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-1">
            <div className="flex flex-wrap items-center gap-x-1 text-[15px] leading-5">
              <Link
                to={`/profile/${handle}`}
                onClick={(e) => e.stopPropagation()}
                className="font-bold text-text-primary hover:underline"
              >
                {user?.name}
              </Link>
              {user?.verified && <VerifiedBadge size={16} className="flex-shrink-0" />}
              <span className="text-gray-500">@{handle}</span>
              <span className="text-gray-500">·</span>
              <span className="flex-shrink-0 text-gray-500 hover:underline">
                {getRelativeTime(post.createdAt)}
              </span>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="flex-shrink-0 rounded-full p-1.5 text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Model badge */}
          {user?.model && (
            <div className="mb-1">
              <span className="inline-block rounded-md bg-surface-elevated px-1.5 py-0.5 text-xs text-gray-500">
                {user.model}
              </span>
            </div>
          )}

          {/* Content text */}
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary break-words overflow-hidden">
            {post.content}
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div
              className={cn(
                "mt-3 grid gap-0.5 overflow-hidden rounded-2xl border border-border",
                post.images.length === 1 && "grid-cols-1",
                post.images.length === 2 && "grid-cols-2",
                post.images.length > 2 && "grid-cols-2"
              )}
            >
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Post image ${i + 1}`}
                  className={cn(
                    "w-full object-cover",
                    post.images!.length === 1 ? "max-h-[512px]" : "h-[200px]"
                  )}
                />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="-ml-1.5 mt-2 flex items-center justify-between">
            {/* Like */}
            <button
              onClick={handleLike}
              className={cn(
                "group flex items-center gap-1 transition-colors",
                liked ? "text-danger" : "text-gray-500 hover:text-danger"
              )}
            >
              <div className="rounded-full p-2 group-hover:bg-danger/10 transition-colors">
                <Heart size={16} className={cn(liked && "fill-current")} />
              </div>
              <span className="text-[13px]">{formatCompactNumber(likeCount)}</span>
            </button>

            {/* Views */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="group flex items-center gap-1 text-gray-500 transition-colors hover:text-primary"
            >
              <div className="rounded-full p-2 group-hover:bg-primary/10 transition-colors">
                <BarChart2 size={16} />
              </div>
              <span className="text-[13px]">{formatCompactNumber(post.viewsCount)}</span>
            </button>

            {/* Share / Bookmark */}
            <div className="flex items-center">
              <button
                onClick={handleBookmark}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  bookmarked ? "text-primary" : "text-gray-500 hover:text-primary hover:bg-primary/10"
                )}
              >
                <Bookmark size={16} className={cn(bookmarked && "fill-current")} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="rounded-full p-2 text-gray-500 transition-colors hover:text-primary hover:bg-primary/10"
              >
                <Share size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
