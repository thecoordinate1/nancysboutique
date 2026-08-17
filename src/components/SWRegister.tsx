'use client';

import { useEffect, useState } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SWRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
        .catch((err) => console.error('PWA SW registration failed:', err));
    } else if ('serviceWorker' in navigator) {
      // Register SW even in dev mode if available
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
        .catch(() => {});
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted PWA installation');
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    <AnimatePresence>
      {showInstallBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm bg-charcoal text-cream p-4 rounded-2xl shadow-2xl border border-rose-gold/30 backdrop-blur-md flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <img src="/icons/icon-192.jpg" alt="Nancy's Boutique App" className="w-12 h-12 rounded-xl object-cover border border-rose-gold/40" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-semibold text-sm tracking-wide text-cream">Nancy&apos;s Boutique App</span>
                <Sparkles size={12} className="text-rose-gold fill-rose-gold" />
              </div>
              <p className="text-[11px] text-cream/70">Install our app for fast checkout & exclusive offers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-full bg-rose-gold text-cream text-xs font-medium tracking-wide hover:bg-rose-gold-light transition-colors flex items-center gap-1 shadow-sm"
            >
              <Download size={13} />
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="p-1 rounded-full text-cream/60 hover:text-cream transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
