'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

interface HeaderProps {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
}

export default function Header({ onMenuOpen, onSearchOpen }: HeaderProps) {
  const { itemCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass border-b border-champagne/40">
      {/* Announcement Bar */}
      <div className="bg-charcoal text-cream text-center py-1.5 px-4">
        <p className="text-[11px] tracking-[0.15em] uppercase font-light">
          Complimentary delivery on orders over K 200 ✦ Authenticity Guaranteed
        </p>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left: Menu (mobile) + Search */}
        <div className="flex items-center gap-0 sm:gap-1">
          <button
            onClick={onMenuOpen}
            className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:bg-pearl/60 lg:hidden transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={onSearchOpen}
            className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:bg-pearl/60 transition-colors"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 group transition-transform duration-300 hover:scale-[1.04]">
          <h1 className="font-serif text-[17px] sm:text-2xl lg:text-3xl tracking-wide sm:tracking-wider">
            <span className="font-light text-charcoal group-hover:text-rose-gold transition-colors duration-300">Nancy&apos;s</span>{' '}
            <span className="font-bold italic bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(183,110,121,0.4)]">
              Boutique
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide">
          <Link href="/" className="hover:text-rose-gold transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-rose-gold transition-colors">Shop</Link>
          <Link href="/shop?category=club-kits" className="hover:text-rose-gold transition-colors">Jerseys</Link>
          <Link href="/shop?category=trench-tailoring" className="hover:text-rose-gold transition-colors">Apparel</Link>
          <Link href="/lookbook" className="hover:text-rose-gold transition-colors">Lookbook</Link>
          <Link href="/shop?tag=sale" className="text-rose-gold hover:text-rose-gold-light transition-colors">Sale</Link>
        </nav>

        {/* Right: Dark Mode + Cart */}
        <div className="flex items-center gap-0 sm:gap-1">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-charcoal hover:bg-pearl/60 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} strokeWidth={1.5} className="text-amber-400" />
            ) : (
              <Moon size={18} strokeWidth={1.5} />
            )}
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:bg-pearl/60 transition-colors relative"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-rose-gold text-cream text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
