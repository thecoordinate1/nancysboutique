'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Paintbrush } from 'lucide-react';

import { formatPrice } from '@/utils/format';

interface CustomizationFormProps {
  onCustomize: (name: string, number: string) => void;
}

export default function CustomizationForm({ onCustomize }: CustomizationFormProps) {
  const [enabled, setEnabled] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  return (
    <div className="border border-champagne/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-full flex items-center gap-3 p-4 transition-colors ${
          enabled ? 'bg-rose-gold/5' : 'hover:bg-pearl/50'
        }`}
      >
        <Paintbrush size={16} className={enabled ? 'text-rose-gold' : 'text-muted'} />
        <div className="flex-1 text-left">
          <p className="text-sm tracking-wider font-medium">Personalize Your Kit</p>
          <p className="text-[11px] text-muted tracking-wider">Add custom name & number · +{formatPrice(15)}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          enabled ? 'border-rose-gold bg-rose-gold' : 'border-champagne'
        }`}>
          {enabled && <span className="text-cream text-[10px]">✓</span>}
        </div>
      </button>

      {enabled && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4"
        >
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label className="text-[11px] uppercase tracking-[0.15em] text-muted block mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value.toUpperCase().slice(0, 15));
                  onCustomize(e.target.value.toUpperCase().slice(0, 15), number);
                }}
                placeholder="e.g., NANCY"
                maxLength={15}
                className="w-full py-2.5 px-3 rounded-lg bg-cream border border-champagne/50 text-sm tracking-widest uppercase outline-none focus:border-rose-gold/50 transition-colors placeholder:text-muted/30 placeholder:normal-case"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.15em] text-muted block mb-1.5">
                Number
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                  setNumber(val);
                  onCustomize(name, val);
                }}
                placeholder="e.g., 10"
                maxLength={2}
                className="w-full py-2.5 px-3 rounded-lg bg-cream border border-champagne/50 text-sm tracking-widest outline-none focus:border-rose-gold/50 transition-colors placeholder:text-muted/30"
              />
            </div>
          </div>

          {/* Preview */}
          {(name || number) && (
            <div className="mt-3 p-3 rounded-lg bg-charcoal/5 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Preview</p>
              <p className="font-serif text-lg tracking-widest">
                {name && <span>{name}</span>}
                {number && <span className="ml-2 text-rose-gold">#{number}</span>}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
