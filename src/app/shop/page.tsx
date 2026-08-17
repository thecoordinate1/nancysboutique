'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products, collections, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/format';
import CategoryPills from '@/components/home/CategoryPills';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialCollection = searchParams.get('collection') || '';

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>('newest');
  const [showSort, setShowSort] = useState(false);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [];

    if (initialCollection) {
      const col = collections.find(c => c.id === initialCollection);
      if (col) {
        filtered = col.productIds
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => !!p);
      }
    } else if (category === 'all') {
      filtered = [...products];
    } else {
      filtered = products.filter(
        p => p.category === category || p.tags.includes(category)
      );
    }

    switch (sort) {
      case 'price-low': return filtered.sort((a, b) => a.price - b.price);
      case 'price-high': return filtered.sort((a, b) => b.price - a.price);
      case 'popular': return filtered.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0));
      default: return filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    }
  }, [category, sort, initialCollection]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
    { value: 'popular', label: 'Popular' },
  ];

  const collectionInfo = initialCollection
    ? collections.find(c => c.id === initialCollection)
    : null;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">
          {collectionInfo ? collectionInfo.subtitle : 'Discover'}
        </p>
        <h1 className="font-serif text-3xl lg:text-4xl tracking-wide">
          {collectionInfo ? collectionInfo.name : 'Shop All'}
        </h1>
        <p className="text-sm text-muted tracking-wide mt-2">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Category Pills */}
      {!initialCollection && (
        <CategoryPills active={category} onChange={setCategory} />
      )}

      {/* Sort & Filter Bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-y border-champagne/30">
        <button className="flex items-center gap-2 text-xs tracking-wider text-muted hover:text-charcoal transition-colors">
          <SlidersHorizontal size={14} />
          Filters
        </button>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 text-xs tracking-wider text-muted hover:text-charcoal transition-colors"
          >
            Sort: {sortOptions.find(o => o.value === sort)?.label}
            <ChevronDown size={12} />
          </button>
          {showSort && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
              <div className="absolute right-0 top-full mt-1 bg-cream border border-champagne rounded-xl shadow-lg py-1 min-w-[180px] z-50">
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-xs tracking-wider hover:bg-pearl transition-colors ${
                      sort === opt.value ? 'text-rose-gold font-medium' : 'text-charcoal'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 px-4 lg:px-8 mt-4">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="group"
          >
            <Link href={`/product/${product.id}`} className="block relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: `url(${product.images[0]}) center/cover` }}
                />

                {product.badge && (
                  <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium ${
                    product.badge === 'new' ? 'bg-charcoal text-cream' :
                    product.badge === 'sale' ? 'bg-rose-gold text-cream' :
                    product.badge === 'bestseller' ? 'bg-cream/90 text-charcoal' :
                    'bg-charcoal/80 text-cream'
                  }`}>
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product.id); }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={14}
                    className={isInWishlist(product.id) ? 'text-rose-gold fill-rose-gold' : 'text-charcoal'}
                  />
                </button>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product, 'M'); }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full bg-charcoal/90 backdrop-blur-sm text-cream text-[11px] tracking-wider"
                  >
                    <Plus size={12} /> Quick Add
                  </button>
                </div>
              </div>
            </Link>

            <div className="mt-2.5 px-0.5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{product.subtitle}</p>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-medium tracking-wide line-clamp-1 hover:text-rose-gold transition-colors mt-0.5">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="font-serif text-xl mb-2">No products found</p>
          <p className="text-sm text-muted tracking-wide">Try adjusting your filters or browse all products.</p>
          <button
            onClick={() => setCategory('all')}
            className="mt-4 px-6 py-2.5 rounded-full bg-charcoal text-cream text-sm tracking-wider"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><p className="text-muted">Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
