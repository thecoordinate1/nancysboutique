'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Truck, RotateCcw, Sparkles, ArrowRight, Check } from 'lucide-react';

const perks = [
  { icon: Crown, title: 'VIP Early Access', desc: 'Be first to shop new drops & limited editions' },
  { icon: Sparkles, title: 'Personal Styling', desc: 'Free jersey styling consultations' },
  { icon: Truck, title: 'Free Delivery', desc: 'Complimentary delivery on all VIP orders' },
  { icon: RotateCcw, title: 'Extended Returns', desc: '60-day return window for VIP members' },
];

export default function VIPSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-gold mb-3">
            ✦ Exclusive Benefits ✦
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide mb-3">
            Join The VIP Club
          </h2>
          <p className="text-sm text-muted tracking-wide max-w-md mx-auto">
            Unlock exclusive access to new drops, personal styling, and members-only perks.
          </p>
        </motion.div>

        {/* Perks Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 mb-10">
          {perks.map((perk, idx) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-pearl/50 border border-champagne/30"
            >
              <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto mb-3">
                <perk.icon size={18} className="text-rose-gold" />
              </div>
              <h3 className="text-xs font-semibold tracking-wider mb-1">{perk.title}</h3>
              <p className="text-[11px] text-muted leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-success/10 text-success"
            >
              <Check size={18} />
              <span className="text-sm tracking-wider">Welcome to the club! Check your inbox ✦</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full py-4 pl-5 pr-14 rounded-full bg-pearl border border-champagne/50 text-sm tracking-wide outline-none focus:border-rose-gold/50 transition-colors placeholder:text-muted/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center hover:bg-rose-gold transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          <p className="text-[10px] text-muted mt-3 tracking-wider">
            By subscribing, you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
