import dynamic from 'next/dynamic';
import Footer from "@/components/common/Footer";
import MobileMenu from "@/components/navigation/MobileMenu";
import ShellClient from "./ShellClient";
import { SidebarProvider } from "@/components/navigation/SidebarContext";
import SidebarToggle from "@/components/navigation/SidebarToggle";

const Topbar = dynamic(() => import("@/components/navigation/Topbar"), { ssr: true });
const Sidebar = dynamic(() => import("@/components/navigation/Sidebar"), { ssr: true });
const BottomNavbar = dynamic(() => import("@/components/navigation/BottomNavbar"), { ssr: true });

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellClient>
        <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
            Skip to main content
          </a>

          {/* Sidebar - fixed left */}
          <aside className="hidden lg:flex lg:flex-col lg:shrink-0 lg:border-r lg:border-slate-200 dark:lg:border-slate-800 lg:bg-white dark:lg:bg-slate-900" style={{ width: 'var(--sidebar-width, 18rem)' }}>
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                <SidebarToggle />
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <Sidebar />
              </div>
            </div>
          </aside>

          {/* Right area: Navbar + Content */}
          <div className="flex flex-1 flex-col h-full overflow-hidden">
            {/* Navbar - fixed top */}
            <header className="h-14 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Topbar />
            </header>

            {/* Scrollable content area */}
            <main id="main-content" className="flex-1 overflow-y-auto custom-scrollbar outline-none" tabIndex={-1}>
              {children}
            </main>

            <Footer />
            <BottomNavbar />
          </div>
        </div>
      </ShellClient>
    </SidebarProvider>
  );
}
