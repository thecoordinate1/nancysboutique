'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sophie M.',
    rating: 5,
    text: '"The Barcelona jersey is SO cute styled with high-waisted jeans! Quality is incredible — you can tell it\'s authentic. Nancy\'s is my new obsession!"',
    product: 'FC Barcelona 24/25 Home',
    avatar: '👩🏻',
  },
  {
    id: 2,
    name: 'Amara K.',
    rating: 5,
    text: '"Bought the Pitch Trench Coat to wear over my Arsenal jersey. The combination is *chef\'s kiss*. Get ready for compliments everywhere."',
    product: 'The Pitch Trench Coat',
    avatar: '👩🏾',
  },
  {
    id: 3,
    name: 'Lin C.',
    rating: 5,
    text: '"I never thought a football jersey could feel this luxurious. The Japan home kit is a work of art. Styling tips from Nancy\'s were on point!"',
    product: 'Japan 2024 Home Jersey',
    avatar: '👩🏻',
  },
  {
    id: 4,
    name: 'Olivia R.',
    rating: 5,
    text: '"The wide-leg trousers are EVERYTHING. They make any jersey look like you\'re ready for Fashion Week. Insanely good quality."',
    product: 'The Pitch Wide-Leg Trousers',
    avatar: '👩🏼',
  },
  {
    id: 5,
    name: 'Fatima A.',
    rating: 5,
    text: '"Ordered the PSG jersey for date night and paired it with the charcoal blazer. My boyfriend couldn\'t believe it was a football kit! Pure genius concept."',
    product: 'Paris Saint-Germain 24/25 Home',
    avatar: '👩🏽',
  },
];

const socialPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80', label: '@sophia.styles', likes: '2.4k' },
  { id: 2, image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80', label: '@pitch.queen', likes: '5.1k' },
  { id: 3, image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80', label: '@jersey.chic', likes: '1.8k' },
  { id: 4, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80', label: '@game.day.glam', likes: '3.2k' },
  { id: 5, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80', label: '@nancys.fan', likes: '4.7k' },
  { id: 6, image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80', label: '@style.pitch', likes: '2.9k' },
];

export default function SocialFeed() {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (dir: 'left' | 'right') => {
    if (!reviewsRef.current) return;
    const amount = reviewsRef.current.clientWidth * 0.8;
    reviewsRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-10">
      {/* Reviews */}
      <div className="mb-12">
        <div className="flex items-end justify-between px-4 lg:px-8 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-1">Our Community</p>
            <h2 className="font-serif text-2xl lg:text-3xl tracking-wide">What They&apos;re Saying</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scrollReviews('left')} className="touch-target rounded-full border border-champagne hover:border-rose-gold transition-colors" aria-label="Previous reviews">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scrollReviews('right')} className="touch-target rounded-full border border-champagne hover:border-rose-gold transition-colors" aria-label="Next reviews">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={reviewsRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-8 snap-x">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-[28vw] snap-start p-5 rounded-2xl bg-pearl/50 border border-champagne/30"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-rose-gold fill-rose-gold" />
                ))}
              </div>
              <p className="text-sm leading-relaxed tracking-wide text-charcoal/80 mb-4 italic">
                {review.text}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-champagne/30">
                <span className="text-xl">{review.avatar}</span>
                <div>
                  <p className="text-xs font-medium tracking-wider">{review.name}</p>
                  <p className="text-[10px] text-muted tracking-wider">on {review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Grid */}
      <div className="px-4 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-1">#NancysBoutique</p>
          <h2 className="font-serif text-2xl tracking-wide">As Seen On</h2>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {socialPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  <p className="text-cream text-xs font-medium">{post.label}</p>
                  <p className="text-cream/70 text-[10px] mt-0.5">♥ {post.likes}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
