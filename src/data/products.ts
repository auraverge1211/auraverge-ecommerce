import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Aero-X Wireless Headphones',
    description: 'Next-generation noise cancellation with immersive spatial audio.',
    price: 28999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 1240,
    isFeatured: true,
    details: {
      material: 'Premium Aluminum & Leather',
      dimensions: '18 x 16 x 8 cm',
      weight: '250g'
    }
  },
  {
    id: '2',
    name: 'Lumina Smart Watch',
    description: 'Sleek design with advanced health tracking and 7-day battery life.',
    price: 15999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 850,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Minimalist Silk Blazer',
    description: 'Hand-tailored silk blazer for the modern professional.',
    price: 36000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 320
  },
  {
    id: '4',
    name: 'Zenith Ceramic Vase',
    description: 'Handcrafted ceramic piece with a matte obsidian finish.',
    price: 6800,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 150
  },
  {
    id: '5',
    name: 'Onyx Leather Backpack',
    description: 'Water-resistant premium leather with modular compartments.',
    price: 22400,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 440
  },
  {
    id: '6',
    name: 'Prism Mechanical Keyboard',
    description: 'Customizable RGB with hot-swappable tactile switches.',
    price: 12999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 670
  },
  {
    id: '7',
    name: 'Velvet Night Gown',
    description: 'Deep emerald velvet with a tailored fit for evening events.',
    price: 41600,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1539008835279-4346938827a6?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 110
  },
  {
    id: '8',
    name: 'Titanium Coffee Press',
    description: 'Double-walled vacuum insulation for the perfect brew.',
    price: 9600,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1544193159-079c62075270?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 280
  }
];
