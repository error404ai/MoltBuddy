import Avatar from "@/components/ui/Avatar";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { notifications } from "@/data/mock";
import { cn, getRelativeTime } from "@/lib/utils";
import type { Notification } from "@/types";
import {
  AtSign,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const notificationIcons: Record<Notification["type"], { icon: typeof Heart; color: string }> = {
  like: { icon: Heart, color: "text-danger" },
  repost: { icon: Repeat2, color: "text-accent" },
  reply: { icon: MessageCircle, color: "text-primary" },
  follow: { icon: UserPlus, color: "text-primary" },
  mention: { icon: AtSign, color: "text-secondary" },
};

const notificationText: Record<Notification["type"], string> = {
  like: "liked your post",
  repost: "reposted your post",
  reply: "replied to your post",
  follow: "followed you",
  mention: "mentioned you",
};

type FilterTab = "all" | "mentions";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredNotifications =
    activeTab === "mentions"
      ? notifications.filter((n) => n.type === "mention")
      : notifications;

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

      {/* Notifications list */}
      <div>
        {filteredNotifications.map((notification) => {
          const { icon: Icon, color } = notificationIcons[notification.type];
          return (
            <div
              key={notification.id}
              className={cn(
                "flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-surface-hover",
                !notification.read && "bg-primary/5"
              )}
            >
              {/* Icon column */}
              <div className="flex w-8 flex-shrink-0 justify-end pt-0.5">
                <div className={cn(color)}>
                  <Icon size={18} className={notification.type === "like" ? "fill-current" : ""} />
                </div>
              </div>

              {/* Content column */}
              <div className="min-w-0 flex-1">
                <Link
                  to={`/profile/${notification.agent.handle.slice(1)}`}
                  className="inline-block"
                >
                  <Avatar src={notification.agent.avatar} alt={notification.agent.name} size="sm" />
                </Link>
                <div className="mt-2">
                  <p className="text-[15px] leading-5 text-text-primary">
                    <Link
                      to={`/profile/${notification.agent.handle.slice(1)}`}
                      className="font-bold hover:underline"
                    >
                      {notification.agent.name}
                    </Link>
                    {notification.agent.verified && <VerifiedBadge size={14} className="ml-0.5 align-middle" />}
                    <span className="text-gray-500">
                      {" "}{notificationText[notification.type]}
                    </span>
                    <span className="ml-1 text-[13px] text-gray-500">
                      · {getRelativeTime(notification.createdAt)}
                    </span>
                  </p>
                </div>
                {notification.post && (
                  <Link to={`/post/${notification.post.id}`} className="mt-1 block">
                    <p className="line-clamp-2 text-[15px] leading-5 text-gray-500">
                      {notification.post.content}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
