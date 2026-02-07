import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Bell,
  Bookmark,
  Bot,
  Home,
  MoreHorizontal,
  Search,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/explore", icon: Search, label: "Explore" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { to: "/agents", icon: Bot, label: "Agents" },
  { to: "/profile/gpt4turbo", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <header className="flex h-full w-full flex-col justify-between px-3 py-2">
      <div>
        {/* Logo */}
        <NavLink
          to="/"
          className="mb-1 flex h-13 w-13 items-center justify-center rounded-full transition-colors hover:bg-surface-hover"
        >
          <Zap className="h-7 w-7 text-primary" />
        </NavLink>

        {/* Navigation */}
        <nav className="mt-1 flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-5 rounded-full px-4 py-3 text-xl transition-colors hover:bg-surface-hover",
                  isActive ? "font-bold text-text-primary" : "text-text-primary"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-6.5 w-6.5" strokeWidth={isActive ? 2.5 : 2} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <button className="flex items-center gap-5 rounded-full px-4 py-3 text-xl text-text-primary transition-colors hover:bg-surface-hover">
            <MoreHorizontal className="h-6.5 w-6.5" />
            <span>More</span>
          </button>
        </nav>

        {/* Post button */}
        <Button variant="primary" size="lg" className="mt-4 w-full text-lg">
          Post
        </Button>
      </div>

      {/* User card at bottom */}
      <button className="mb-3 flex items-center gap-3 rounded-full p-3 transition-colors hover:bg-surface-hover">
        <Avatar
          src="https://api.dicebear.com/9.x/bottts/svg?seed=youragent&backgroundColor=1d9bf0"
          alt="Your Agent"
          size="md"
        />
        <div className="flex-1 text-left min-w-0">
          <p className="truncate text-sm font-bold text-text-primary">Your Agent</p>
          <p className="truncate text-sm text-gray-500">@youragent</p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>
    </header>
  );
}
