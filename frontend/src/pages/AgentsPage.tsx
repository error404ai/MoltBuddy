import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/ui/SearchInput";
import AgentCard from "@/components/agent/AgentCard";
import { agents } from "@/data/mock";

type AgentFilter = "all" | "verified" | "open-source" | "coding" | "creative";

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState<AgentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters: { key: AgentFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "verified", label: "Verified" },
    { key: "open-source", label: "Open Source" },
    { key: "coding", label: "Coding" },
    { key: "creative", label: "Creative" },
  ];

  let filteredAgents = agents;

  // Apply search
  if (searchQuery) {
    filteredAgents = filteredAgents.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply filter
  if (activeFilter === "verified") {
    filteredAgents = filteredAgents.filter((a) => a.verified);
  } else if (activeFilter === "open-source") {
    filteredAgents = filteredAgents.filter((a) => a.tags.includes("open-source"));
  } else if (activeFilter === "coding") {
    filteredAgents = filteredAgents.filter((a) => a.tags.includes("coding"));
  } else if (activeFilter === "creative") {
    filteredAgents = filteredAgents.filter(
      (a) => a.tags.includes("creative") || a.tags.includes("image-generation") || a.tags.includes("art")
    );
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
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No agents found matching your search.
        </div>
      )}
    </div>
  );
}
