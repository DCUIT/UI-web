'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Play, RotateCcw, Code2, Sliders,
  Move, Maximize, RefreshCw, Copy, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';

type AnimationType = 'spring' | 'tween' | 'inertia';
type AnimatedProperty = 'x' | 'y' | 'scale' | 'rotate' | 'opacity';

interface Preset {
  name: string;
  stiffness: number;
  damping: number;
  mass: number;
}

const presets: Preset[] = [
  { name: 'Gentle', stiffness: 80, damping: 20, mass: 1 },
  { name: 'Wobbly', stiffness: 180, damping: 8, mass: 0.5 },
  { name: 'Stiff', stiffness: 300, damping: 30, mass: 1 },
  { name: 'Bouncy', stiffness: 150, damping: 5, mass: 0.3 },
  { name: 'Slow Mo', stiffness: 50, damping: 10, mass: 4 },
];

const propertyConfig: Record<AnimatedProperty, { label: string; icon: typeof Move; from: number; to: number; unit: string }> = {
  x: { label: 'Translate X', icon: Move, from: 0, to: 200, unit: 'px' },
  y: { label: 'Translate Y', icon: Move, from: 0, to: 200, unit: 'px' },
  scale: { label: 'Scale', icon: Maximize, from: 1, to: 1.5, unit: '' },
  rotate: { label: 'Rotate', icon: RefreshCw, from: 0, to: 360, unit: 'deg' },
  opacity: { label: 'Opacity', icon: Sparkles, from: 1, to: 0.2, unit: '' },
};

export default function AnimationStudioPage() {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [animType, setAnimType] = useState<AnimationType>('spring');
  const [property, setProperty] = useState<AnimatedProperty>('x');
  const [duration, setDuration] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const config = propertyConfig[property];

  const triggerAnimation = useCallback(() => {
    setIsPlaying(true);
    setKey(k => k + 1);
  }, []);

  const reset = useCallback(() => {
    setStiffness(100);
    setDamping(10);
    setMass(1);
    setAnimType('spring');
    setProperty('x');
    setDuration(0.5);
    setIsPlaying(false);
  }, []);

  const getTransition = () => {
    if (animType === 'spring') {
      return { type: 'spring' as const, stiffness, damping, mass };
    }
    if (animType === 'inertia') {
      return { type: 'inertia' as const, velocity: Math.abs(config.to) * 2, power: 0.8 };
    }
    return { type: 'tween' as const, duration, ease: 'easeInOut' as const };
  };

  const generatedCode = `// ${animType.charAt(0).toUpperCase() + animType.slice(1)} Animation
<motion.div
  animate={{ ${property}: ${isPlaying ? config.to : config.from} }}
  transition={{
    type: "${animType}"${animType === 'spring' ? `,\n    stiffness: ${stiffness},\n    damping: ${damping},\n    mass: ${mass}` : animType === 'tween' ? `,\n    duration: ${duration}` : `,\n    velocity: ${Math.abs(config.to) * 2}`}
  }}
>
  {/* Your content */}
</motion.div>`;

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Controls Sidebar */}
      <aside className="w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Controls
            </h2>
            <button
              onClick={reset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Reset all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Animation Property */}
          <section className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property</p>
            <div className="grid grid-cols-5 gap-1">
              {(Object.keys(propertyConfig) as AnimatedProperty[]).map(p => {
                const Icon = propertyConfig[p].icon;
                const isActive = property === p;
                return (
                  <Tooltip key={p} label={propertyConfig[p].label}>
                    <button
                      onClick={() => { setProperty(p); setIsPlaying(false); }}
                      className={cn(
                        "flex flex-col items-center gap-0.5 p-2 rounded-lg text-[9px] font-medium transition-all border",
                        isActive
                          ? "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {propertyConfig[p].label.split(' ')[1] || p}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </section>

          {/* Animation Type */}
          <section className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</p>
            <div className="flex gap-1">
              {(['spring', 'tween', 'inertia'] as AnimationType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setAnimType(t)}
                  className={cn(
                    "flex-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border capitalize",
                    animType === t
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Spring Physics */}
          {animType === 'spring' && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SliderControl label="Stiffness" value={stiffness} min={10} max={500} step={1} onChange={setStiffness} hint="Higher = snappier, lower = looser" />
              <SliderControl label="Damping" value={damping} min={1} max={50} step={1} onChange={setDamping} hint="Higher = less bounce, lower = more bouncy" />
              <SliderControl label="Mass" value={mass} min={0.1} max={10} step={0.1} onChange={setMass} hint="Higher = heavier/slower, lower = lighter/faster" />
            </motion.section>
          )}

          {/* Tween */}
          {animType === 'tween' && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SliderControl label="Duration" value={duration} min={0.1} max={3} step={0.1} onChange={setDuration} hint="Seconds — longer = slower animation" />
            </motion.section>
          )}

          {/* Presets */}
          <section className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Presets</p>
            <div className="grid grid-cols-2 gap-1">
              {presets.map(p => {
                const isActive = stiffness === p.stiffness && damping === p.damping && mass === p.mass;
                return (
                  <button
                    key={p.name}
                    onClick={() => { setStiffness(p.stiffness); setDamping(p.damping); setMass(p.mass); }}
                    className={cn(
                      "px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border text-left",
                      isActive
                        ? "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300"
                    )}
                  >
                    {p.name}
                    <span className="block text-[8px] font-normal text-slate-400 mt-0.5">
                      S:{p.stiffness} D:{p.damping} M:{p.mass}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Play Button */}
          <Button
            variant="primary"
            onClick={triggerAnimation}
            className="w-full gap-2"
          >
            <Play className="w-4 h-4" /> Animate
          </Button>

          {/* Generated Code */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Generated Code</p>
              <button
                onClick={copyCode}
                className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <pre className="rounded-xl bg-slate-950 p-3 text-[10px] font-mono leading-relaxed text-emerald-400 overflow-x-auto">
              {generatedCode}
            </pre>
          </section>
        </div>
      </aside>

      {/* Preview */}
      <main className="flex-1 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <div className="relative flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={false}
              animate={
                isPlaying
                  ? { [property]: config.to }
                  : { [property]: config.from }
              }
              transition={getTransition()}
              onAnimationComplete={() => setIsPlaying(false)}
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-sm"
            >
              {property === 'opacity' ? 'Fade' : property === 'scale' ? 'Scale' : property === 'rotate' ? 'Rotate' : 'Move'}
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            {animType === 'spring'
              ? `spring(s: ${stiffness}, d: ${damping}, m: ${mass})`
              : animType === 'tween'
                ? `tween(d: ${duration}s)`
                : `inertia(v: ${Math.abs(config.to) * 2})`
            }
          </p>
        </div>
      </main>
    </div>
  );
}

function SliderControl({ label, value, min, max, step, onChange, hint }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
        <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 accent-amber-500 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:shadow-md"
      />
      {hint && <p className="text-[9px] text-slate-400 italic">{hint}</p>}
    </div>
  );
}
