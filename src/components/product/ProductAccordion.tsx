'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string | string[];
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-champagne/40">
      {items.map((item, idx) => (
        <div key={idx} className="border-b border-champagne/40">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="text-sm tracking-wider font-medium group-hover:text-rose-gold transition-colors">
              {item.title}
            </span>
            <motion.span
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-muted" />
            </motion.span>
          </button>

          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-sm text-muted leading-relaxed tracking-wide">
                  {Array.isArray(item.content) ? (
                    <ul className="space-y-2">
                      {item.content.map((line, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-gold mt-0.5 flex-shrink-0">✦</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
