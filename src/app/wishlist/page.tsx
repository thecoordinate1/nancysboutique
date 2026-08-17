'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';

export default function WishlistPage() {
  const { getWishlistProducts, removeItem, clearWishlist, itemCount } = useWishlist();
  const { addItem } = useCart();
  const wishlistProducts = getWishlistProducts();

  const moveAllToCart = () => {
    wishlistProducts.forEach(product => {
      addItem(product, 'M');
    });
  };

  return (
    <div className="pb-24 min-h-[60vh]">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">Your Favorites</p>
        <h1 className="font-serif text-3xl lg:text-4xl tracking-wide flex items-center justify-center gap-3">
          Wishlist
          <Heart size={24} className="text-rose-gold" fill="currentColor" />
        </h1>
        <p className="text-sm text-muted tracking-wide mt-2">
          {itemCount} item{itemCount !== 1 ? 's' : ''} saved
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <Heart size={48} className="text-champagne mb-4" strokeWidth={1} />
          <h2 className="font-serif text-xl mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-muted tracking-wide mb-6 max-w-sm">
            Save your favorite jerseys and styling pieces to revisit later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors"
          >
            Explore the Shop
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <>
          {/* Actions Bar */}
          <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-y border-champagne/30">
            <button
              onClick={moveAllToCart}
              className="flex items-center gap-2 text-xs tracking-wider text-charcoal hover:text-rose-gold transition-colors"
            >
              <ShoppingBag size={14} />
              Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-xs tracking-wider text-muted hover:text-error transition-colors"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 px-4 lg:px-8 mt-4">
            <AnimatePresence>
              {wishlistProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group"
                >
                  <Link href={`/product/${product.id}`} className="block relative">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{ background: `url(${product.images[0]}) center/cover` }}
                      />

                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeItem(product.id); }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-error/10 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Heart size={14} className="text-rose-gold fill-rose-gold" />
                      </button>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product, 'M'); }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full bg-charcoal/90 backdrop-blur-sm text-cream text-[11px] tracking-wider"
                        >
                          <ShoppingBag size={12} /> Move to Cart
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-2.5 px-0.5">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{product.subtitle}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium tracking-wide line-clamp-1 hover:text-rose-gold transition-colors mt-0.5">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <p className={`text-[10px] mt-1 tracking-wider ${product.inStock ? 'text-success' : 'text-error'}`}>
                      {product.inStock ? '● In Stock' : '● Out of Stock'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
