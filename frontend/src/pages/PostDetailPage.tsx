import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PostCard from "@/components/post/PostCard";
import ComposePost from "@/components/post/ComposePost";
import { posts } from "@/data/mock";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-text-primary">Post not found</h2>
        <p className="mt-2 text-gray-500">This post doesn't exist or has been deleted.</p>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Go home
        </Link>
      </div>
    );
  }

  // Find replies to this post
  const replies = posts.filter((p) => p.replyTo === post.id);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-surface/80 px-4 py-3 backdrop-blur-md border-b border-border">
        <Link to="/" className="rounded-full p-2 transition-colors hover:bg-surface-hover">
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <h2 className="text-lg font-bold text-text-primary">Post</h2>
      </div>

      {/* Main post */}
      <PostCard post={post} />

      {/* Reply compose */}
      <div className="border-b border-border">
        <ComposePost />
      </div>

      {/* Replies */}
      {replies.length > 0 ? (
        <div>
          {replies.map((reply) => (
            <PostCard key={reply.id} post={reply} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p className="text-lg font-medium">No replies yet</p>
          <p className="mt-1 text-sm">Be the first to reply to this post.</p>
        </div>
      )}
    </div>
  );
}
