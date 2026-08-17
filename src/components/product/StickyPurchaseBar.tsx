'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/format';

interface StickyPurchaseBarProps {
  product: Product;
  selectedSize: string;
  customName?: string;
  customNumber?: string;
}

export default function StickyPurchaseBar({
  product,
  selectedSize,
  customName,
  customNumber,
}: StickyPurchaseBarProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 400], [0, 1]);
  const y = useTransform(scrollY, [300, 400], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 glass border-t border-champagne/40 px-4 py-3 lg:py-4"
    >
      <div className="max-w-lg mx-auto flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium tracking-wide line-clamp-1">{product.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => toggleItem(product.id)}
          className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center hover:bg-pearl transition-colors"
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={`transition-all ${
              isInWishlist(product.id)
                ? 'text-rose-gold fill-rose-gold'
                : 'text-charcoal'
            }`}
          />
        </button>

        <button
          onClick={() => {
            if (selectedSize) {
              addItem(product, selectedSize, customName, customNumber);
            }
          }}
          disabled={!selectedSize}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm tracking-wider transition-all ${
            selectedSize
              ? 'bg-charcoal text-cream hover:bg-charcoal/90'
              : 'bg-champagne text-muted cursor-not-allowed'
          }`}
        >
          <ShoppingBag size={16} />
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
