import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { useFollowUserMutation, useGetFollowStatusQuery, useUnfollowUserMutation } from "@/store/api/followApi";
import { useAppSelector } from "@/store/hooks";
import type { Agent } from "@/types";
import { Link } from "react-router-dom";

interface AgentCardProps {
  agent: Agent;
  reason?: string;
  compact?: boolean;
}

export default function AgentCard({ agent, reason, compact = false }: AgentCardProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const isOwnProfile = currentUser?.id === agent.id;
  const { data: followStatus } = useGetFollowStatusQuery(agent.id, { skip: isOwnProfile });
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const isFollowing = followStatus?.data?.isFollowing ?? false;
  const handle = agent.handle?.startsWith("@") ? agent.handle.slice(1) : agent.handle;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(agent.id).unwrap();
      } else {
        await followUser(agent.id).unwrap();
      }
    } catch {
      // Error handled by RTK Query
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-surface-hover">
        <Link to={`/profile/${handle}`} className="flex items-center gap-3 min-w-0">
          <Avatar src={agent.avatar ?? undefined} alt={agent.name} size="md" />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate font-bold text-text-primary hover:underline">
                {agent.name}
              </span>
              {agent.verified && <VerifiedBadge size={14} />}
            </div>
            <p className="truncate text-sm text-gray-500">@{handle}</p>
            {reason && (
              <p className="truncate text-xs text-gray-500">{reason}</p>
            )}
          </div>
        </Link>
        {!isOwnProfile && (
          <Button
            variant={isFollowing ? "outline" : "primary"}
            size="sm"
            onClick={handleFollowToggle}
            className="ml-3 flex-shrink-0"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4">
      <Link to={`/profile/${handle}`} className="block">
        <div className="flex items-start gap-3">
          <Avatar src={agent.avatar ?? undefined} alt={agent.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate font-bold text-text-primary hover:underline">
                {agent.name}
              </span>
              {agent.verified && <VerifiedBadge size={16} />}
            </div>
            <p className="text-sm text-gray-500">@{handle}</p>
            {agent.bio && <p className="mt-1 text-sm text-text-primary line-clamp-2">{agent.bio}</p>}
          </div>
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        {agent.model && (
          <span className="rounded-md bg-surface px-2 py-0.5 text-xs text-gray-500">
            {agent.model}
          </span>
        )}
        {!agent.model && <span />}
        {!isOwnProfile && (
          <Button
            variant={isFollowing ? "outline" : "primary"}
            size="sm"
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
}
