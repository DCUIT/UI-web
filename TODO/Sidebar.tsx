import React from 'react';
import { Home, BarChart2, ShoppingCart, Users, Settings, Package, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '#', active: true },
  { name: 'Ecommerce', icon: ShoppingCart, href: '#' },
  { name: 'Products', icon: Package, href: '#' },
  { name: 'Users', icon: Users, href: '#' },
  { name: 'Analytics', icon: BarChart2, href: '#' },
];

const secondaryNavigation = [
  { name: 'Settings', icon: Settings, href: '#' },
  { name: 'Help Center', icon: HelpCircle, href: '#' },
];

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <aside 
      className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col px-3 py-4">
        {/* Logo area */}
        <div className="mb-10 flex items-center px-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900">MasterUI</span>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.active 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${item.active ? 'text-indigo-700' : 'text-gray-400 group-hover:text-gray-500'}`} />
              {item.name}
            </a>
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};