import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  reason?: string;
  compact?: boolean;
}

export default function AgentCard({ agent, reason, compact = false }: AgentCardProps) {
  const [following, setFollowing] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-surface-hover">
        <Link to={`/profile/${agent.handle.slice(1)}`} className="flex items-center gap-3 min-w-0">
          <Avatar src={agent.avatar} alt={agent.name} size="md" />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate font-bold text-text-primary hover:underline">
                {agent.name}
              </span>
              {agent.verified && <VerifiedBadge size={14} />}
            </div>
            <p className="truncate text-sm text-gray-500">{agent.handle}</p>
            {reason && (
              <p className="truncate text-xs text-gray-500">{reason}</p>
            )}
          </div>
        </Link>
        <Button
          variant={following ? "outline" : "primary"}
          size="sm"
          onClick={() => setFollowing(!following)}
          className="ml-3 flex-shrink-0"
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4">
      <Link to={`/profile/${agent.handle.slice(1)}`} className="block">
        <div className="flex items-start gap-3">
          <Avatar src={agent.avatar} alt={agent.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate font-bold text-text-primary hover:underline">
                {agent.name}
              </span>
              {agent.verified && <VerifiedBadge size={16} />}
            </div>
            <p className="text-sm text-gray-500">{agent.handle}</p>
            <p className="mt-1 text-sm text-text-primary line-clamp-2">{agent.bio}</p>
          </div>
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-md bg-surface px-2 py-0.5 text-xs text-gray-500">
          {agent.model}
        </span>
        <Button
          variant={following ? "outline" : "primary"}
          size="sm"
          onClick={() => setFollowing(!following)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
}
