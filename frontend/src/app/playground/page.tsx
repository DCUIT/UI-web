'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { Code2, Layout, Terminal, FileCode, Check, Copy, Monitor, Smartphone, RotateCcw, Sliders, Type, ToggleLeft, Palette, RefreshCw, Info, Package, Zap, ShieldCheck, Search, ChevronRight, Save, Share2 } from 'lucide-react';
import * as Babel from '@babel/standalone';
import Editor from '@monaco-editor/react';

const DEFAULT_TSX = `function App({ title = "Live Sandbox", buttonText = "Clicked", showIcon = true, accentColor = "#4f46e5" }) {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="p-8 max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:scale-[1.02]">
      <div className="flex items-center gap-4 mb-6">
        {showIcon && (
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-white"
            style={{ backgroundColor: accentColor, boxShadow: \`0 10px 15px -3px \${accentColor}33\` }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Babel Runtime Active</p>
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
        Thử thay đổi nội dung trong tab <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono" style={{ color: accentColor }}>TSX</span> để thấy kết quả cập nhật ngay lập tức.
      </p>
      
      <button 
        onClick={() => setCount(c => c + 1)}
        className="w-full py-4 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group"
        style={{ backgroundColor: accentColor, boxShadow: \`0 10px 15px -3px \${accentColor}40\` }}
      >
        {buttonText} {count} times
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
}
`;

const DEFAULT_CSS = `/* Custom Tailwind or Plain CSS here */
@keyframes pulse-custom {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
`;

type Device = 'desktop' | 'mobile';
type Orientation = 'portrait' | 'landscape';
type LogEntry = { type: 'log' | 'error'; content: string; timestamp: string };
type Control = { id: string; label: string; type: 'text' | 'boolean' | 'color'; value: any };

interface ComponentRegistryItem {
  id: string;
  name: string;
  category: string;
  tsx: string;
  css: string;
  controls: Control[];
  dependencies: string[];
  metadata: { responsive: string; darkMode: string; complexity: string };
}

