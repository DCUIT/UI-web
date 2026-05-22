export interface Pattern {
  id: string;
  title: string;
  description: string;
  category: 'auth' | 'layout' | 'form' | 'navigation' | 'feedback';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tsx: string;
  css?: string;
  dependencies: string[];
  concepts: string[];
}

export const PATTERNS: Pattern[] = [
  {
    id: 'auth-flow',
    title: 'Auth Flow',
    description: 'Complete login/signup with form validation, error handling, and loading states.',
    category: 'auth',
    difficulty: 'Intermediate',
    tsx: `function App() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))
      errs.email = 'Invalid email format';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6)
      errs.password = 'At least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-sm mx-auto mt-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {isLogin ? 'Welcome back!' : 'Account created!'}
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          {isLogin ? 'You have been signed in successfully.' : 'Check your email to verify your account.'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-sm mx-auto mt-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm bg-white dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {isLogin ? 'Enter your credentials to continue.' : 'Fill in the details to get started.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input
              type="email" value={email}
              onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
              className={\`w-full rounded-xl border px-3 py-2 text-sm outline-none transition \${
                errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
              } bg-slate-50 dark:bg-slate-800 dark:text-white\`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
            <input
              type="password" value={password}
              onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
              className={\`w-full rounded-xl border px-3 py-2 text-sm outline-none transition \${
                errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
              } bg-slate-50 dark:bg-slate-800 dark:text-white\`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}`,
    dependencies: [],
    concepts: ['Form validation with error states', 'Loading state with spinner', 'Success feedback screen', 'Toggle between login/signup'],
  },
  {
    id: 'dashboard-layout',
    title: 'Dashboard Layout',
    description: 'Responsive admin dashboard with sidebar, header, stats cards, and data table.',
    category: 'layout',
    difficulty: 'Advanced',
    tsx: `function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('overview');

  const stats = [
    { label: 'Revenue', value: '$48,250', change: '+12.5%', up: true },
    { label: 'Users', value: '2,847', change: '+8.2%', up: true },
    { label: 'Orders', value: '1,423', change: '-3.1%', up: false },
    { label: 'Growth', value: '23.6%', change: '+18.7%', up: true },
  ];

  const recentOrders = [
    { id: '#001', customer: 'Alice Johnson', product: 'Pro Plan', amount: '$299', status: 'Completed' },
    { id: '#002', customer: 'Bob Smith', product: 'Basic', amount: '$99', status: 'Pending' },
    { id: '#003', customer: 'Carol White', product: 'Enterprise', amount: '$999', status: 'Completed' },
    { id: '#004', customer: 'Dave Brown', product: 'Pro Plan', amount: '$299', status: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={\`\${sidebarOpen ? 'w-56' : 'w-16'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col shrink-0\`}>
        <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800">
          {sidebarOpen && <span className="font-bold text-sm text-slate-900 dark:text-white">Dashboard</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M11 19l-7-7 7-7" : "M13 5l7 7-7 7"} />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {['Overview', 'Analytics', 'Orders', 'Customers', 'Settings'].map(item => (
            <button key={item} onClick={() => setActiveTab(item.toLowerCase())}
              className={\`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors \${
                activeTab === item.toLowerCase() ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
              }\`}
            >
              <div className="w-2 h-2 rounded-full bg-current shrink-0" />
              {sidebarOpen && item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{s.value}</p>
                <p className={\`text-xs font-semibold mt-1 \${s.up ? 'text-emerald-500' : 'text-red-500'}\`}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Recent Orders</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id} className="border-b last:border-0 border-slate-50 dark:border-slate-800/50 text-sm">
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{o.id}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{o.customer}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{o.product}</td>
                      <td className="px-5 py-3 text-slate-900 dark:text-white font-medium">{o.amount}</td>
                      <td className="px-5 py-3">
                        <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${
                          o.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          o.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }\`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}`,
    dependencies: [],
    concepts: ['Responsive sidebar with collapsible toggle', 'Stats card grid (2x2 to 4x4)', 'Data table with status badges', 'Active nav state management'],
  },
  {
    id: 'multi-step-form',
    title: 'Multi-Step Form',
    description: 'A wizard-style form with progress indicator, step validation, and summary review.',
    category: 'form',
    difficulty: 'Intermediate',
    tsx: `function App() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;
  const [data, setData] = React.useState({ name: '', email: '', plan: 'basic', agree: false });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [done, setDone] = React.useState(false);

  const validateStep = () => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) errs.name = 'Name is required';
      if (!data.email.trim()) errs.email = 'Email is required';
    }
    if (step === 2 && !data.plan) errs.plan = 'Select a plan';
    if (step === 3 && !data.agree) errs.agree = 'You must agree to continue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, totalSteps)); };
  const prev = () => { setStep(s => Math.max(s - 1, 1)); setErrors({}); };

  const handleSubmit = () => {
    if (!validateStep()) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="p-8 max-w-md mx-auto mt-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Registration Complete!</h2>
        <p className="text-sm text-slate-500 mt-2">Welcome, {data.name}! Your {data.plan} plan is active.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto mt-10">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm bg-white dark:bg-slate-900">
        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(s => (
            <React.Fragment key={s}>
              <div className={\`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all \${
                s <= step ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }\`}>{s}</div>
              {s < totalSteps && <div className={\`flex-1 h-0.5 rounded transition-all \${s < step ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}\`} />}
            </React.Fragment>
          ))}
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {step === 1 ? 'Personal Info' : step === 2 ? 'Choose Plan' : 'Review'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">Step {step} of {totalSteps}</p>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Name</label>
              <input value={data.name} onChange={e => setData(p => ({ ...p, name: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white" />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email</label>
              <input type="email" value={data.email} onChange={e => setData(p => ({ ...p, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:text-white" />
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {[
              { id: 'basic', label: 'Basic', price: '$9/mo', desc: 'Core features' },
              { id: 'pro', label: 'Pro', price: '$29/mo', desc: 'Advanced features & support' },
              { id: 'enterprise', label: 'Enterprise', price: '$99/mo', desc: 'Custom solution & SLA' },
            ].map(p => (
              <button key={p.id} onClick={() => setData(d => ({ ...d, plan: p.id }))}
                className={\`w-full flex items-center justify-between p-3 rounded-xl border transition-all \${
                  data.plan === p.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }\`}>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{p.label}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </div>
                <p className="text-sm font-bold text-indigo-600">{p.price}</p>
              </button>
            ))}
            {errors.plan && <p className="text-[11px] text-red-500">{errors.plan}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 space-y-2">
              <Row label="Name" value={data.name} />
              <Row label="Email" value={data.email} />
              <Row label="Plan" value={data.plan.charAt(0).toUpperCase() + data.plan.slice(1)} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={data.agree} onChange={e => setData(d => ({ ...d, agree: e.target.checked }))}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-xs text-slate-600 dark:text-slate-400">I agree to the terms and conditions</span>
            </label>
            {errors.agree && <p className="text-[11px] text-red-500">{errors.agree}</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button onClick={prev} disabled={step === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-all">
            Back
          </button>
          {step < totalSteps ? (
            <button onClick={next}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}`,
    dependencies: [],
    concepts: ['Progress indicator with connected steps', 'Per-step validation', 'Form data accumulation across steps', 'Summary review before final submit'],
  },
  {
    id: 'toast-system',
    title: 'Toast Notification System',
    description: 'A complete toast notification system with different types, auto-dismiss, and stacking.',
    category: 'feedback',
    difficulty: 'Intermediate',
    tsx: `function App() {
  const [toasts, setToasts] = React.useState<{ id: number; type: string; message: string }[]>([]);
  const counter = React.useRef(0);

  const addToast = (type: string, message: string) => {
    const id = ++counter.current;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const iconMap: Record<string, string> = {
    success: 'M5 13l4 4L19 7',
    error: 'M6 18L18 6M6 6l12 12',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  };
  const colorMap: Record<string, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400',
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400',
    info: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400',
    warning: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400',
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10">
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
        {toasts.map(t => (
          <div key={t.id} className={\`flex items-start gap-2 px-4 py-3 rounded-xl border shadow-lg transition-all animate-in slide-in-from-right \${colorMap[t.type] || colorMap.info}\`}>
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconMap[t.type] || iconMap.info} />
            </svg>
            <p className="text-sm flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Toast System Demo</h2>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => addToast('success', 'Operation completed!')}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all">
          Success
        </button>
        <button onClick={() => addToast('error', 'Something went wrong.')}
          className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all">
          Error
        </button>
        <button onClick={() => addToast('info', 'Did you know? You can customize me.')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all">
          Info
        </button>
        <button onClick={() => addToast('warning', 'Your session is about to expire.')}
          className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all">
          Warning
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-4">Toasts auto-dismiss after 4 seconds. Click to dismiss manually.</p>
    </div>
  );
}`,
    dependencies: [],
    concepts: ['Fixed-position toast container (z-index management)', 'Auto-dismiss with setTimeout + cleanup', 'Different toast types with icons and colors', 'Stacking multiple toasts with list state'],
  },
];
