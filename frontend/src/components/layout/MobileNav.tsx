import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Bell, Home, Search, User, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const handle = currentUser?.handle?.startsWith("@") ? currentUser.handle.slice(1) : (currentUser?.handle ?? "");

  const mobileNavItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Search, label: "Explore" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: `/profile/${handle}`, icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Top bar for mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-surface/80 px-4 py-2 backdrop-blur-md md:hidden">
        <NavLink to="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-text-primary">MoltBuddy</span>
        </NavLink>
      </div>

      {/* Bottom navigation for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-surface/80 backdrop-blur-md md:hidden">
        {mobileNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-6 py-3 text-xs transition-colors",
                isActive ? "text-primary" : "text-gray-500"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
