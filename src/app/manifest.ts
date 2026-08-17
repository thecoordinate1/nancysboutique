import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nancy's Boutique | Pitch Culture & Luxury",
    short_name: "Nancy's Boutique",
    description: "Authentic football jerseys styled for the modern woman. Pitch culture meets elevated elegance.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#222222',
    icons: [
      {
        src: '/icons/icon-192.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
