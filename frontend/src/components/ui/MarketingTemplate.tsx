"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap, Shield, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react"
import Button from "@/components/ui/Button"

export default function MarketingTemplate() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
            Build faster with our <span className="text-indigo-600">modern UI Kit</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 dark:text-slate-400">
            Beautifully designed, accessible, and fully customizable components for your next project. 
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="primary" className="rounded-full px-8 py-4">
              Get Started <ArrowRight size={20} />
            </Button>
            <Button variant="secondary" className="rounded-full px-8 py-4">
              View Components
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureItem 
              icon={Zap} 
              title="Lightning Fast" 
              description="Optimized for speed and minimal bundle sizes using modern best practices." 
            />
            <FeatureItem 
              icon={Shield} 
              title="Type Safe" 
              description="First-class TypeScript support ensures your code is robust and bug-free." 
            />
            <FeatureItem 
              icon={Smartphone} 
              title="Mobile First" 
              description="Every component is responsive out of the box for perfect mobile experiences." 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-950 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="Is it easy to customize?" 
              answer="Absolutely. Everything is built with Tailwind CSS utility classes, making it a breeze to tweak colors, spacing, and styles."
            />
            <FAQItem 
              question="Do you support Dark Mode?" 
              answer="Yes! All components have native dark mode support built-in using the 'dark:' prefix in Tailwind."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white"
      >
        {question}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <CheckCircle2 size={20} className="text-indigo-600" />
        </motion.span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-slate-600 dark:text-slate-400">{answer}</div>
      )}
    </div>
  )
}