'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 0, 200], [1, 0, -1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      setCurrent(prev => Math.min(prev + 1, images.length - 1));
    } else if (offset > threshold || velocity > 500) {
      setCurrent(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden bg-pearl rounded-b-3xl lg:rounded-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div
              className="w-full h-full"
              style={{ background: `url(${images[current]}) center/cover` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? 'w-8 h-2 bg-rose-gold'
                : 'w-2 h-2 bg-champagne hover:bg-rose-gold-light'
            }`}
            aria-label={`Image ${idx + 1}`}
          />
        ))}
      </div>

      {/* Desktop Thumbnails */}
      <div className="hidden lg:flex gap-2 mt-3 px-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              idx === current ? 'border-rose-gold' : 'border-transparent hover:border-champagne'
            }`}
          >
            <div className="w-full h-full" style={{ background: `url(${img}) center/cover` }} />
          </button>
        ))}
      </div>
    </div>
  );
}
