'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { searchProducts, Product } from '@/data/products';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ['Barcelona', 'Pink jersey', 'Trench coat', 'Athleisure', 'Arsenal'];
const recentSearches = ['PSG home', 'Wide-leg trousers', 'Cashmere scarf'];

import { formatPrice } from '@/utils/format';

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchProducts(query).slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] overlay-backdrop"
          />
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 z-[90] bg-cream shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-champagne/40">
              <Search size={20} className="text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jerseys, apparel, looks..."
                className="flex-1 bg-transparent text-[15px] tracking-wide outline-none placeholder:text-muted/60"
              />
              <button onClick={onClose} className="touch-target flex-shrink-0" aria-label="Close search">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="p-4">
              {results.length > 0 ? (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
                    {results.length} Result{results.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {results.map(product => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-pearl/60 transition-colors"
                      >
                        <div
                          className="w-14 h-14 rounded-lg flex-shrink-0"
                          style={{ background: `url(${product.images[0]}) center/cover` }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Recent */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-muted" />
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Recent</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3.5 py-2 rounded-full bg-pearl/60 text-xs tracking-wide hover:bg-champagne/40 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={14} className="text-rose-gold" />
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Trending</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3.5 py-2 rounded-full border border-rose-gold/30 text-xs tracking-wide hover:bg-rose-gold/10 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
