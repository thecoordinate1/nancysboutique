'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: Product[];
}

export default function ProductCarousel({ title, subtitle, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-10">
      {/* Header */}
      <div className="flex items-end justify-between px-4 lg:px-8 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-1">{subtitle}</p>
          <h2 className="font-serif text-2xl lg:text-3xl tracking-wide">{title}</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="touch-target rounded-full border border-champagne hover:border-rose-gold hover:bg-rose-gold/5 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="touch-target rounded-full border border-champagne hover:border-rose-gold hover:bg-rose-gold/5 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-8 snap-x"
      >
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex-shrink-0 w-[65vw] sm:w-[45vw] lg:w-[22vw] snap-start"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image */}
            <Link href={`/product/${product.id}`} className="block relative group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: `url(${product.images[0]}) center/cover` }}
                />
                <AnimatePresence>
                  {hoveredId === product.id && product.images[1] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                      style={{ background: `url(${product.images[1]}) center/cover` }}
                    />
                  )}
                </AnimatePresence>

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${
                      product.badge === 'new'
                        ? 'bg-charcoal text-cream'
                        : product.badge === 'sale'
                          ? 'bg-rose-gold text-cream'
                          : product.badge === 'bestseller'
                            ? 'bg-cream/90 text-charcoal backdrop-blur-sm'
                            : 'bg-charcoal/80 text-cream backdrop-blur-sm'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleItem(product.id);
                    }}
                    className="w-9 h-9 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-colors"
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      size={16}
                      className={`transition-all duration-200 ${
                        isInWishlist(product.id)
                          ? 'text-rose-gold fill-rose-gold animate-heart-pop'
                          : 'text-charcoal'
                      }`}
                    />
                  </button>
                </div>

                {/* Quick Add */}
                <AnimatePresence>
                  {hoveredId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-3 left-3 right-3"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem(product, 'M');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-charcoal/90 backdrop-blur-sm text-cream text-xs tracking-wider hover:bg-charcoal transition-colors"
                      >
                        <Plus size={14} />
                        Quick Add
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>

            {/* Info */}
            <div className="mt-3 px-1">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-0.5">
                {product.subtitle}
              </p>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-medium tracking-wide line-clamp-1 hover:text-rose-gold transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
