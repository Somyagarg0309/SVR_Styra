import { create } from 'zustand';
import { CartItemType, ProductType } from '@/types/type';

interface CartState {
  cart: CartItemType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void; 
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product: ProductType) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.images[0],
            link: product.link, // include link
          },
        ],
      };
    }),
    // useCartStore.ts
    // ✅ FIXED REMOVE FROM CART
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),


}));
