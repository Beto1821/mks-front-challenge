import { create } from 'zustand';

interface ICartState {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
}

const useCart = create<ICartState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count++;
        return { cart: [...state.cart] };
      } else {
        product.count = 1;
        return { cart: [...state.cart, product] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.map((product) => {
        if (product.id === productId) {
          if (product.count > 1) {
            product.count--;
            return product;
          }
        }
        return product;
      }).filter((product) => product.count > 0);
      return { cart: updatedCart };
    }),
}));

export default useCart;
