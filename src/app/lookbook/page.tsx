'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { lookbookOutfits, getProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';

export default function LookbookPage() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative min-h-[40vh] flex items-center justify-center text-center px-4"
        style={{ background: 'linear-gradient(160deg, #E8DFD8, #D4A5A5, #B76E79)' }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-3"
          >
            ✦ Editorial ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl tracking-wide text-charcoal"
          >
            The Lookbook
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-charcoal/60 tracking-wide mt-3 max-w-md mx-auto"
          >
            Curated outfit combinations to inspire your jersey styling
          </motion.p>
        </div>
      </div>

      {/* Looks */}
      <div className="px-4 lg:px-8 py-10 space-y-16">
        {lookbookOutfits.map((outfit, idx) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden ${
              idx % 2 === 1 ? 'lg:order-2' : ''
            }`}>
              <div
                className="absolute inset-0"
                style={{ background: `url(${outfit.image}) center/cover` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-sm text-[11px] tracking-wider font-medium">
                  Look {idx + 1}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className={`mt-6 lg:mt-0 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">Style #{idx + 1}</p>
              <h2 className="font-serif text-2xl lg:text-3xl tracking-wide mb-4">{outfit.name}</h2>

              <div className="space-y-3">
                {outfit.items.map(item => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-3 rounded-xl bg-pearl/50 border border-champagne/20"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="w-16 h-20 rounded-lg flex-shrink-0"
                        style={{ background: `url(${product.images[0]}) center/cover` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{product.subtitle}</p>
                        <p className="text-sm font-medium tracking-wide line-clamp-1">{product.name}</p>
                        <p className="text-sm font-medium mt-1">${product.price}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => addItem(product, 'M')}
                          className="w-8 h-8 rounded-full bg-charcoal text-cream flex items-center justify-center hover:bg-charcoal/80 transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag size={14} />
                        </button>
                        <button
                          onClick={() => toggleItem(product.id)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            isInWishlist(product.id)
                              ? 'border-rose-gold bg-rose-gold/5'
                              : 'border-champagne hover:border-charcoal/30'
                          }`}
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            size={14}
                            className={isInWishlist(product.id) ? 'text-rose-gold fill-rose-gold' : 'text-charcoal'}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  outfit.items.forEach(item => {
                    const product = getProduct(item.productId);
                    if (product) addItem(product, 'M');
                  });
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors"
              >
                <ShoppingBag size={16} />
                Shop This Look
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
