'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';
import { getProduct, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/format';
import ImageGallery from '@/components/product/ImageGallery';
import SizeSelector from '@/components/product/SizeSelector';
import CustomizationForm from '@/components/product/CustomizationForm';
import StickyPurchaseBar from '@/components/product/StickyPurchaseBar';
import ProductAccordion from '@/components/product/ProductAccordion';
import ProductCarousel from '@/components/home/ProductCarousel';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const product = getProduct(params.id as string);
  const [selectedSize, setSelectedSize] = useState('');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-3xl mb-3">Product Not Found</h1>
        <p className="text-muted text-sm mb-6">This product may have been moved or is no longer available.</p>
        <Link href="/shop" className="px-6 py-3 rounded-full bg-charcoal text-cream text-sm tracking-wider">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isJersey = product.category === 'club-kits' || product.category === 'national-teams';

  const accordionItems = [
    {
      title: 'Fabric & Fit',
      content: `${product.fabric}\n\n${product.fit}`,
    },
    {
      title: 'Authenticity Guarantee',
      content: product.authenticityNote,
    },
    {
      title: 'Styling Tips',
      content: product.stylingTips,
    },
  ];

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(t => product.tags.includes(t))))
    .slice(0, 8);

  return (
    <div className="pb-20">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-6xl lg:mx-auto lg:px-8 lg:py-8">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={product.images} name={product.name} />
        </div>

        {/* Product Info */}
        <div className="px-4 lg:px-0 pt-6 lg:pt-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-muted tracking-wider mb-4">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>

          {/* Badge */}
          {product.badge && (
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium mb-3 ${
              product.badge === 'new' ? 'bg-charcoal text-cream' :
              product.badge === 'sale' ? 'bg-rose-gold text-cream' :
              product.badge === 'bestseller' ? 'bg-pearl text-charcoal border border-champagne' :
              'bg-charcoal/80 text-cream'
            }`}>
              {product.badge}
            </span>
          )}

          <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-1">{product.subtitle}</p>
          <h1 className="font-serif text-2xl lg:text-3xl tracking-wide mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-muted line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs text-rose-gold tracking-wider font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Trust & Urgency Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] tracking-wide">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-gold/10 text-rose-gold font-medium">
              🔥 Only 3 left in stock
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pearl border border-champagne/40 text-muted">
              👀 14 people viewing this
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pearl border border-champagne/40 text-muted">
              <Clock size={12} className="text-amber-500" /> Order in <strong>3h 24m</strong> for Express Delivery
            </span>
          </div>

          <p className="text-sm text-muted leading-relaxed tracking-wide mb-6">{product.description}</p>

          {/* Color */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.15em] font-medium mb-2">
              Color: <span className="text-muted font-normal">{product.color}</span>
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-5">
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          {/* Customization */}
          {isJersey && (
            <div className="mb-5">
              <CustomizationForm
                onCustomize={(name, num) => {
                  setCustomName(name);
                  setCustomNumber(num);
                }}
              />
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-3 mb-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (selectedSize) {
                  addItem(product, selectedSize, customName, customNumber);
                }
              }}
              disabled={!selectedSize}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm tracking-wider transition-all ${
                selectedSize
                  ? 'bg-charcoal text-cream hover:bg-charcoal/90'
                  : 'bg-champagne text-muted cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={16} />
              {selectedSize ? 'Add to Bag' : 'Select a Size'}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleItem(product.id)}
              className={`w-[52px] h-[52px] rounded-full border flex items-center justify-center transition-all ${
                isInWishlist(product.id)
                  ? 'border-rose-gold bg-rose-gold/5'
                  : 'border-champagne/50 hover:border-charcoal/30'
              }`}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={20}
                className={`transition-all ${
                  isInWishlist(product.id)
                    ? 'text-rose-gold fill-rose-gold animate-heart-pop'
                    : 'text-charcoal'
                }`}
              />
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: ShieldCheck, label: 'Authentic' },
              { icon: Truck, label: 'Free Delivery K 200+' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map(badge => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-pearl/50 border border-champagne/20"
              >
                <badge.icon size={16} className="text-rose-gold" />
                <span className="text-[10px] tracking-wider text-center text-muted">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <ProductAccordion items={accordionItems} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductCarousel
            title="You May Also Love"
            subtitle="Complete the look"
            products={relatedProducts}
          />
        </div>
      )}

      {/* Sticky Purchase Bar */}
      <StickyPurchaseBar
        product={product}
        selectedSize={selectedSize}
        customName={customName}
        customNumber={customNumber}
      />
    </div>
  );
}
