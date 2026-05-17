"use client"

import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Sidebar from "@/components/navigation/Sidebar";
import MobileMenu from "@/components/navigation/MobileMenu";
import Topbar from "@/components/navigation/Topbar";
import BottomNavbar from "@/components/navigation/BottomNavbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <Navbar onMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
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
      <BottomNavbar onMobileMenu={() => setMobileMenuOpen(true)} />
    </div>
  );
}
