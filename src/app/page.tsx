'use client';

import { useState } from 'react';
import { products, getProductsByCategory } from '@/data/products';
import HeroSection from '@/components/home/HeroSection';
import CategoryPills from '@/components/home/CategoryPills';
import CollectionsGrid from '@/components/home/CollectionsGrid';
import ProductCarousel from '@/components/home/ProductCarousel';
import ShopTheLook from '@/components/home/ShopTheLook';
import VIPSection from '@/components/home/VIPSection';
import SocialFeed from '@/components/home/SocialFeed';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const newInProducts = products.filter(p => p.tags.includes('new-in'));
  const gameDayProducts = products.filter(p => p.tags.includes('game-day-glam'));

  return (
    <main>
      {/* Hero Carousel */}
      <HeroSection />

      {/* Category Pills */}
      <CategoryPills active={activeCategory} onChange={setActiveCategory} />

      {/* New In Carousel */}
      <ProductCarousel
        title="New In"
        subtitle="Just Dropped"
        products={activeCategory === 'all' ? newInProducts : getProductsByCategory(activeCategory)}
      />

      {/* Collections Grid */}
      <CollectionsGrid />

      {/* Game Day Glam Carousel */}
      <ProductCarousel
        title="Game Day Glam"
        subtitle="Stadium to Supper Club"
        products={gameDayProducts}
      />

      {/* Shop The Look */}
      <ShopTheLook />

      {/* Social Feed & Reviews */}
      <SocialFeed />

      {/* VIP Section */}
      <VIPSection />

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="font-serif text-xl tracking-wide mb-4">
                <span className="font-light">Nancy&apos;s</span>{' '}
                <span className="font-semibold italic">Boutique</span>
              </h3>
              <p className="text-xs text-cream/50 leading-relaxed tracking-wide">
                Where pitch culture meets elevated elegance. Authentic football jerseys styled for the modern woman.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-4">Shop</h4>
              <ul className="space-y-2.5">
                {['Club Kits', 'National Teams', 'Trench & Tailoring', 'Athleisure', 'Sale'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs text-cream/60 tracking-wider hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-4">Info</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Authenticity Promise', 'Size Guide', 'Delivery & Returns', 'Contact'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs text-cream/60 tracking-wider hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-4">Connect</h4>
              <ul className="space-y-2.5">
                {['Instagram', 'TikTok', 'Pinterest', 'VIP Club', 'Styling Service'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs text-cream/60 tracking-wider hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-cream/30 tracking-wider">
              © 2024 Nancy&apos;s Boutique. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Privacy', 'Terms', 'Cookies'].map(item => (
                <a key={item} href="#" className="text-[10px] text-cream/30 tracking-wider hover:text-cream/50 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
