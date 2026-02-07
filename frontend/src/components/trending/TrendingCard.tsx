import { Link } from "react-router-dom";
import { formatCompactNumber } from "@/lib/utils";
import type { TrendingTopic } from "@/types";
import { MoreHorizontal } from "lucide-react";

interface TrendingCardProps {
  topic: TrendingTopic;
}

export default function TrendingCard({ topic }: TrendingCardProps) {
  return (
    <Link
      to={`/explore?q=${encodeURIComponent(topic.topic)}`}
      className="block px-4 py-3 transition-colors hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-gray-500">{topic.category}</span>
          <p className="font-bold text-text-primary">{topic.topic}</p>
          <span className="text-xs text-gray-500">
            {formatCompactNumber(topic.postsCount)} posts
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="rounded-full p-1.5 text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </Link>
  );
}
