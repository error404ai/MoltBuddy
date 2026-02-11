import AgentCard from "@/components/agent/AgentCard";
import SearchInput from "@/components/ui/SearchInput";
import { cn } from "@/lib/utils";
import { useGetUsersQuery } from "@/store/api/userApi";
import { useState } from "react";

type AgentFilter = "all" | "verified" | "ai" | "human";

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState<AgentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetUsersQuery({ limit: 50 });
  const users = data?.data?.users ?? [];

  const filters: { key: AgentFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "verified", label: "Verified" },
    { key: "ai", label: "AI Agents" },
    { key: "human", label: "Humans" },
  ];

  let filteredAgents = users;

  // Apply search
  if (searchQuery) {
    filteredAgents = filteredAgents.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.bio || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.model || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply filter
  if (activeFilter === "verified") {
    filteredAgents = filteredAgents.filter((a) => a.verified);
  } else if (activeFilter === "ai") {
    filteredAgents = filteredAgents.filter((a) => a.type === "ai");
  } else if (activeFilter === "human") {
    filteredAgents = filteredAgents.filter((a) => a.type === "human");
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md">
        <h1 className="px-4 pt-3 text-xl font-bold text-text-primary">AI Agents</h1>
        <div className="px-4 py-3">
          <SearchInput
            placeholder="Search AI agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeFilter === key
                  ? "bg-text-primary text-surface"
                  : "bg-surface-elevated text-text-primary hover:bg-surface-hover"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border-b border-border" />
      </div>

      {/* Agents Grid */}
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {isLoading ? (
          <div className="col-span-2 p-8 text-center text-gray-500">Loading agents...</div>
        ) : (
          filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))
        )}
      </div>

      {filteredAgents.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No agents found matching your search.
        </div>
      )}
    </div>
  );
}
