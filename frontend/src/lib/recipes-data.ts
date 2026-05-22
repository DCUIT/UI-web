export interface RecipeIngredient {
  name: string;
  description: string;
  code: string;
}

export interface RecipeStep {
  title: string;
  description: string;
  code?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  finalCode: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'complete-modal',
    title: 'Complete Modal',
    description: 'A production-ready modal built from Portal + Overlay + Focus Trap + Animation.',
    difficulty: 'Intermediate',
    ingredients: [
      {
        name: 'Portal',
        description: 'Renders the modal outside the DOM hierarchy to avoid z-index and overflow issues.',
        code: `import { createPortal } from 'react-dom';

function Modal({ children, open }) {
  if (!open) return null;
  return createPortal(
    <div>{children}</div>,
    document.body
  );
}`,
      },
      {
        name: 'Overlay',
        description: 'A semi-transparent backdrop that prevents interaction with the page behind.',
        code: `<div
  className="fixed inset-0 bg-black/50 z-40"
  onClick={onClose}
/>`,
      },
      {
        name: 'Focus Trap',
        description: 'Keeps keyboard focus inside the modal for accessibility.',
        code: `// Simplified focus trap
React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    // Tab cycle logic
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);`,
      },
      {
        name: 'Animation',
        description: 'Smooth enter/exit transitions using Framer Motion.',
        code: `<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>`,
      },
    ],
    steps: [
      {
        title: 'Create Portal',
        description: 'Use createPortal to render the modal at the document body level.',
      },
      {
        title: 'Add Overlay Backdrop',
        description: 'A fixed full-screen div with semi-transparent background. Click closes the modal.',
        code: '<div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />',
      },
      {
        title: 'Build Modal Panel',
        description: 'The actual dialog panel with padding, rounded corners, and shadow.',
        code: `<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
    <h2 className="text-lg font-bold">{title}</h2>
    {children}
  </div>
</div>`,
      },
      {
        title: 'Add Focus Trap & Escape',
        description: 'Listen for Escape key and trap Tab focus inside the modal.',
      },
      {
        title: 'Add Animation',
        description: 'Wrap with AnimatePresence and use motion.div for enter/exit transitions.',
      },
    ],
    finalCode: `function CompleteModal({ open, onClose, title, children }) {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}`,
  },
  {
    id: 'accessible-dropdown',
    title: 'Accessible Dropdown',
    description: 'A dropdown combining Click Outside detection + Positioning + Animation.',
    difficulty: 'Intermediate',
    ingredients: [
      {
        name: 'Click Outside',
        description: 'Detects clicks outside the dropdown to close it automatically.',
        code: `React.useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick);
}, []);`,
      },
      {
        name: 'Positioning',
        description: 'Absolute positioning relative to the trigger button.',
        code: `<div className="relative">
  <button ref={triggerRef} onClick={toggle}>
    {label}
  </button>
  {open && (
    <div className="absolute top-full right-0 mt-1 z-50">
      {/* Dropdown items */}
    </div>
  )}
</div>`,
      },
      {
        name: 'Animation',
        description: 'Smooth open/close with Framer Motion.',
        code: `<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    >
      {/* Menu */}
    </motion.div>
  )}
</AnimatePresence>`,
      },
    ],
    steps: [
      {
        title: 'Set up relative container',
        description: 'Wrap the trigger button and dropdown menu in a relative-positioned div.',
      },
      {
        title: 'Add Click Outside handler',
        description: 'Use a ref and mousedown event listener to close when clicking outside.',
      },
      {
        title: 'Position the menu',
        description: 'Use absolute positioning below the trigger with z-index for layering.',
      },
      {
        title: 'Add keyboard navigation',
        description: 'Support ArrowUp/Down for item navigation, Enter for selection, Escape to close.',
      },
    ],
    finalCode: `function AccessibleDropdown({ label, items, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium flex items-center gap-2">
        {label}
        <ChevronDown className={\`w-4 h-4 transition \${open ? 'rotate-180' : ''}\`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full right-0 mt-1 w-48 rounded-xl border border-slate-200 bg-white shadow-xl z-50 py-1"
          >
            {items.map((item, i) => (
              <button key={i} onClick={() => { onSelect(item); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors">
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`,
  },
  {
    id: 'animated-tabs',
    title: 'Animated Tabs',
    description: 'Tabs combining state management + layout animation + accessibility (ARIA).',
    difficulty: 'Beginner',
    ingredients: [
      {
        name: 'State Management',
        description: 'Track the active tab index/value.',
        code: `const [activeTab, setActiveTab] = React.useState(0);`,
      },
      {
        name: 'Layout Animation',
        description: 'Animate the active indicator and content transitions.',
        code: `<motion.div layoutId="tab-indicator"
  className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
/>`,
      },
      {
        name: 'ARIA Attributes',
        description: 'Proper role, aria-selected, aria-controls, and tabpanel for accessibility.',
        code: `<button role="tab" aria-selected={isActive}
  aria-controls={panelId}
  id={tabId}>
  {label}
</button>
<div role="tabpanel" aria-labelledby={tabId}>
  {content}
</div>`,
      },
    ],
    steps: [
      {
        title: 'Set up tab state',
        description: 'Use useState to track the selected tab index.',
      },
      {
        title: 'Build tab buttons',
        description: 'Render a row of buttons with proper ARIA roles and event handlers.',
      },
      {
        title: 'Add animated indicator',
        description: 'Use framer-motion layoutId to create a smooth sliding indicator.',
      },
      {
        title: 'Animate content switch',
        description: 'Wrap tab content in AnimatePresence with AnimatePresence mode="wait".',
      },
    ],
    finalCode: `function AnimatedTabs({ tabs }) {
  const [active, setActive] = React.useState(0);

  return (
    <div>
      <div className="relative flex border-b border-slate-200">
        {tabs.map((tab, i) => (
          <button key={i} role="tab" aria-selected={active === i}
            aria-controls={\`panel-\${i}\`} id={\`tab-\${i}\`}
            onClick={() => setActive(i)}
            className={\`px-4 py-2 text-sm font-medium relative transition-colors \${
              active === i ? 'text-indigo-600' : 'text-slate-500'
            }\`}>
            {tab.label}
            {active === i && (
              <motion.div layoutId="indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} role="tabpanel" aria-labelledby={\`tab-\${active}\`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="py-4"
        >
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}`,
  },
];
