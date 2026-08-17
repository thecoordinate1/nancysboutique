'use client';

import { motion } from 'framer-motion';
import { Home, Grid3X3, Heart, BookImage, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'shop', label: 'Shop', icon: Grid3X3, href: '/shop' },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, href: '/wishlist' },
  { id: 'lookbook', label: 'Lookbook', icon: BookImage, href: '/lookbook' },
  { id: 'cart', label: 'Cart', icon: ShoppingBag, href: '#cart' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const getActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#cart') return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass border-t border-champagne/40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map(tab => {
          const isActive = getActive(tab.href);
          const isCart = tab.id === 'cart';
          const isWishlist = tab.id === 'wishlist';
          const badge = isCart ? itemCount : isWishlist ? wishlistCount : 0;

          const content = (
            <div className="relative flex flex-col items-center justify-center touch-target py-1 gap-0.5">
              <div className="relative">
                <tab.icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-rose-gold' : 'text-muted'
                  }`}
                  fill={isActive && isWishlist ? 'currentColor' : 'none'}
                />
                {badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 bg-rose-gold text-cream text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {badge > 9 ? '9+' : badge}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wider transition-colors duration-200 ${
                  isActive ? 'text-rose-gold font-medium' : 'text-muted'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute -top-0.5 w-6 h-0.5 bg-rose-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          );

          if (isCart) {
            return (
              <button key={tab.id} onClick={openCart} className="flex-1" aria-label="Open cart">
                {content}
              </button>
            );
          }

          return (
            <Link key={tab.id} href={tab.href} className="flex-1">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
