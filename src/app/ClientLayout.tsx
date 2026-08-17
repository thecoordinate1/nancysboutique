'use client';

import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from '@/components/ui/Toast';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import MobileDrawer from '@/components/layout/MobileDrawer';
import SearchOverlay from '@/components/layout/SearchOverlay';
import CartDrawer from '@/components/cart/CartDrawer';
import SWRegister from '@/components/SWRegister';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Header
              onMenuOpen={() => setMenuOpen(true)}
              onSearchOpen={() => setSearchOpen(true)}
            />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <BottomNav />
            <MobileDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <CartDrawer />
            <ToastContainer />
            <SWRegister />
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