const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
  {
    id: 'default-sandbox',
    name: 'Default Sandbox',
    category: 'Feedback',
    tsx: DEFAULT_TSX,
    css: DEFAULT_CSS,
    controls: [
      { id: 'title', label: 'Title Text', type: 'text', value: 'Live Sandbox' },
      { id: 'buttonText', label: 'Button Label', type: 'text', value: 'Clicked' },
      { id: 'showIcon', label: 'Show Icon', type: 'boolean', value: true },
      { id: 'accentColor', label: 'Accent Color', type: 'color', value: '#4f46e5' },
    ],
    dependencies: ['lucide-react', 'framer-motion', 'clsx'],
    metadata: { responsive: 'Fully', darkMode: 'Ready', complexity: 'Entry' }
  },
  {
    id: 'neon-button',
    name: 'Neon Glow Button',
    category: 'Buttons',
    tsx: `function App({ text = "Neon Glow", color = "#00f2ff" }) {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-slate-950 p-10 rounded-2xl">
      <button 
        className="px-10 py-5 rounded-full font-black text-white transition-all duration-300 active:scale-95 uppercase tracking-widest text-sm"
        style={{ 
          backgroundColor: color,
          boxShadow: \`0 0 20px \${color}66, 0 0 40px \${color}33\`,
          textShadow: '0 0 8px rgba(0,0,0,0.3)'
        }}
      >
        {text}
      </button>
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'text', label: 'Button Text', type: 'text', value: 'Neon Glow' },
      { id: 'color', label: 'Glow Color', type: 'color', value: '#00f2ff' }
    ],
    dependencies: ['clsx'],
    metadata: { responsive: 'Fully', darkMode: 'Dark Only', complexity: 'Beginner' }
  },
  {
    id: 'mobile-dashboard',
    name: 'Mobile Dashboard',
    category: 'Screens',
    tsx: `function App({ userName = "Alex Rivera", balance = "$12,450.00" }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">AR</div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Welcome back</p>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{userName}</h2>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center relative">
          <div className="w-2 h-2 bg-rose-500 rounded-full absolute top-2 right-2 border-2 border-white dark:border-slate-900"></div>
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </div>
      </div>

      {/* Main Card */}
      <div className="px-6">
        <div className="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <p className="text-xs font-medium text-indigo-100 opacity-80 mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold mb-6">{balance}</h3>
          <div className="flex gap-4">
            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md py-3 rounded-2xl text-xs font-bold transition-all">Send</button>
            <button className="flex-1 bg-white text-indigo-600 py-3 rounded-2xl text-xs font-bold transition-all">Receive</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 grid grid-cols-4 gap-4">
        {[ { n: 'Bills', c: 'bg-emerald-100 text-emerald-600' }, { n: 'Trade', c: 'bg-amber-100 text-amber-600' }, { n: 'Vault', c: 'bg-rose-100 text-rose-600' }, { n: 'More', c: 'bg-slate-100 text-slate-600' } ].map(item => (
          <div key={item.n} className="flex flex-col items-center gap-2">
            <div className={\`w-12 h-12 rounded-2xl \${item.c} flex items-center justify-center\`}>
              <div className="w-5 h-5 border-2 border-current rounded-md"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{item.n}</span>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 shadow-inner border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h4>
          <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { n: 'Netflix Subscription', d: '24 May 2024', a: '-$15.99', i: 'bg-slate-100' },
            { n: 'Salary Deposit', d: '22 May 2024', a: '+$4,250.00', i: 'bg-emerald-100 text-emerald-600' },
            { n: 'Apple Store', d: '20 May 2024', a: '-$199.00', i: 'bg-slate-100' }
          ].map((t, idx) => (
            <div key={idx} className="flex justify-between items-center p-2">
              <div className="flex items-center gap-3">
                <div className={\`w-10 h-10 rounded-xl \${t.i} flex items-center justify-center text-xs font-bold\`}>
                  {t.n.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t.n}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{t.d}</p>
                </div>
              </div>
              <p className={\`text-xs font-bold \${t.a.startsWith('+') ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}\`}>{t.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'userName', label: 'User Name', type: 'text', value: 'Alex Rivera' },
      { id: 'balance', label: 'Balance Amount', type: 'text', value: '$12,450.00' }
    ],
    dependencies: ['lucide-react', 'clsx'],
    metadata: { responsive: 'Mobile-First', darkMode: 'Ready', complexity: 'Advanced' }
  },
  {
    id: 'mobile-ecommerce-page',
    name: 'E-commerce Product Page',
    category: 'Screens',
    tsx: `function App({ 
  productName = "Nike Air Max 270", 
  price = "$150.00", 
  rating = 4.8, 
  reviews = "124",
  description = "The Nike Air Max 270 delivers visible cushioning under every step. Updated for modern comfort, it nods to the original 1991 Air Max 180." 
}) {
  const [selectedSize, setSelectedSize] = React.useState('42');
  const sizes = ['40', '41', '42', '43', '44', '45'];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans pb-24">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
        <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center shadow-sm text-rose-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>

      {/* Product Image Gallery (Simulated) */}
      <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl absolute -bottom-10 -right-10"></div>
        <div className="relative z-0 scale-125 rotate-[-15deg] drop-shadow-2xl">
           <div className="w-48 h-24 bg-indigo-600 rounded-full opacity-20 blur-xl absolute bottom-0 left-1/2 -translate-x-1/2"></div>
           <svg className="w-64 h-64 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z"/><path d="M3 12v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>
        </div>
        <div className="absolute bottom-6 flex gap-2">
          {[0,1,2].map(i => <div key={i} className={\`w-2 h-2 rounded-full \${i === 0 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}\`}></div>)}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">{productName}</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400 font-bold text-xs items-center">
                ★ <span className="ml-1 text-slate-900 dark:text-white">{rating}</span>
              </div>
              <span className="text-xs text-slate-400">({reviews} Reviews)</span>
            </div>
          </div>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{price}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Select Size</h3>
            <button className="text-xs text-slate-400 underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={\`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all \${selectedSize === size ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800'}\`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Description</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <button className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </button>
        <button className="flex-1 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'productName', label: 'Product Name', type: 'text', value: 'Nike Air Max 270' },
      { id: 'price', label: 'Price', type: 'text', value: '$150.00' },
      { id: 'rating', label: 'Rating (0-5)', type: 'text', value: '4.8' },
      { id: 'description', label: 'Description', type: 'text', value: 'The Nike Air Max 270 delivers visible cushioning under every step.' }
    ],
    dependencies: ['lucide-react', 'clsx'],
    metadata: { responsive: 'Mobile-First', darkMode: 'Ready', complexity: 'Advanced' }
  },
  {
    id: 'mobile-login-screen',
    name: 'Mobile Login Screen',
    category: 'Screens',
    tsx: `function App({ title = "Welcome Back", subtitle = "Please enter your details", buttonText = "Sign In", showSocial = true }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-6 flex flex-col justify-center">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-2xl">M</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
          <input type="email" placeholder="name@example.com" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
      </div>
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all">{buttonText}</button>
      {showSocial && (
        <div className="mt-8 flex gap-4">
          <button className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold dark:text-white">Google</button>
          <button className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold dark:text-white">Apple</button>
        </div>
      )}
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'title', label: 'Title', type: 'text', value: 'Welcome Back' },
      { id: 'subtitle', label: 'Subtitle', type: 'text', value: 'Please enter your details' },
      { id: 'buttonText', label: 'Button Label', type: 'text', value: 'Sign In' },
      { id: 'showSocial', label: 'Social Login', type: 'boolean', value: true }
    ],
    dependencies: ['lucide-react'],
    metadata: { responsive: 'Mobile-First', darkMode: 'Ready', complexity: 'Intermediate' }
  },
  {
    id: 'mobile-chat-interface',
    name: 'Mobile Chat Interface',
    category: 'Screens',
    tsx: `function App({ chatName = "Sarah Jenkins", status = "Online", showAvatars = true }) {
  const messages = [
    { id: 1, text: "Hey! How is the new design coming along?", sender: "other", time: "09:41 AM" },
    { id: 2, text: "It's looking great! Just finished the playground section. 🚀", sender: "me", time: "09:42 AM" },
    { id: 3, text: "Awesome! Can you send a screenshot?", sender: "other", time: "09:43 AM" }
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Chat Header */}
      <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 sticky top-0 z-10">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">SJ</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{chatName}</h2>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">{status}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={\`flex \${m.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2\`}>
            {m.sender === 'other' && showAvatars && (
               <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
            )}
            <div className={\`max-w-[75%] space-y-1\`}>
              <div className={\`px-4 py-2.5 rounded-2xl text-sm \${
                m.sender === 'me' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-500/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none shadow-sm'
              }\`}>
                {m.text}
              </div>
              <p className={\`text-[9px] font-bold text-slate-400 px-1 \${m.sender === 'me' ? 'text-right' : 'text-left'}\`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white"
          />
        </div>
        <button className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg active:scale-90 transition-all">
          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  );
}`,
    css: '',
    controls: [
      { id: 'chatName', label: 'Contact Name', type: 'text', value: 'Sarah Jenkins' },
      { id: 'status', label: 'Status', type: 'text', value: 'Online' },
      { id: 'showAvatars', label: 'Show Avatars', type: 'boolean', value: true }
    ],
    dependencies: ['lucide-react', 'clsx'],
    metadata: { responsive: 'Mobile-First', darkMode: 'Ready', complexity: 'Intermediate' }
  }
];

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentRegistryItem>(COMPONENT_REGISTRY[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tsxCode, setTsxCode] = useState(DEFAULT_TSX);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [device, setDevice] = useState<Device>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [srcDoc, setSrcDoc] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Mẫu controls khởi tạo cho component mặc định
  const [controls, setControls] = useState<Control[]>(COMPONENT_REGISTRY[0].controls);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 1. Load shared state or drafts on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('share');

    if (sharedData) {
      try {
        // Giải mã Base64 an toàn cho Unicode
        const decoded = JSON.parse(decodeURIComponent(escape(window.atob(sharedData))));
        const comp = COMPONENT_REGISTRY.find(c => c.id === decoded.componentId) || COMPONENT_REGISTRY[0];

        setSelectedComponent(comp);
        setTsxCode(decoded.tsx);
        setCssCode(decoded.css);
        setControls(decoded.controls);

        // Xóa query param để URL sạch sẽ sau khi load
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } catch (e) {
        console.error("Failed to decode shared playground data", e);
      }
    }

    const savedDraft = localStorage.getItem('ui-platform-playground-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        const comp = COMPONENT_REGISTRY.find(c => c.id === parsed.componentId) || COMPONENT_REGISTRY[0];

        setSelectedComponent(comp);
        setTsxCode(parsed.tsx || comp.tsx);
        setCssCode(parsed.css || comp.css);
        setControls(parsed.controls || comp.controls);
      } catch (e) {
        console.error("Failed to parse playground draft", e);
      }
    }
  }, []);

  // 2. Auto-save drafts on change
  useEffect(() => {
    setIsSaving(true);
    const draft = {
      tsx: tsxCode,
      css: cssCode,
      controls: controls,
      componentId: selectedComponent.id
    };
    localStorage.setItem('ui-platform-playground-draft', JSON.stringify(draft));
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [tsxCode, cssCode, controls, selectedComponent.id]);

  // Hàm tải linh kiện mới
  const loadComponent = (component: ComponentRegistryItem) => {
    setSelectedComponent(component);
    setTsxCode(component.tsx);
    setCssCode(component.css);
    setControls(component.controls);
    setLogs([]); // Clear logs khi đổi component
  };

  // Filter linh kiện dựa trên search
  const filteredRegistry = useMemo(() => {
    return COMPONENT_REGISTRY.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Theme sync với class trên html/body (đang do next-themes quản lý)
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    // Thông báo cho iframe nếu cần (trong srcDoc script đã tự xử lý cơ bản qua class dark)
  }, [theme]);

  const deviceDims = useMemo(() => {
    if (device === 'desktop') return { w: 900, h: 600 };
    // mobile frame
    return orientation === 'portrait'
      ? { w: 390, h: 740 }
      : { w: 740, h: 390 };
  }, [device, orientation]);

  // Logic biên dịch và cập nhật Sandbox
  const updateSandbox = () => {
    try {
      // Biên dịch code TSX sang JS (ES5) dùng Babel Standalone
      const result = Babel.transform(tsxCode, {
        presets: ['react', 'typescript'],
        filename: 'playground.tsx',
      });

      const compiledCode = result.code;

      // Chuyển mảng controls thành object props
      const currentProps = controls.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.value }), {});
      const propsJson = JSON.stringify(currentProps);

      const doc = `
        <!DOCTYPE html>
        <html class="${theme}">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = { darkMode: 'class' };
            </script>
            <style>
              ${cssCode}
              body { margin: 0; padding: 0; background-color: transparent; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script>
              // Capture console
              const originalLog = console.log;
              const originalError = console.error;
              const send = (type, args) => {
                window.parent.postMessage({ 
                  type: 'sandbox-log', 
                  logType: type, 
                  data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') 
                }, '*');
              };

              console.log = (...args) => { send('log', args); originalLog(...args); };
              console.error = (...args) => { send('error', args); originalError(...args); };
              window.onerror = (msg) => { send('error', [msg]); };

              try {
                ${compiledCode}
                const root = ReactDOM.createRoot(document.getElementById('root'));
                if (typeof App !== 'undefined') {
                  const props = ${propsJson};
                  root.render(React.createElement(App, props));
                } else {
                  console.error("Function 'App' is missing. Please define 'function App() { ... }'");
                }
              } catch (err) {
                console.error(err.message);
              }
            </script>
          </body>
        </html>
      `;
      setSrcDoc(doc);
    } catch (err: any) {
      // Lỗi biên dịch (syntax error)
      setLogs(prev => [{
        type: 'error',
        content: \`Compiler Error: \${err.message}\`, 
        timestamp: new Date().toLocaleTimeString() 
      }, ...prev].slice(0, 20));
    }
  };

  // Debounce re-render 800ms
  useEffect(() => {
    const timer = setTimeout(updateSandbox, 800);
    return () => clearTimeout(timer);
  }, [tsxCode, cssCode, theme, controls]);

  const tabs = useMemo(
    () =>
      [
        {
          value: 'preview',
          label: <span className="flex items-center gap-2"><Monitor className="w-4 h-4" /> Preview</span>,
          content: (
            <div className="flex h-full min-h-[500px] flex-col items-center justify-start overflow-auto bg-slate-50/50 p-4 dark:bg-slate-900/50">
              <div className="relative rounded-[2.5rem] border-[8px] border-slate-800 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 transition-all duration-300 overflow-hidden" 
                   style={{ width: deviceDims.w, height: deviceDims.h }}>
                
                <iframe
                  ref={iframeRef}
                  srcDoc={srcDoc}
                  className="h-full w-full bg-transparent"
                  title="Playground Preview"
                  sandbox="allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
                />

                  {/* Phone frame bezel */}
              </div>
            </div>
          ),
        },
        {
          value: 'tsx',
          label: <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> TSX</span>,
          content: (
            <div className="h-full">
              <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  path="playground.tsx"
                  value={tsxCode}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  onChange={(val) => setTsxCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Sử dụng Babel để biên dịch code trực tiếp.</p>
            </div>
          ),
        },
        {
          value: 'css',
          label: <span className="flex items-center gap-2"><Layout className="w-4 h-4" /> CSS</span>,
          content: (
            <div className="h-full">
              <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
                <Editor
                  height="100%"
                  defaultLanguage="css"
                  path="style.css"
                  value={cssCode}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  onChange={(val) => setCssCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          ),
        },
        {
          value: 'usage',
          label: <span className="flex items-center gap-2"><FileCode className="w-4 h-4" /> Usage</span>,
          content: (
            <div className="h-full rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                {\`// Example Usage for \${selectedComponent.name}
import \${selectedComponent.name.replace(/\s+/g, '')} from '@/components/\${selectedComponent.id}';

export default function Page() {
  return (
    <\${selectedComponent.name.replace(/\s+/g, '')}
\${controls.map(c => {
  const val = typeof c.value === 'string' ? \`"\${c.value}"\` : \`{\${c.value}}\`;
  return \`      \${c.id}=\${val}\`;
}).join('\\n')}
    />
  );
}\`}
              </pre>
            </div>
          ),
        },
      ] as const,
    [tsxCode, cssCode, device, orientation, deviceDims.w, deviceDims.h, srcDoc, controls, selectedComponent]
  );

  // Lắng nghe message từ sandbox
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sandbox-log') {
        setLogs(prev => [{
          type: event.data.logType,
          content: event.data.data,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev].slice(0, 20));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const copyFullComponent = async () => {
    const content = `/** TSX **/\n${ tsxCode } \n\n/** CSS **/\n${ cssCode } `;
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const sharePlayground = async () => {
    const data = {
      tsx: tsxCode,
      css: cssCode,
      controls: controls,
      componentId: selectedComponent.id
    };
    // Mã hóa Base64 an toàn cho Unicode
    const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const shareUrl = `${ window.location.origin }${ window.location.pathname }?share = ${ encoded } `;
    
    await navigator.clipboard.writeText(shareUrl);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const updateControl = (id: string, value: any) => {
    setControls(prev => prev.map(c => c.id === id ? { ...c, value } : c));
  };

  const resetControls = () => {
    setControls(selectedComponent.controls);
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Playground</p>
            {isSaving && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 animate-pulse">
                <Save className="w-3 h-3" /> SAVED
              </span>
            )}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Playground / Sandbox Page</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Runtime Sandbox Ready: Code được biên dịch trực tiếp bằng Babel và render trong IFrame riêng biệt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={sharePlayground}
            className="gap-2 rounded-xl"
          >
            {isShared ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            {isShared ? 'Link Copied!' : 'Share'}
          </Button>
          <ThemeToggle />
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">Device</span>
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`rounded - lg px - 2 py - 1 text - xs font - bold transition ${ device === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' } `}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`rounded - lg px - 2 py - 1 text - xs font - bold transition ${ device === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' } `}
            >
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">Orientation</span>
            <button
              type="button"
              onClick={() => setOrientation('portrait')}
              className={`rounded - lg px - 2 py - 1 text - xs font - bold transition ${ orientation === 'portrait' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' } `}
            >
              Portrait
            </button>
            <button
              type="button"
              onClick={() => setOrientation('landscape')}
              className={`rounded - lg px - 2 py - 1 text - xs font - bold transition ${ orientation === 'landscape' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' } `}
            >
              Landscape
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left controls */}
        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          {/* Component Search & Selection */}
          <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>
            
            {searchTerm && (
              <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 z-20">
                {filteredRegistry.length > 0 ? (
                  filteredRegistry.map(comp => (
                    <button
                      key={comp.id}
                      onClick={() => {
                        loadComponent(comp);
                        setSearchTerm('');
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b last:border-0 border-slate-50 dark:border-slate-900"
                    >
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white">{comp.name}</p>
                        <p className="text-[9px] text-slate-400 uppercase">{comp.category}</p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                    </button>
                  ))
                ) : (
                  <p className="p-3 text-[10px] text-slate-400 text-center italic">No components found</p>
                )}
              </div>
            )}
          </div>

          {/* Metadata & Dependencies */}
          <div className="space-y-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Component Info</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Category</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{selectedComponent.category}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Responsive</p>
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {selectedComponent.metadata.responsive}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dark Mode</p>
                  <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {selectedComponent.metadata.darkMode}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Complexity</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{selectedComponent.metadata.complexity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-indigo-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Dependencies</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedComponent.dependencies.map(dep => (
                  <span key={dep} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {dep}
                  </span>
                ))}
              </div>
              <button 
                onClick={async () => {
                  await navigator.clipboard.writeText(`npm install ${ selectedComponent.dependencies.join(' ') } `);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 text-white text-[10px] font-bold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-950"
              >
                <Copy className="w-3 h-3" /> Copy Install Command
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Component Props</p>
              </div>
              <button 
                onClick={resetControls}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                title="Reset Controls"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {controls.map((control) => (
                <div key={control.id} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1 flex items-center gap-1.5">
                    {control.type === 'text' && <Type className="w-3 h-3" />}
                    {control.type === 'color' && <Palette className="w-3 h-3" />}
                    {control.type === 'boolean' && <ToggleLeft className="w-3 h-3" />}
                    {control.label}
                  </label>
                  
                  {control.type === 'text' ? (
                    <input 
                      type="text"
                      value={control.value}
                      onChange={(e) => updateControl(control.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  ) : control.type === 'color' ? (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text"
                          value={control.value}
                          onChange={(e) => updateControl(control.id, e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                        />
                        <div 
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: control.value }}
                        />
                      </div>
                      <input 
                        type="color"
                        value={control.value}
                        onChange={(e) => updateControl(control.id, e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded-lg border-none bg-transparent"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => updateControl(control.id, !control.value)}
                      className={`flex h - 8 w - full items - center justify - between rounded - xl border px - 3 transition - all ${ control.value ? 'border-indigo-500/50 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300' : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900' } `}
                    >
                      <span className="text-[10px] font-bold">{control.value ? 'ENABLED' : 'DISABLED'}</span>
                      <div className={`h - 4 w - 4 rounded - full transition - all ${ control.value ? 'translate-x-0 bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600' } `} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Copy</p>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await navigator.clipboard.writeText(tsxCode);
              }}
              className="w-full justify-start gap-2"
            >
              <Code2 className="w-4 h-4" />
              Copy TSX
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={copyFullComponent}
              className="w-full justify-start gap-2"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied All!' : 'Copy full component'}
            </Button>
          </div>

          <div className="flex flex-col h-[300px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Console</span>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 font-mono text-[11px] space-y-1">
              {logs.length === 0 && (
                <p className="text-slate-400 italic text-center mt-4">No logs yet...</p>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className={`p - 1.5 rounded border - l - 2 ${ log.type === 'error' ? 'bg-red-50 text-red-600 border-red-500 dark:bg-red-950/20' : 'bg-slate-100 text-slate-700 border-slate-400 dark:bg-slate-800 dark:text-slate-300' } `}>
                  <div className="flex justify-between items-center opacity-60 mb-0.5">
                    <span className="font-bold uppercase text-[9px]">{log.type}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-wrap break-words">{log.content}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <Tabs items={tabs as any} />
        </div>
      </div>
    </section>
  );
}
  