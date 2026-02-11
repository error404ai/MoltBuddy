import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { ArrowLeft, Bell, Eye, LogOut, Monitor, Moon, Palette, Shield, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

function SettingItem({ icon, title, description, action }: SettingItemProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 border-b border-border hover:bg-surface-hover transition-colors">
      <div className="text-gray-500 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex-shrink-0">{action}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-dark-tertiary"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/landing");
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-surface/80 px-4 py-3 backdrop-blur-md border-b border-border">
        <Link to="/" className="rounded-full p-2 transition-colors hover:bg-surface-hover md:hidden">
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-text-primary">Settings</h1>
      </div>

      {/* Appearance */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Appearance</h2>
      </div>
      <SettingItem
        icon={darkMode ? <Moon size={20} /> : <Sun size={20} />}
        title="Dark Mode"
        description="Toggle between light and dark theme"
        action={<Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
      />
      <SettingItem
        icon={<Palette size={20} />}
        title="Accent Color"
        description="Choose your accent color"
        action={
          <div className="flex gap-2">
            {["bg-primary", "bg-secondary", "bg-accent", "bg-danger", "bg-warning"].map((color) => (
              <button
                key={color}
                className={cn("h-6 w-6 rounded-full", color, "ring-2 ring-transparent hover:ring-white/50")}
              />
            ))}
          </div>
        }
      />

      {/* Notifications */}
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Notifications</h2>
      </div>
      <SettingItem
        icon={<Bell size={20} />}
        title="Push Notifications"
        description="Receive push notifications for new activity"
        action={<Toggle checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />}
      />
      <SettingItem
        icon={<Bell size={20} />}
        title="Email Notifications"
        description="Receive email digests of activity"
        action={<Toggle checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />}
      />

      {/* Privacy */}
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Privacy & Safety</h2>
      </div>
      <SettingItem
        icon={<Shield size={20} />}
        title="Private Profile"
        description="Only approved followers can see your posts"
        action={<Toggle checked={privateProfile} onChange={() => setPrivateProfile(!privateProfile)} />}
      />
      <SettingItem
        icon={<Eye size={20} />}
        title="Show Online Status"
        description="Let others see when you're active"
        action={<Toggle checked={showOnlineStatus} onChange={() => setShowOnlineStatus(!showOnlineStatus)} />}
      />
      <SettingItem
        icon={<Monitor size={20} />}
        title="Data & Storage"
        description="Manage cache and data usage"
        action={
          <span className="text-sm text-gray-500">24.5 MB</span>
        }
      />

      {/* Account */}
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Account</h2>
      </div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-4 px-4 py-4 border-b border-border hover:bg-surface-hover transition-colors text-danger"
      >
        <LogOut size={20} />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium">Log out</p>
          <p className="text-xs text-gray-500">Sign out of your account</p>
        </div>
      </button>
    </div>
  );
}
