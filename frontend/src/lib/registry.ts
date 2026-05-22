export type Control = { id: string; label: string; type: 'text' | 'boolean' | 'color'; value: any };

export interface AnatomyPart {
  selector: string;
  description: string;
}

export interface A11yChecklistItem {
  criteria: string;
  status: 'pass' | 'fail' | 'na';
}

export interface BestPractice {
  do: string;
  dont?: string;
}

export interface RecipeStep {
  title: string;
  description: string;
  code?: string;
}

export interface ComponentRegistryItem {
  id: string;
  name: string;
  category: string;
  tsx: string;
  css: string;
  controls: Control[];
  dependencies: string[];
  metadata: { responsive: string; darkMode: string; complexity: string };
  anatomy: AnatomyPart[];
  accessibility: A11yChecklistItem[];
  bestPractices: BestPractice[];
  recipes: RecipeStep[];
}

export const DEFAULT_TSX = `function App({ title = "Live Sandbox", buttonText = "Clicked", showIcon = true, accentColor = "#4f46e5" }) {
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

export const DEFAULT_CSS = `/* Custom Tailwind or Plain CSS here */
@keyframes pulse-custom {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
`;

export const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
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
    metadata: { responsive: 'Fully', darkMode: 'Ready', complexity: 'Entry' },
    anatomy: [
      { selector: '.container', description: 'Outermost wrapper with padding, max-width, and rounded corners' },
      { selector: '.icon-wrapper', description: 'Optional icon container with accent background and shadow' },
      { selector: '.title', description: 'Component heading text' },
      { selector: '.subtitle', description: 'Helper text below the title indicating runtime status' },
      { selector: '.description', description: 'Body copy explaining interactive behavior' },
      { selector: '.cta-button', description: 'Call-to-action button with count state and hover arrow' }
    ],
    accessibility: [
      { criteria: 'Button has accessible name via buttonText prop', status: 'pass' },
      { criteria: 'Color contrast ratio meets WCAG AA (accent on white)', status: 'pass' },
      { criteria: 'Interactive elements are keyboard focusable', status: 'pass' },
      { criteria: 'Icons have aria-hidden or screen-reader text', status: 'na' },
      { criteria: 'Live region announces count changes', status: 'fail' }
    ],
    bestPractices: [
      { do: 'Use semantic HTML — button element instead of div with onClick', dont: 'Do not use div elements for interactive controls' },
      { do: 'Provide default prop values so the component renders in isolation', dont: 'Do not require consumers to pass every prop' },
      { do: 'Wrap icon in a container with accessible label', dont: 'Do not omit alt text or aria-label on decorative elements' }
    ],
    recipes: [
      {
        title: 'Customize Branding',
        description: 'Change accentColor, title, and buttonText props to match your brand.',
        code: '<App accentColor="#059669" title="Get Started" buttonText="Sign Up" />'
      },
      {
        title: 'Add Click Tracking',
        description: 'Wrap the button onClick to fire an analytics event alongside the counter.',
        code: 'const handleClick = () => { trackEvent("cta_click"); setCount(c => c + 1); };'
      },
      {
        title: 'Dark Mode Forcing',
        description: 'Remove dark: classes and set background explicitly via style prop.',
        code: '<div style={{ background: "#0f172a", color: "#f8fafc" }}>...</div>'
      }
    ]
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
    metadata: { responsive: 'Fully', darkMode: 'Dark Only', complexity: 'Beginner' },
    anatomy: [
      { selector: '.container', description: 'Full-height centered wrapper with dark background' },
      { selector: '.glow-button', description: 'Button element with dynamic glow box-shadow and text shadow' }
    ],
    accessibility: [
      { criteria: 'Button text is configurable and readable', status: 'pass' },
      { criteria: 'Focus indicator visible on keyboard navigation', status: 'fail' },
      { criteria: 'Color is not the sole means of conveying state', status: 'pass' },
      { criteria: 'Sufficient contrast ratio between text and background', status: 'pass' },
      { criteria: 'Button has a visible focus ring', status: 'fail' }
    ],
    bestPractices: [
      { do: 'Use box-shadow with alpha channel for glow effect — performant and GPU-accelerated', dont: 'Do not use filter: blur() for glow; it causes layout repaints' },
      { do: 'Keep the dark background for neon glow to pop', dont: 'Do not use on light backgrounds — contrast will fail' },
      { do: 'Add a transition on box-shadow for smooth hover/active states', dont: 'Do not animate box-shadow on every frame — use transition only' }
    ],
    recipes: [
      {
        title: 'Change Glow Intensity',
        description: 'Adjust the alpha values in box-shadow to make the glow subtler or stronger.',
        code: 'boxShadow: `0 0 10px ${color}44, 0 0 30px ${color}22`'
      },
      {
        title: 'Add Hover Scale',
        description: 'Combine the glow with a scale transform on hover for extra feedback.',
        code: 'className="... hover:scale-105 active:scale-95 transition-transform"'
      },
      {
        title: 'Multiple Glow Colors',
        description: 'Use a gradient or two separate shadows with different colors.',
        code: 'boxShadow: `0 0 20px #00f2ff66, 0 0 40px #f200ff33`'
      }
    ]
  }
];

export function getAllCategories(): string[] {
  return [...new Set(COMPONENT_REGISTRY.map(item => item.category))];
}
