'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { collections } from '@/data/products';

export default function CollectionsGrid() {
  return (
    <section className="px-4 lg:px-8 py-10">
      <div className="text-center mb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">Curated For You</p>
        <h2 className="font-serif text-3xl lg:text-4xl tracking-wide">Shop by Collection</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {collections.slice(0, 6).map((collection, idx) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              href={`/shop?collection=${collection.id}`}
              className="group relative block aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden"
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: collection.gradient }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                  {collection.subtitle}
                </p>
                <h3 className="font-serif text-lg lg:text-xl text-cream tracking-wide">
                  {collection.name}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-cream/70 group-hover:text-cream transition-colors">
                  <span className="text-xs tracking-wider">Explore</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
