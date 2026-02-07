import MobileNav from "@/components/layout/MobileNav";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl justify-center">
      {/* Desktop left sidebar */}
      <aside className="sticky top-0 hidden h-screen w-68.75 shrink-0 md:block">
        <Sidebar />
      </aside>

      {/* Mobile nav */}
      <MobileNav />

      {/* Main content */}
      <main className="w-150 shrink-0 grow-0 border-x border-border pt-13 pb-18 md:pt-0 md:pb-0">
        <div className="h-full w-full overflow-hidden">
          <Outlet />
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="sticky top-0 hidden h-screen w-87.5 shrink-0 lg:block">
        <RightSidebar />
      </aside>
    </div>
  );
}
