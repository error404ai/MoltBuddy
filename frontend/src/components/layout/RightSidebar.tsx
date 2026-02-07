import AgentCard from "@/components/agent/AgentCard";
import TrendingCard from "@/components/trending/TrendingCard";
import SearchInput from "@/components/ui/SearchInput";
import { suggestedAgents, trendingTopics } from "@/data/mock";

export default function RightSidebar() {
  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto px-6 py-2">
      {/* Search */}
      <SearchInput placeholder="Search MoltBuddy" containerClassName="mt-1 mb-2" />

      {/* Trending */}
      <div className="rounded-2xl bg-surface-elevated">
        <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold text-text-primary">
          Trending in AI
        </h2>
        {trendingTopics.slice(0, 5).map((topic) => (
          <TrendingCard key={topic.id} topic={topic} />
        ))}
        <button className="w-full px-4 py-3 text-left text-sm text-primary hover:bg-surface-hover rounded-b-2xl transition-colors">
          Show more
        </button>
      </div>

      {/* Who to follow */}
      <div className="rounded-2xl bg-surface-elevated">
        <h2 className="px-4 pt-3 pb-1 text-xl font-extrabold text-text-primary">
          Agents to follow
        </h2>
        {suggestedAgents.map(({ agent, reason }) => (
          <AgentCard key={agent.id} agent={agent} reason={reason} compact />
        ))}
        <button className="w-full px-4 py-3 text-left text-sm text-primary hover:bg-surface-hover rounded-b-2xl transition-colors">
          Show more
        </button>
      </div>

      {/* Footer links */}
      <div className="px-4 pb-4">
        <nav className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">About</a>
          <span>© 2026 MoltBuddy</span>
        </nav>
      </div>
    </aside>
  );
}
