'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Gift, Tag, Trash2, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    freeDeliveryThreshold,
    freeDeliveryProgress,
    promoCode,
    setPromoCode,
    promoDiscount,
    applyPromo,
    giftWrap,
    toggleGiftWrap,
    clearCart,
  } = useCart();

  const deliveryCost = subtotal >= freeDeliveryThreshold ? 0 : 9.95;
  const discount = subtotal * promoDiscount;
  const giftWrapCost = giftWrap ? 5 : 0;
  const total = subtotal - discount + deliveryCost + giftWrapCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] overlay-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[90] w-full sm:w-[420px] bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-champagne/40">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="font-serif text-lg tracking-wide">Your Bag</h2>
                <span className="text-xs text-muted tracking-wider">({itemCount})</span>
              </div>
              <button onClick={closeCart} className="touch-target" aria-label="Close cart">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Delivery Progress */}
            {subtotal < freeDeliveryThreshold && (
              <div className="px-5 py-3 bg-pearl/50 border-b border-champagne/20">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={14} className="text-muted" />
                  <p className="text-[11px] tracking-wider text-muted">
                    {subtotal > 0
                      ? `${formatPrice(freeDeliveryThreshold - subtotal)} away from free delivery`
                      : `Free delivery on orders ${formatPrice(200)}+`}
                  </p>
                </div>
                <div className="h-1.5 bg-champagne/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-rose-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeDeliveryProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
            {subtotal >= freeDeliveryThreshold && (
              <div className="px-5 py-2.5 bg-success/5 border-b border-success/10">
                <p className="text-[11px] tracking-wider text-success text-center flex items-center justify-center gap-1.5">
                  <Truck size={13} /> You&apos;ve unlocked free delivery! ✦
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                  <ShoppingBag size={48} className="text-champagne mb-4" strokeWidth={1} />
                  <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
                  <p className="text-sm text-muted tracking-wide mb-6">
                    Discover our curated collection of authentic jerseys and luxury apparel.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="px-6 py-3 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-3 p-3 rounded-xl bg-pearl/30 border border-champagne/20"
                    >
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="w-20 h-24 rounded-lg flex-shrink-0"
                        style={{ background: `url(${item.product.images[0]}) center/cover` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium tracking-wide line-clamp-1">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] text-muted tracking-wider mt-0.5">
                              Size: {item.size}
                              {item.customName && ` · ${item.customName}`}
                              {item.customNumber && ` #${item.customNumber}`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="touch-target flex-shrink-0 text-muted hover:text-error transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 border border-champagne/40 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-pearl rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-pearl rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-champagne/40 p-5 space-y-4 bg-pearl/20">
                {/* Gift Wrap */}
                <button
                  onClick={toggleGiftWrap}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    giftWrap
                      ? 'border-rose-gold/50 bg-rose-gold/5'
                      : 'border-champagne/30 hover:border-champagne'
                  }`}
                >
                  <Gift size={16} className={giftWrap ? 'text-rose-gold' : 'text-muted'} />
                  <div className="flex-1 text-left">
                    <p className="text-xs tracking-wider">Gift wrap this order</p>
                    <p className="text-[10px] text-muted">+{formatPrice(5)} · Luxe ribbon & tissue paper</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    giftWrap ? 'border-rose-gold bg-rose-gold' : 'border-champagne'
                  }`}>
                    {giftWrap && <span className="text-cream text-[10px]">✓</span>}
                  </div>
                </button>

                {/* Promo Code */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full py-2.5 pl-9 pr-3 rounded-lg bg-cream border border-champagne/40 text-xs tracking-wider outline-none focus:border-rose-gold/50 transition-colors placeholder:text-muted/50"
                    />
                  </div>
                  <button
                    onClick={() => applyPromo()}
                    className="px-4 py-2.5 rounded-lg bg-pearl border border-champagne/40 text-xs tracking-wider hover:bg-champagne/30 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-[11px] text-success tracking-wider">
                    ✓ {(promoDiscount * 100).toFixed(0)}% discount applied
                  </p>
                )}

                {/* Totals */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted">
                    <span className="text-xs tracking-wider">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span className="text-xs tracking-wider">Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span className="text-xs tracking-wider">Delivery</span>
                    <span>{deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between text-muted">
                      <span className="text-xs tracking-wider">Gift Wrap</span>
                      <span>{formatPrice(5)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2 border-t border-champagne/30">
                    <span className="tracking-wider">Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-2">
                  <button className="w-full py-3.5 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors flex items-center justify-center gap-2">
                    <CreditCard size={16} />
                    Checkout · {formatPrice(total)}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2.5 rounded-full bg-black text-white text-xs tracking-wider flex items-center justify-center gap-1.5">
                       Pay
                    </button>
                    <button className="py-2.5 rounded-full bg-white border border-charcoal/10 text-charcoal text-xs tracking-wider flex items-center justify-center gap-1.5">
                      G Pay
                    </button>
                  </div>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-[11px] text-muted tracking-wider hover:text-error transition-colors py-1"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
