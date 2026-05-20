import dynamic from 'next/dynamic';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileMenu from "@/components/navigation/MobileMenu";
import ShellClient from "./ShellClient";

const Topbar = dynamic(() => import("@/components/navigation/Topbar"), { ssr: true });
const Sidebar = dynamic(() => import("@/components/navigation/Sidebar"), { ssr: true });
const BottomNavbar = dynamic(() => import("@/components/navigation/BottomNavbar"), { ssr: true });

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ShellClient>
      <div className="flex min-h-screen flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 pb-20 md:pb-0 outline-none" tabIndex={-1}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Topbar />
            <div className="mt-6 lg:flex lg:gap-8">
              <aside className="hidden lg:block lg:w-72">
                <Sidebar />
              </aside>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNavbar />
      </div>
    </ShellClient>
  );
}
