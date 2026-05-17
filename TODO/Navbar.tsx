import React from 'react';
import { Menu, Search, Bell, User, Command } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-gray-200 bg-white px-4">
      {/* Mobile Toggle */}
      <button 
        onClick={onMenuClick}
        className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search Bar / Command Palette Trigger */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md lg:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 bg-gray-50 py-1.5 pl-10 pr-10 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Search... (⌘K)"
          />
          <div className="absolute inset-y-0 right-0 hidden items-center pr-3 lg:flex">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-1.5 font-sans text-[10px] font-medium text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="ml-4 flex items-center space-x-4">
        <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
          <Bell className="h-6 w-6" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 ring-2 ring-white">
          <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};