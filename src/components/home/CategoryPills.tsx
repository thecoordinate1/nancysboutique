'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface CategoryPillsProps {
  active: string;
  onChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'club-kits', label: 'Club Kits' },
  { id: 'national-teams', label: 'National Teams' },
  { id: 'trench-tailoring', label: 'Trench & Tailoring' },
  { id: 'athleisure', label: 'Athleisure' },
  { id: 'accessories', label: 'Accessories' },
];

export default function CategoryPills({ active, onChange }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-4">
      <div
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide px-4 lg:px-8 lg:justify-center"
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="relative flex-shrink-0 touch-target"
          >
            <span
              className={`relative z-10 px-5 py-2.5 rounded-full text-xs tracking-wider whitespace-nowrap transition-colors duration-200 ${
                active === cat.id
                  ? 'text-cream'
                  : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              {cat.label}
            </span>
            {active === cat.id && (
              <motion.div
                layoutId="categoryPill"
                className="absolute inset-0 bg-charcoal rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-cream to-transparent pointer-events-none lg:hidden" />
      <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-cream to-transparent pointer-events-none lg:hidden" />
    </div>
  );
}
