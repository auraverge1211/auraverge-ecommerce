import { create } from 'zustand';
import { CartItem, Product, User, Banner, SiteSettings } from './types';
import { products as initialProducts } from './data/products';

interface ShopState {
  products: Product[];
  banners: Banner[];
  settings: SiteSettings;
  cart: CartItem[];
  user: User | null;
  isAdminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addBanner: (banner: Banner) => void;
  updateBanner: (banner: Banner) => void;
  removeBanner: (bannerId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useStore = create<ShopState>((set) => ({
  products: initialProducts,
  banners: [],
  settings: {
    name: 'AuraVerge',
    description: 'A fully functional, immersive 3D-inspired e-commerce platform with premium animations and editorial design.',
    contactEmail: 'contact@auraverge.com',
    instagram: 'auraverge',
    whatsapp: '+9100000000'
  },
  cart: [],
  user: {
    id: 'user_1',
    name: 'AuraVerge CEO',
    email: 'auravergeceo@gmail.com',
    wishlist: [],
    orders: []
  },
  isAdminOpen: false,
  setAdminOpen: (open) => set({ isAdminOpen: open }),
  updateSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (product) => set((state) => ({
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  removeProduct: (productId) => set((state) => ({
    products: state.products.filter(p => p.id !== productId)
  })),
  addBanner: (banner) => set((state) => ({ banners: [banner, ...state.banners] })),
  updateBanner: (banner) => set((state) => ({
    banners: state.banners.map(b => b.id === banner.id ? banner : b)
  })),
  removeBanner: (bannerId) => set((state) => ({
    banners: state.banners.filter(b => b.id !== bannerId)
  })),
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0),
  })),
  clearCart: () => set({ cart: [] }),
  setUser: (user) => set({ user }),
  addToWishlist: (productId) => set((state) => {
    if (!state.user) return state;
    if (state.user.wishlist.includes(productId)) return state;
    return {
      user: {
        ...state.user,
        wishlist: [...state.user.wishlist, productId]
      }
    };
  }),
  removeFromWishlist: (productId) => set((state) => {
    if (!state.user) return state;
    return {
      user: {
        ...state.user,
        wishlist: state.user.wishlist.filter(id => id !== productId)
      }
    };
  }),
}));
