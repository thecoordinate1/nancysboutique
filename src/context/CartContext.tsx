'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  customName?: string;
  customNumber?: string;
  giftWrap?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, customName?: string, customNumber?: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
  freeDeliveryThreshold: number;
  freeDeliveryProgress: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscount: number;
  applyPromo: () => boolean;
  giftWrap: boolean;
  toggleGiftWrap: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 200;
const PROMO_CODES: Record<string, number> = {
  NANCY10: 0.1,
  PITCH20: 0.2,
  FIRSTKIT: 0.15,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nancy-cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('nancy-cart', JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, size: string, customName?: string, customNumber?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size, customName, customNumber }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.size === size ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const freeDeliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  const applyPromo = useCallback(() => {
    const discount = PROMO_CODES[promoCode.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      return true;
    }
    setPromoDiscount(0);
    return false;
  }, [promoCode]);

  const toggleGiftWrap = useCallback(() => setGiftWrap(prev => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        freeDeliveryProgress,
        promoCode,
        setPromoCode,
        promoDiscount,
        applyPromo,
        giftWrap,
        toggleGiftWrap,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
