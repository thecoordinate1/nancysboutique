export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  category: 'club-kits' | 'national-teams' | 'trench-tailoring' | 'athleisure' | 'accessories';
  tags: string[];
  description: string;
  fabric: string;
  fit: string;
  authenticityNote: string;
  stylingTips: string[];
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  color: string;
  inStock: boolean;
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  gradient: string;
  productIds: string[];
}

export interface LookbookOutfit {
  id: string;
  name: string;
  image: string;
  items: { productId: string; x: number; y: number }[];
}

const generateGradient = (h: number) =>
  `linear-gradient(135deg, hsl(${h}, 25%, 85%), hsl(${h + 30}, 20%, 75%))`;

export const products: Product[] = [
  {
    id: 'barcelona-24-home',
    name: 'FC Barcelona 24/25 Home Jersey',
    subtitle: 'Blaugrana Heritage',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'club-kits',
    tags: ['la-liga', 'club-kits', 'new-in'],
    description: 'The iconic Blaugrana stripes reimagined with a modern feminine silhouette. Crafted from recycled performance fabric for an effortless pitch-to-street transition.',
    fabric: '100% Recycled Polyester, Dri-FIT ADV technology, lightweight mesh ventilation panels',
    fit: 'Relaxed feminine fit with slightly cropped hem. We recommend sizing up for an oversized streetwear look.',
    authenticityNote: 'Authentic Nike product with official FC Barcelona crest and La Liga patch. Hologram verification tag included.',
    stylingTips: ['Pair with high-waisted cream trousers and gold hoops for date night.', 'Layer under a structured blazer for effortless "model off duty" energy.', 'Tie at the waist with a midi skirt and strappy heels.'],
    badge: 'new',
    color: 'Blue/Red',
    inStock: true,
  },
  {
    id: 'real-madrid-24-away',
    name: 'Real Madrid 24/25 Away Jersey',
    subtitle: 'Coral Sunset Edition',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'club-kits',
    tags: ['la-liga', 'club-kits', 'bestseller'],
    description: 'Real Madrid\'s stunning coral away kit — a feminine favorite for its sunset-inspired palette. Tailored for everyday elegance.',
    fabric: '100% Recycled Polyester, adidas HEAT.RDY cooling technology',
    fit: 'Standard fit with a slightly tapered waist for a flattering silhouette.',
    authenticityNote: 'Authentic adidas product with embroidered Real Madrid crest. Jock tag authentication.',
    stylingTips: ['Style with white wide-leg pants and platform sneakers.', 'Knot at the front over a pleated skirt for brunch.', 'Layer with a camel trench coat for autumn vibes.'],
    badge: 'bestseller',
    color: 'Coral',
    inStock: true,
  },
  {
    id: 'psg-24-home',
    name: 'Paris Saint-Germain 24/25 Home',
    subtitle: 'Parisian Midnight',
    price: 139,
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'club-kits',
    tags: ['ligue-1', 'club-kits', 'new-in'],
    description: 'Parisian chic meets pitch culture. The deep navy PSG home jersey with signature red accent — the ultimate date night jersey.',
    fabric: 'Recycled Polyester blend with Nike Dri-FIT technology',
    fit: 'Slim feminine fit with curved hem.',
    authenticityNote: 'Authentic Nike product with woven PSG crest and Ligue 1 sleeve patch.',
    stylingTips: ['Tuck into leather pants with ankle boots for evening.', 'Wear oversized with thigh-high boots.', 'Style with a beret and red lip for full Parisian energy.'],
    badge: 'new',
    color: 'Navy/Red',
    inStock: true,
  },
  {
    id: 'arsenal-24-away',
    name: 'Arsenal 24/25 Away Jersey',
    subtitle: 'Rose Quartz',
    price: 119,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'club-kits',
    tags: ['premier-league', 'club-kits', 'game-day-glam'],
    description: 'Arsenal\'s rose-tinted away kit is the ultimate girly football jersey. Soft, romantic, and undeniably chic.',
    fabric: 'Recycled Polyester with adidas AEROREADY moisture management',
    fit: 'Relaxed fit with dropped shoulder seams.',
    authenticityNote: 'Authentic adidas product with embroidered cannon crest.',
    stylingTips: ['Pair with matching pink accessories for a tonal look.', 'Style with baggy jeans and chunky sneakers.', 'Dress up with a satin midi skirt and heeled mules.'],
    badge: 'bestseller',
    color: 'Rose/Pink',
    inStock: true,
  },
  {
    id: 'brazil-24-home',
    name: 'Brazil 2024 Home Jersey',
    subtitle: 'Seleção Gold',
    price: 135,
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'national-teams',
    tags: ['national-teams', 'new-in'],
    description: 'The golden energy of Brazil\'s iconic home shirt — vibrant, bold, and radiating confidence.',
    fabric: 'Nike Dri-FIT ADV recycled fabric with ventilation zones',
    fit: 'Athletic feminine fit with shaped seams.',
    authenticityNote: 'Authentic Nike product with embroidered CBF crest and FIFA badge.',
    stylingTips: ['Pair with white linen shorts for summer.', 'Layer under a denim jacket for casual cool.', 'Style with gold jewelry for maximum impact.'],
    color: 'Gold/Green',
    inStock: true,
  },
  {
    id: 'japan-24-home',
    name: 'Japan 2024 Home Jersey',
    subtitle: 'Samurai Blue Wave',
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'national-teams',
    tags: ['national-teams', 'game-day-glam', 'limited'],
    description: 'Japan\'s wave-inspired jersey — where traditional art meets modern sportswear. A collector\'s piece and street style standout.',
    fabric: 'adidas HEAT.RDY technology with recycled polyester',
    fit: 'Regular fit with subtle Japanese-inspired tailoring details.',
    authenticityNote: 'Authentic adidas product with JFA crest. Limited edition packaging.',
    stylingTips: ['Wear with pleated wide-leg trousers for a fashion-forward look.', 'Style with minimal accessories to let the design speak.', 'Layer under an oversized blazer for editorial vibes.'],
    badge: 'limited',
    color: 'Indigo Blue',
    inStock: true,
  },
  {
    id: 'england-24-away',
    name: 'England 2024 Away Jersey',
    subtitle: 'Royal Purple Edition',
    price: 119,
    images: [
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'national-teams',
    tags: ['national-teams', 'bestseller'],
    description: 'England\'s regal purple away kit — sophisticated, commanding, and effortlessly stylish off the pitch.',
    fabric: 'Nike Dri-FIT recycled polyester with mesh ventilation',
    fit: 'Relaxed unisex fit. Size down for a more fitted look.',
    authenticityNote: 'Authentic Nike product with embroidered Three Lions crest.',
    stylingTips: ['Style with cream wide-leg pants for a regal look.', 'Wear with leather shorts and knee-high boots.', 'Pair with gold accessories for a luxury finish.'],
    color: 'Purple',
    inStock: true,
  },
  {
    id: 'trench-cream',
    name: 'The Pitch Trench Coat',
    subtitle: 'Cream Cashmere Blend',
    price: 289,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'trench-tailoring',
    tags: ['trench-tailoring', 'new-in', 'bestseller'],
    description: 'Our signature trench coat designed to be styled over jerseys. A wardrobe essential that bridges sportswear and luxury.',
    fabric: '70% Wool, 20% Cashmere, 10% Silk. Fully lined in champagne satin.',
    fit: 'Relaxed oversized fit with adjustable belt. Falls at mid-calf.',
    authenticityNote: 'Nancy\'s Boutique original design. Made in Italy. Numbered edition.',
    stylingTips: ['Layer over any jersey with heeled boots for instant sophistication.', 'Belt at the waist over a jersey dress for shape.', 'Drape over shoulders cape-style for editorial flair.'],
    badge: 'new',
    color: 'Cream',
    inStock: true,
  },
  {
    id: 'blazer-charcoal',
    name: 'The Match Day Blazer',
    subtitle: 'Soft Charcoal Wool',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'trench-tailoring',
    tags: ['trench-tailoring', 'game-day-glam'],
    description: 'An oversized boyfriend blazer cut to perfection. The ultimate jersey layering piece for elevated game day style.',
    fabric: '100% Italian Wool with satin lining. Mother-of-pearl buttons.',
    fit: 'Oversized relaxed fit. We recommend your usual size for the intended oversized look.',
    authenticityNote: 'Nancy\'s Boutique original. Handcrafted in Portugal.',
    stylingTips: ['Layer over a cropped jersey with cycling shorts.', 'Pair with matching wide-leg trousers for a power suit moment.', 'Throw over a jersey and mini skirt for night out.'],
    color: 'Charcoal',
    inStock: true,
  },
  {
    id: 'jersey-dress-black',
    name: 'The Jersey Dress',
    subtitle: 'Noir Athleisure',
    price: 165,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'athleisure',
    tags: ['athleisure', 'new-in'],
    description: 'A sleek T-shirt dress inspired by jersey silhouettes. Features side slits and a relaxed dropped hem for effortless cool.',
    fabric: 'Premium jersey cotton blend with stretch. Soft-touch finish.',
    fit: 'Relaxed fit falling at mid-thigh. Side slits for movement.',
    authenticityNote: 'Nancy\'s Boutique original design.',
    stylingTips: ['Wear with chunky sneakers for casual weekend style.', 'Add a belt and heeled boots for evening.', 'Layer under the Pitch Trench Coat.'],
    badge: 'new',
    color: 'Black',
    inStock: true,
  },
  {
    id: 'track-pants-champagne',
    name: 'Luxury Track Pants',
    subtitle: 'Champagne Silk Blend',
    price: 175,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'athleisure',
    tags: ['athleisure', 'game-day-glam'],
    description: 'Elevated track pants in a luxurious champagne silk blend. The perfect pairing for any jersey.',
    fabric: '60% Silk, 40% Cotton. Elasticated waist with satin drawstring.',
    fit: 'Relaxed straight leg with a high rise.',
    authenticityNote: 'Nancy\'s Boutique original design.',
    stylingTips: ['Pair with any jersey and heeled mules for effortless chic.', 'Style with a crop top and oversized blazer.', 'Wear with sneakers for luxury casual.'],
    color: 'Champagne',
    inStock: true,
  },
  {
    id: 'crop-hoodie-rose',
    name: 'Cropped Stadium Hoodie',
    subtitle: 'Dusty Rose',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'athleisure',
    tags: ['athleisure', 'new-in'],
    description: 'A cropped hoodie in the softest dusty rose. Perfect for layering over or under your favorite jersey.',
    fabric: '100% Organic Cotton French Terry. Brushed interior for extra softness.',
    fit: 'Cropped fit sitting at the natural waist. Oversized sleeves.',
    authenticityNote: 'Nancy\'s Boutique original design. OEKO-TEX certified.',
    stylingTips: ['Layer under a jersey for extra warmth at the stadium.', 'Wear with high-waisted joggers for full athleisure.', 'Pair with the Luxury Track Pants for a tonal set.'],
    color: 'Dusty Rose',
    inStock: true,
  },
  {
    id: 'inter-milan-24-home',
    name: 'Inter Milan 24/25 Home Jersey',
    subtitle: 'Nerazzurri Night',
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'club-kits',
    tags: ['serie-a', 'club-kits'],
    description: 'Inter Milan\'s bold blue and black stripes — a statement jersey for those who love dramatic contrast.',
    fabric: 'Nike Dri-FIT recycled polyester with engineered mesh',
    fit: 'Standard feminine fit.',
    authenticityNote: 'Authentic Nike product with embroidered Inter crest.',
    stylingTips: ['Wear with black leather pants for a sleek monochrome look.', 'Style with a camel coat for Italian sophistication.', 'Pair with gold accessories and heeled boots.'],
    color: 'Blue/Black',
    inStock: true,
  },
  {
    id: 'ac-milan-24-away',
    name: 'AC Milan 24/25 Away Jersey',
    subtitle: 'Ivory Elegance',
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'club-kits',
    tags: ['serie-a', 'club-kits', 'game-day-glam'],
    description: 'AC Milan\'s ivory away kit — minimalist, refined, and impossibly chic. Our customers\' favorite "everyday jersey."',
    fabric: 'PUMA dryCELL technology recycled polyester',
    fit: 'Relaxed fit with a modern dropped shoulder.',
    authenticityNote: 'Authentic PUMA product with woven AC Milan roundel.',
    stylingTips: ['Tuck into tailored trousers for a clean look.', 'Style with a silk midi skirt for feminine contrast.', 'Wear with the Pitch Trench Coat for full Nancy\'s styling.'],
    badge: 'bestseller',
    color: 'Ivory',
    inStock: true,
  },
  {
    id: 'scarf-cashmere-navy',
    name: 'The Stadium Scarf',
    subtitle: 'Navy Cashmere',
    price: 85,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['One Size'],
    category: 'accessories',
    tags: ['accessories', 'new-in'],
    description: 'A luxuriously soft cashmere scarf in deep navy. The perfect finishing touch for any match day outfit.',
    fabric: '100% Grade A Mongolian Cashmere. 180cm x 70cm.',
    fit: 'One Size. Oversized proportions for draping and wrapping.',
    authenticityNote: 'Nancy\'s Boutique original design.',
    stylingTips: ['Drape over one shoulder with a jersey and jeans.', 'Wrap as a shawl over an evening look.', 'Use as a belt tied at the waist over a blazer.'],
    color: 'Navy',
    inStock: true,
  },
  {
    id: 'argentina-24-home',
    name: 'Argentina 2024 Home Jersey',
    subtitle: 'Albiceleste Classic',
    price: 135,
    images: [
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'national-teams',
    tags: ['national-teams', 'new-in'],
    description: 'Argentina\'s timeless sky blue and white stripes — a champion\'s jersey with unmatched elegance.',
    fabric: 'adidas HEAT.RDY recycled polyester with cooling zones',
    fit: 'Athletic feminine fit with shaped waist.',
    authenticityNote: 'Authentic adidas product with AFA crest and 3-star badge.',
    stylingTips: ['Style with white wide-leg trousers for a clean look.', 'Pair with denim shorts and espadrilles for summer.', 'Layer under a white blazer for smart-casual.'],
    color: 'Sky Blue/White',
    inStock: true,
  },
  {
    id: 'wide-leg-cream',
    name: 'The Pitch Wide-Leg Trousers',
    subtitle: 'Warm Cream',
    price: 155,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'trench-tailoring',
    tags: ['trench-tailoring', 'bestseller'],
    description: 'Wide-leg trousers designed as the ultimate jersey companion. Tailored in warm cream with a fluid drape.',
    fabric: 'Viscose-Linen blend. Fully lined. Invisible side zip.',
    fit: 'High-rise wide leg. Falls at full length.',
    authenticityNote: 'Nancy\'s Boutique original design. Made in Portugal.',
    stylingTips: ['Pair with any jersey tucked in for an elevated look.', 'Style with the Match Day Blazer for a full set.', 'Wear with strappy heels and gold earrings.'],
    color: 'Cream',
    inStock: true,
  },
  {
    id: 'chelsea-24-third',
    name: 'Chelsea 24/25 Third Jersey',
    subtitle: 'Sage Green Dream',
    price: 119,
    originalPrice: 139,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'club-kits',
    tags: ['premier-league', 'club-kits', 'sale'],
    description: 'Chelsea\'s sage green third kit — earthy, grounding, and incredibly versatile for everyday styling.',
    fabric: 'Nike Dri-FIT recycled polyester blend',
    fit: 'Relaxed unisex fit.',
    authenticityNote: 'Authentic Nike product with embroidered Chelsea lion crest.',
    stylingTips: ['Pair with cream wide-legs for a nature-inspired palette.', 'Style with brown leather accessories.', 'Layer under a camel or cream coat.'],
    badge: 'sale',
    color: 'Sage Green',
    inStock: true,
  },
  {
    id: 'joggers-noir',
    name: 'Silk-Touch Joggers',
    subtitle: 'Midnight Noir',
    price: 135,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'athleisure',
    tags: ['athleisure', 'game-day-glam'],
    description: 'Elevated joggers in midnight black with a silk-touch finish. For those who refuse to choose between comfort and luxury.',
    fabric: 'Silk-touch modal blend with stretch. Satin drawstring waist.',
    fit: 'Tapered fit with elasticated cuffs. High rise.',
    authenticityNote: 'Nancy\'s Boutique original design.',
    stylingTips: ['Pair with any bright jersey for contrast.', 'Style with heeled mules for dressed-up athleisure.', 'Wear with the Cropped Stadium Hoodie for a full set.'],
    color: 'Black',
    inStock: true,
  },
  {
    id: 'jersey-bag-gold',
    name: 'The Match Day Tote',
    subtitle: 'Champagne Gold',
    price: 75,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['One Size'],
    category: 'accessories',
    tags: ['accessories', 'bestseller'],
    description: 'A luxe vegan leather tote in champagne gold. Fits everything you need for match day and beyond.',
    fabric: 'Premium vegan leather with gold-tone hardware. Cotton canvas lining.',
    fit: 'One Size. 40cm x 35cm x 12cm. Adjustable strap.',
    authenticityNote: 'Nancy\'s Boutique original design.',
    stylingTips: ['Carry to the stadium with any outfit.', 'Use as an everyday bag — it goes with everything.', 'Style with gold jewelry for a coordinated look.'],
    color: 'Champagne Gold',
    inStock: true,
  },
];

export const collections: Collection[] = [
  {
    id: 'new-in',
    name: 'New In',
    subtitle: 'Just Arrived',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(350),
    productIds: products.filter(p => p.tags.includes('new-in')).map(p => p.id),
  },
  {
    id: 'game-day-glam',
    name: 'Game Day Glam',
    subtitle: 'Stadium to Supper Club',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(30),
    productIds: products.filter(p => p.tags.includes('game-day-glam')).map(p => p.id),
  },
  {
    id: 'club-kits',
    name: 'Club Kits',
    subtitle: 'Your Team, Your Style',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(220),
    productIds: products.filter(p => p.category === 'club-kits').map(p => p.id),
  },
  {
    id: 'national-teams',
    name: 'National Teams',
    subtitle: 'Wear Your Nation',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(140),
    productIds: products.filter(p => p.category === 'national-teams').map(p => p.id),
  },
  {
    id: 'trench-tailoring',
    name: 'Trench & Tailoring',
    subtitle: 'Elevated Layers',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(35),
    productIds: products.filter(p => p.category === 'trench-tailoring').map(p => p.id),
  },
  {
    id: 'athleisure',
    name: 'Athleisure',
    subtitle: 'Luxury Comfort',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    gradient: generateGradient(270),
    productIds: products.filter(p => p.category === 'athleisure').map(p => p.id),
  },
];

export const lookbookOutfits: LookbookOutfit[] = [
  {
    id: 'look-1',
    name: 'The Match Day Date',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'real-madrid-24-away', x: 50, y: 35 },
      { productId: 'wide-leg-cream', x: 45, y: 65 },
      { productId: 'jersey-bag-gold', x: 75, y: 55 },
    ],
  },
  {
    id: 'look-2',
    name: 'Parisian Pitch Chic',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'psg-24-home', x: 50, y: 30 },
      { productId: 'blazer-charcoal', x: 50, y: 45 },
      { productId: 'joggers-noir', x: 50, y: 70 },
    ],
  },
  {
    id: 'look-3',
    name: 'Golden Hour Stadium',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'brazil-24-home', x: 50, y: 32 },
      { productId: 'track-pants-champagne', x: 48, y: 65 },
      { productId: 'scarf-cashmere-navy', x: 70, y: 25 },
    ],
  },
  {
    id: 'look-4',
    name: 'Rose All Day',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'arsenal-24-away', x: 50, y: 35 },
      { productId: 'crop-hoodie-rose', x: 48, y: 20 },
      { productId: 'wide-leg-cream', x: 50, y: 68 },
    ],
  },
];

export const getProduct = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getCollectionProducts = (collectionId: string): Product[] => {
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) return [];
  return collection.productIds.map(id => getProduct(id)).filter((p): p is Product => !!p);
};

export const getProductsByCategory = (category: string): Product[] =>
  category === 'all' ? products : products.filter(p => p.category === category || p.tags.includes(category));

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.color.toLowerCase().includes(q)
  );
};
