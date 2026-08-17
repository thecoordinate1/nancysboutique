'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, X } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

const sizeGuideData = [
  { size: 'XS', bust: '31-32"', waist: '24-25"', hips: '33-34"' },
  { size: 'S', bust: '33-34"', waist: '26-27"', hips: '35-36"' },
  { size: 'M', bust: '35-36"', waist: '28-29"', hips: '37-38"' },
  { size: 'L', bust: '37-38"', waist: '30-31"', hips: '39-40"' },
  { size: 'XL', bust: '39-41"', waist: '32-34"', hips: '41-43"' },
  { size: 'XXL', bust: '42-44"', waist: '35-37"', hips: '44-46"' },
];

export default function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-[0.15em] font-medium">
          Size: <span className="text-rose-gold">{selected || 'Select'}</span>
        </p>
        <button
          onClick={() => setShowGuide(true)}
          className="flex items-center gap-1 text-xs text-muted hover:text-charcoal tracking-wider transition-colors"
        >
          <Ruler size={13} />
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`relative min-w-[44px] h-11 px-4 rounded-lg text-sm tracking-wider transition-all duration-200 ${
              selected === size
                ? 'bg-charcoal text-cream'
                : 'bg-pearl border border-champagne/40 text-charcoal hover:border-charcoal/30'
            }`}
          >
            {size}
            {selected === size && (
              <motion.div
                layoutId="sizeIndicator"
                className="absolute inset-0 bg-charcoal rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Size Guide Bottom Sheet */}
      <AnimatePresence>
        {showGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuide(false)}
              className="fixed inset-0 z-[80] overlay-backdrop"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-[90] bg-cream rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl tracking-wide">Size Guide</h3>
                  <button
                    onClick={() => setShowGuide(false)}
                    className="touch-target"
                    aria-label="Close size guide"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <p className="text-xs text-muted tracking-wide mb-4">
                  Measurements are in inches. If you&apos;re between sizes, we recommend sizing up for a relaxed fit.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-champagne/40">
                        <th className="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.15em] text-muted font-medium">Size</th>
                        <th className="py-3 px-4 text-left text-[11px] uppercase tracking-[0.15em] text-muted font-medium">Bust</th>
                        <th className="py-3 px-4 text-left text-[11px] uppercase tracking-[0.15em] text-muted font-medium">Waist</th>
                        <th className="py-3 pl-4 text-left text-[11px] uppercase tracking-[0.15em] text-muted font-medium">Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuideData.map(row => (
                        <tr
                          key={row.size}
                          className={`border-b border-champagne/20 ${
                            sizes.includes(row.size) ? '' : 'opacity-40'
                          } ${selected === row.size ? 'bg-rose-gold/5' : ''}`}
                        >
                          <td className="py-3 pr-4 font-medium">{row.size}</td>
                          <td className="py-3 px-4 text-muted">{row.bust}</td>
                          <td className="py-3 px-4 text-muted">{row.waist}</td>
                          <td className="py-3 pl-4 text-muted">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-pearl/50 border border-champagne/30">
                  <p className="text-xs tracking-wider text-muted">
                    <strong className="text-charcoal">Pro tip:</strong> For an oversized streetwear look,
                    go 1-2 sizes up. For a fitted feminine silhouette, choose your usual size.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
