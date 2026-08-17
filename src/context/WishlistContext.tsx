'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, getProduct } from '@/data/products';

import { useToast } from '@/context/ToastContext';

interface WishlistContextType {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistProducts: () => Product[];
  clearWishlist: () => void;
  itemCount: number;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('nancy-wishlist');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('nancy-wishlist', JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((productId: string) => {
    setItems(prev => prev.includes(productId) ? prev : [...prev, productId]);
    const prod = getProduct(productId);
    if (prod) showToast('Saved to Wishlist', prod.name, 'success');
  }, [showToast]);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems(prev => {
      const exists = prev.includes(productId);
      const prod = getProduct(productId);
      if (exists) {
        if (prod) showToast('Removed from Wishlist', prod.name, 'info');
        return prev.filter(id => id !== productId);
      } else {
        if (prod) showToast('Saved to Wishlist', prod.name, 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => items.includes(productId), [items]);

  const getWishlistProducts = useCallback(() =>
    items.map(id => getProduct(id)).filter((p): p is Product => !!p),
    [items]
  );

  const clearWishlist = useCallback(() => setItems([]), []);
  const openWishlist = useCallback(() => setIsOpen(true), []);
  const closeWishlist = useCallback(() => setIsOpen(false), []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        getWishlistProducts,
        clearWishlist,
        itemCount: items.length,
        isOpen,
        openWishlist,
        closeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
