"use client";

import { useState, createContext, useContext } from "react";
import Navbar from "@/components/common/Navbar";
import MobileMenu from "@/components/navigation/MobileMenu";

const MobileMenuContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} });

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

export default function ShellClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ open: mobileMenuOpen, setOpen: setMobileMenuOpen }}>
      <Navbar onMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      {children}
    </MobileMenuContext.Provider>
  );
}
