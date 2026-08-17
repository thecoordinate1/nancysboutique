'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-charcoal text-cream shadow-xl border border-rose-gold/40 backdrop-blur-md"
          >
            {t.type === 'error' ? (
              <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
            ) : t.type === 'info' ? (
              <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 size={20} className="text-rose-gold flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold tracking-wide text-cream">{t.title}</p>
              {t.description && (
                <p className="text-[11px] text-cream/70 tracking-wider mt-0.5 line-clamp-2">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-cream/50 hover:text-cream transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
