import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import Templates from '@/components/sections/Templates';
import CTA from '@/components/sections/CTA';
import Categories from '@/components/sections/Categories';

export default function Page() {
  return (
    <main className="space-y-24 px-4 py-8 sm:px-6 lg:px-8">
      <Hero />
      <Categories value="All" />

      <Features />

      <Pricing />
      <Templates />
      <CTA />
    </main>
  );
}



