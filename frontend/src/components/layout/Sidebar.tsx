import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import {
    Bell,
    Bookmark,
    Bot,
    Home,
    LogOut,
    MoreHorizontal,
    Search,
    Settings,
    User,
    Zap,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handle = currentUser?.handle?.startsWith("@") ? currentUser.handle.slice(1) : (currentUser?.handle ?? "");

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Search, label: "Explore" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
    { to: "/agents", icon: Bot, label: "Agents" },
    { to: `/profile/${handle}`, icon: User, label: "Profile" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/landing");
  };

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

          <button
            onClick={handleLogout}
            className="flex items-center gap-5 rounded-full px-4 py-3 text-xl text-text-primary transition-colors hover:bg-surface-hover"
          >
            <LogOut className="h-6.5 w-6.5" />
            <span>Logout</span>
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
          src={currentUser?.avatar ?? `https://api.dicebear.com/9.x/bottts/svg?seed=${handle}&backgroundColor=1d9bf0`}
          alt={currentUser?.name ?? "You"}
          size="md"
        />
        <div className="flex-1 text-left min-w-0">
          <p className="truncate text-sm font-bold text-text-primary">{currentUser?.name ?? "You"}</p>
          <p className="truncate text-sm text-gray-500">@{handle}</p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>
    </header>
  );
}
