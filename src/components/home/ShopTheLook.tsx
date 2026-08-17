'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Eye } from 'lucide-react';
import { lookbookOutfits, getProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';

interface HotspotProduct {
  productId: string;
  x: number;
  y: number;
}

export default function ShopTheLook() {
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [activePin, setActivePin] = useState<HotspotProduct | null>(null);
  const { addItem } = useCart();

  const outfit = lookbookOutfits[activeOutfit];

  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">Style Inspiration</p>
        <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Shop The Look</h2>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Outfit Navigator */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 justify-center">
          {lookbookOutfits.map((o, idx) => (
            <button
              key={o.id}
              onClick={() => { setActiveOutfit(idx); setActivePin(null); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs tracking-wider transition-all ${
                idx === activeOutfit
                  ? 'bg-charcoal text-cream'
                  : 'bg-pearl text-muted hover:bg-champagne/50'
              }`}
            >
              {o.name}
            </button>
          ))}
        </div>

        {/* Outfit Card */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: `url(${outfit.image}) center/cover` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/10" />

          {/* Hotspot Pins */}
          {outfit.items.map((item, idx) => {
            const product = getProduct(item.productId);
            if (!product) return null;

            return (
              <motion.button
                key={item.productId}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, type: 'spring' }}
                onClick={() => setActivePin(activePin?.productId === item.productId ? null : item)}
                className="absolute z-10"
                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-10 h-10 rounded-full bg-cream/20 animate-pulse-soft" />
                  <span className="relative w-6 h-6 rounded-full bg-cream/90 backdrop-blur-sm border-2 border-rose-gold flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
                  </span>
                </span>
              </motion.button>
            );
          })}

          {/* Outfit Title */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h3 className="font-serif text-xl text-cream tracking-wide">{outfit.name}</h3>
              <p className="text-xs text-cream/60 tracking-wider mt-1">
                Tap pins to explore items
              </p>
            </div>
            <button
              onClick={() => {
                outfit.items.forEach(item => {
                  const product = getProduct(item.productId);
                  if (product) addItem(product, 'M');
                });
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream/90 backdrop-blur-sm text-charcoal text-xs tracking-wider hover:bg-cream transition-colors"
            >
              <ShoppingBag size={14} />
              Add Full Look
            </button>
          </div>
        </div>

        {/* Bottom Sheet Preview */}
        <AnimatePresence>
          {activePin && (() => {
            const product = getProduct(activePin.productId);
            if (!product) return null;

            return (
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="mt-3 bg-pearl/80 backdrop-blur-xl rounded-2xl p-4 border border-champagne/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-24 rounded-xl flex-shrink-0"
                    style={{ background: `url(${product.images[0]}) center/cover` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{product.subtitle}</p>
                    <h4 className="text-sm font-medium tracking-wide mt-0.5 line-clamp-1">{product.name}</h4>
                    <p className="text-sm font-medium mt-1">{formatPrice(product.price)}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addItem(product, 'M')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal text-cream text-[11px] tracking-wider"
                      >
                        <ShoppingBag size={12} />
                        Add to Cart
                      </button>
                      <Link
                        href={`/product/${product.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-charcoal/20 text-[11px] tracking-wider hover:bg-charcoal/5"
                      >
                        <Eye size={12} />
                        View
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePin(null)}
                    className="touch-target self-start flex-shrink-0"
                    aria-label="Close preview"
                  >
                    <X size={18} className="text-muted" />
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
