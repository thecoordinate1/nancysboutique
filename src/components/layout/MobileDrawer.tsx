'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Crown, Headset, ShieldCheck, Sparkles, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: 'Collections',
    items: [
      { label: 'Club Kits', href: '/shop?category=club-kits', icon: '⚽' },
      { label: 'National Teams', href: '/shop?category=national-teams', icon: '🏆' },
      { label: 'Trench & Tailoring', href: '/shop?category=trench-tailoring', icon: '🧥' },
      { label: 'Athleisure', href: '/shop?category=athleisure', icon: '✨' },
      { label: 'Accessories', href: '/shop?category=accessories', icon: '👜' },
    ],
  },
  {
    title: 'Discover',
    items: [
      { label: 'New In', href: '/shop?collection=new-in', icon: '🆕' },
      { label: 'Game Day Glam', href: '/shop?collection=game-day-glam', icon: '💫' },
      { label: 'Lookbook', href: '/lookbook', icon: '📸' },
      { label: 'Sale', href: '/shop?tag=sale', icon: '🏷️' },
    ],
  },
];

const quickLinks = [
  { label: 'VIP Club', icon: Crown, href: '#vip' },
  { label: 'Customer Care', icon: Headset, href: '#care' },
  { label: 'Authenticity Promise', icon: ShieldCheck, href: '#auth' },
  { label: 'Styling Service', icon: Sparkles, href: '#style' },
];

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] overlay-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-[380px] bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-champagne/40">
              <h2 className="font-serif text-2xl tracking-wider">
                <span className="font-light text-charcoal">Nancy&apos;s</span>{' '}
                <span className="font-bold italic bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(183,110,121,0.4)]">
                  Boutique
                </span>
              </h2>
              <button onClick={onClose} className="touch-target" aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto py-4">
              {menuSections.map((section, sIdx) => (
                <div key={section.title} className={sIdx > 0 ? 'mt-6' : ''}>
                  <h3 className="px-6 text-[11px] uppercase tracking-[0.2em] text-muted font-medium mb-3">
                    {section.title}
                  </h3>
                  {section.items.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-6 py-3.5 hover:bg-pearl/60 transition-colors group"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-[15px] tracking-wide group-hover:text-rose-gold transition-colors">
                            {item.label}
                          </span>
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-muted group-hover:text-rose-gold transition-colors"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}

              {/* Preferences / Theme */}
              <div className="mt-6 pt-6 border-t border-champagne/40">
                <h3 className="px-6 text-[11px] uppercase tracking-[0.2em] text-muted font-medium mb-3">
                  Preferences
                </h3>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-pearl/60 transition-colors group text-left"
                >
                  <span className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Sun size={18} strokeWidth={1.5} className="text-amber-400" />
                    ) : (
                      <Moon size={18} strokeWidth={1.5} className="text-muted" />
                    )}
                    <span className="text-sm tracking-wide text-muted group-hover:text-charcoal transition-colors">
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </span>
                  <span className="text-xs text-rose-gold font-medium uppercase tracking-wider">
                    {theme === 'dark' ? 'Active' : 'Off'}
                  </span>
                </button>
              </div>

              {/* Quick Links */}
              <div className="mt-4 pt-4 border-t border-champagne/40">
                <h3 className="px-6 text-[11px] uppercase tracking-[0.2em] text-muted font-medium mb-3">
                  Quick Links
                </h3>
                {quickLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-pearl/60 transition-colors group"
                  >
                    <link.icon size={18} strokeWidth={1.5} className="text-muted group-hover:text-rose-gold transition-colors" />
                    <span className="text-sm tracking-wide text-muted group-hover:text-charcoal transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-champagne/40 bg-pearl/30">
              <p className="text-[11px] text-center text-muted tracking-wider">
                ✦ Free delivery on orders K 200+ ✦
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
