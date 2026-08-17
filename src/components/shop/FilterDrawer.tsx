'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check } from 'lucide-react';
import { formatPrice } from '@/utils/format';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  selectedBadge: string;
  onSelectBadge: (badge: string) => void;
  onReset: () => void;
  totalResults: number;
}

const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const badges = [
  { id: 'all', label: 'All Items' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'bestseller', label: 'Bestsellers' },
  { id: 'sale', label: 'Sale Only' },
];

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
  maxPrice,
  onMaxPriceChange,
  selectedBadge,
  onSelectBadge,
  onReset,
  totalResults,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 overlay-backdrop"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-10 w-full max-w-sm bg-cream shadow-2xl flex flex-col h-full border-l border-champagne/40"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-champagne/40 bg-pearl/30">
            <h2 className="font-serif text-lg tracking-wide font-semibold">Filter Collection</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="text-xs text-muted hover:text-rose-gold transition-colors flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
              <button onClick={onClose} className="p-1 text-muted hover:text-charcoal transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Max Price
                </label>
                <span className="text-sm font-medium text-rose-gold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className="w-full accent-rose-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted tracking-wider mt-1">
                <span>K 50</span>
                <span>K 500</span>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => onSelectSize(size === selectedSize ? 'All' : size)}
                    className={`py-2 rounded-xl text-xs font-medium tracking-wider transition-all ${
                      (size === selectedSize || (size === 'All' && !selectedSize))
                        ? 'bg-rose-gold text-cream shadow-md'
                        : 'bg-pearl border border-champagne/60 text-charcoal hover:border-rose-gold/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection / Badge Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Tag / Highlight
              </label>
              <div className="space-y-2">
                {badges.map(b => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBadge(b.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBadge === b.id
                        ? 'border-rose-gold bg-rose-gold/5 font-semibold text-rose-gold'
                        : 'border-champagne/40 bg-pearl/30 text-charcoal hover:border-champagne'
                    }`}
                  >
                    <span className="text-xs tracking-wider">{b.label}</span>
                    {selectedBadge === b.id && <Check size={16} className="text-rose-gold" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-champagne/40 bg-pearl/30">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-charcoal text-cream text-sm tracking-wider font-medium hover:bg-charcoal/90 transition-colors shadow-lg"
            >
              Show {totalResults} Product{totalResults !== 1 ? 's' : ''}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
