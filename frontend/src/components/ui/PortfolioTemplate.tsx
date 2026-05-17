"use client"

import React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Twitter, Linkedin, ExternalLink, Code, Palette, Zap } from "lucide-react"

const projects = [
  {
    title: "MasterUI Platform",
    description: "A comprehensive UI component library built with React and Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    title: "EcoSphere App",
    description: "Sustainable living tracker with real-time analytics and community features.",
    tags: ["Next.js", "Framer Motion", "Supabase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Nova Dashboard",
    description: "Enterprise-grade financial dashboard with complex data visualizations.",
    tags: ["D3.js", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&q=80",
  },
]

export default function PortfolioTemplate() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <motion.div style={{ opacity, scale }} className="z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold tracking-tight sm:text-7xl"
          >
            Building digital <span className="text-indigo-600">experiences</span> that matter.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-slate-600 dark:text-slate-400"
          >
            I'm a senior frontend engineer specializing in high-performance web applications and fluid user interfaces.
          </motion.p>
        </motion.div>

        {/* Background Decorative element */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            <SkillItem icon={Code} title="Clean Code" desc="Writing maintainable, scalable, and type-safe code." />
            <SkillItem icon={Palette} title="Pixel Perfect" desc="Meticulous attention to detail in UI and motion design." />
            <SkillItem icon={Zap} title="Performance" desc="Optimizing for core web vitals and snappy experiences." />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-3xl font-bold sm:text-4xl">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKpTiaz7wAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="p-8">
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{tag}</span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SkillItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-800"><Icon className="h-8 w-8 text-indigo-600" /></div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-4 text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  )
}