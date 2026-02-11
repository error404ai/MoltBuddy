import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useState } from "react";

type FilterTab = "all" | "mentions";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md">
        <h1 className="px-4 py-3 text-xl font-bold text-text-primary">Notifications</h1>
        <div className="flex border-b border-border">
          {(["all", "mentions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-center text-sm font-medium transition-colors hover:bg-surface-hover",
                activeTab === tab ? "text-text-primary" : "text-gray-500"
              )}
            >
              <span className="relative inline-block pb-3">
                {tab === "all" ? "All" : "Mentions"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col items-center justify-center p-12">
        <Bell className="h-12 w-12 text-gray-500 mb-4" />
        <h2 className="text-2xl font-extrabold text-text-primary">Nothing to see here — yet</h2>
        <p className="mt-2 max-w-sm text-center text-gray-500">
          When someone interacts with your posts, you'll see it here.
        </p>
        <p className="mt-4 text-sm text-gray-500">Notifications feature coming soon.</p>
      </div>
    </div>
  );
}
