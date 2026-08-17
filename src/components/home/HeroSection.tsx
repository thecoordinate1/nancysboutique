'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    headline: 'Pitch Culture Meets\nElevated Elegance',
    subtitle: 'Authentic jerseys styled for the modern woman',
    ctas: [
      { label: 'Shop Jerseys', href: '/shop?category=club-kits' },
      { label: 'Explore Lookbook', href: '/lookbook' },
    ],
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1600&q=80',
    dark: true,
  },
  {
    id: 2,
    headline: 'New Season,\nNew Statement',
    subtitle: '24/25 Club Kits — curated for her',
    ctas: [
      { label: 'Shop New In', href: '/shop?collection=new-in' },
      { label: 'View All Jerseys', href: '/shop' },
    ],
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80',
    dark: true,
  },
  {
    id: 3,
    headline: 'Game Day\nGlam Edit',
    subtitle: 'Stadium to supper club — effortlessly',
    ctas: [
      { label: 'Shop The Edit', href: '/shop?collection=game-day-glam' },
      { label: 'Style Guide', href: '/lookbook' },
    ],
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1600&q=80',
    dark: true,
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-charcoal">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative min-h-[85vh] lg:min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay for readability & high-end editorial feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/45" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] uppercase tracking-[0.3em] mb-6 text-gold font-medium drop-shadow-sm"
            >
              ✦ Nancy&apos;s Boutique ✦
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-wide whitespace-pre-line text-white drop-shadow-md"
            >
              {slide.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm sm:text-base tracking-wide max-w-md text-white/80 drop-shadow-sm"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              {slide.ctas.map((cta, idx) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                    idx === 0
                      ? 'bg-white text-gray-900 hover:bg-white/90 shadow-xl'
                      : 'border border-white/70 text-white hover:bg-white/15 backdrop-blur-md'
                  }`}
                >
                  {cta.label}
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? 'w-8 h-2 bg-rose-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
