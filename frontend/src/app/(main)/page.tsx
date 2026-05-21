import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import CTA from '@/components/sections/CTA';
import Templates from '@/components/sections/Templates';

const DashboardSection = dynamic(() => import('@/components/sections/DashboardSection'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl" />,
});

export default function Page() {
  return (
    <div className="space-y-24 px-4 py-8 sm:px-6 lg:px-8">
      <Hero />
      <Categories value="All" />

      <Features />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl" />}>
        <DashboardSection />
      </Suspense>

      <Pricing />
      <Templates />
      <CTA />
    </div>
  );
}



