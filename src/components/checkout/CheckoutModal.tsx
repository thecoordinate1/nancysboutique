'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Truck, CreditCard, ShieldCheck, ChevronRight, ArrowLeft, PackageCheck, Copy, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'details' | 'delivery' | 'payment' | 'success';

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, promoDiscount, giftWrap, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lusaka');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'cod'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  const discountAmount = subtotal * promoDiscount;
  const giftWrapCost = giftWrap ? 5 : 0;
  const deliveryCost = deliveryMethod === 'express' ? 25 : subtotal >= 200 ? 0 : 9.95;
  const finalTotal = subtotal - discountAmount + deliveryCost + giftWrapCost;

  const handlePlaceOrder = () => {
    const generatedOrder = `NB-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    showToast('Order Placed Successfully!', `Order ${generatedOrder} confirmed. Check email for receipt.`, 'success');
  };

  const handleFinish = () => {
    clearCart();
    setStep('details');
    onClose();
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    showToast('Copied Order Reference!', orderNumber, 'info');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 'success') onClose();
          }}
          className="fixed inset-0 overlay-backdrop"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg bg-cream rounded-3xl shadow-2xl border border-champagne/40 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-champagne/40 bg-pearl/40">
            <div className="flex items-center gap-2">
              {step !== 'details' && step !== 'success' && (
                <button
                  onClick={() => setStep(step === 'payment' ? 'delivery' : 'details')}
                  className="p-1 text-muted hover:text-charcoal transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <h2 className="font-serif text-xl tracking-wide font-semibold">
                {step === 'success' ? 'Order Confirmed' : 'Express Checkout'}
              </h2>
            </div>
            <button
              onClick={step === 'success' ? handleFinish : onClose}
              className="touch-target p-1 text-muted hover:text-charcoal transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Step Progress Bar (when ordering) */}
          {step !== 'success' && (
            <div className="px-6 py-2 bg-pearl/20 border-b border-champagne/20 flex items-center justify-between text-[11px] tracking-wider text-muted font-medium">
              <span className={step === 'details' ? 'text-rose-gold font-semibold' : ''}>1. Delivery Address</span>
              <ChevronRight size={12} />
              <span className={step === 'delivery' ? 'text-rose-gold font-semibold' : ''}>2. Delivery Speed</span>
              <ChevronRight size={12} />
              <span className={step === 'payment' ? 'text-rose-gold font-semibold' : ''}>3. Payment</span>
            </div>
          )}

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* STEP 1: Details */}
            {step === 'details' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (name && phone && address) setStep('delivery');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nancy Mulenga"
                    className="w-full px-4 py-3 rounded-xl bg-pearl border border-champagne/60 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+260 97 1234567"
                      className="w-full px-4 py-3 rounded-xl bg-pearl border border-champagne/60 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nancy@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-pearl border border-champagne/60 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street name, building / house number"
                    className="w-full px-4 py-3 rounded-xl bg-pearl border border-champagne/60 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                    City / Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-pearl border border-champagne/60 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-4 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Continue to Delivery Speed
                  <ChevronRight size={16} />
                </button>
              </form>
            )}

            {/* STEP 2: Delivery Speed */}
            {step === 'delivery' && (
              <div className="space-y-4">
                <p className="text-xs text-muted uppercase tracking-wider font-medium">Select Delivery Option</p>
                <div
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    deliveryMethod === 'standard' ? 'border-rose-gold bg-rose-gold/5' : 'border-champagne/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={22} className="text-rose-gold" />
                    <div>
                      <p className="text-sm font-semibold tracking-wide">Standard Delivery</p>
                      <p className="text-xs text-muted">2 - 3 Business Days</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    {subtotal >= 200 ? 'Free' : formatPrice(9.95)}
                  </span>
                </div>

                <div
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    deliveryMethod === 'express' ? 'border-rose-gold bg-rose-gold/5' : 'border-champagne/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={22} className="text-amber-500 fill-amber-500" />
                    <div>
                      <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                        VIP Express 24h Guaranteed
                      </p>
                      <p className="text-xs text-muted">Delivered within 24 hours</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(25)}</span>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3.5 mt-4 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 'payment' && (
              <div className="space-y-4">
                <p className="text-xs text-muted uppercase tracking-wider font-medium">Select Payment Method</p>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'card' ? 'border-rose-gold bg-rose-gold/5' : 'border-champagne/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={22} className="text-rose-gold" />
                    <div>
                      <p className="text-sm font-semibold tracking-wide">Debit / Credit Card</p>
                      <p className="text-xs text-muted">Visa, MasterCard, Amex</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <Check size={18} className="text-rose-gold" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('mobile')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'mobile' ? 'border-rose-gold bg-rose-gold/5' : 'border-champagne/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📱</span>
                    <div>
                      <p className="text-sm font-semibold tracking-wide">Mobile Money</p>
                      <p className="text-xs text-muted">Airtel Money & MTN Money</p>
                    </div>
                  </div>
                  {paymentMethod === 'mobile' && <Check size={18} className="text-rose-gold" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'cod' ? 'border-rose-gold bg-rose-gold/5' : 'border-champagne/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={22} className="text-success" />
                    <div>
                      <p className="text-sm font-semibold tracking-wide">Cash on Delivery</p>
                      <p className="text-xs text-muted">Pay when order is delivered</p>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && <Check size={18} className="text-rose-gold" />}
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-pearl/60 space-y-2 text-xs border border-champagne/30">
                  <div className="flex justify-between text-muted">
                    <span>Items Total ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Delivery ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span>{deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-charcoal pt-2 border-t border-champagne/40">
                    <span>Total Amount</span>
                    <span className="text-rose-gold">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 mt-4 rounded-full bg-rose-gold text-cream text-sm tracking-wider font-semibold hover:bg-rose-gold-light transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Place Order · {formatPrice(finalTotal)}
                </button>
              </div>
            )}

            {/* STEP 4: Success Screen */}
            {step === 'success' && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <PackageCheck size={36} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide">Thank You for Your Order!</h3>
                  <p className="text-xs text-muted mt-1">We&apos;re preparing your luxury items for dispatch.</p>
                </div>

                {/* Order Code Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pearl border border-champagne/40 text-xs font-medium">
                  <span>Order Ref: <strong className="text-charcoal font-semibold">{orderNumber}</strong></span>
                  <button onClick={copyOrderNumber} className="text-rose-gold hover:opacity-80 p-0.5">
                    <Copy size={13} />
                  </button>
                </div>

                {/* Status Timeline */}
                <div className="p-4 rounded-2xl bg-pearl/40 border border-champagne/30 text-left space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Order Status</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-success font-medium">
                      <Check size={14} /> Order Confirmed & Paid
                    </div>
                    <div className="flex items-center gap-2 text-xs text-charcoal/80">
                      <Truck size={14} className="text-rose-gold" /> Estimated Delivery: <strong>{deliveryMethod === 'express' ? 'Tomorrow' : '2-3 Days'}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-full bg-charcoal text-cream text-sm tracking-wider hover:bg-charcoal/90 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
