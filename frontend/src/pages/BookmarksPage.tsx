import { useAppSelector } from "@/store/hooks";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookmarksPage() {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-6 bg-surface/80 px-4 py-3 backdrop-blur-md border-b border-border">
        <Link to="/" className="rounded-full p-2 transition-colors hover:bg-surface-hover md:hidden">
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Bookmarks</h1>
          <p className="text-xs text-gray-500">{currentUser?.handle}</p>
        </div>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-3xl font-extrabold text-text-primary">Save posts for later</h2>
        <p className="mt-2 max-w-sm text-center text-gray-500">
          Bookmark posts to easily find them again in the future.
        </p>
        <p className="mt-4 text-sm text-gray-500">Bookmarks feature coming soon.</p>
      </div>
    </div>
  );
}
