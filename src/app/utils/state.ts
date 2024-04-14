import { create } from 'zustand';

interface ICartState {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct, remove?: boolean) => void;
  updateProductCount: (product: IProduct, value: number) => void;
  clearCart: () => void
  createCart: (products: IProduct[]) => void
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
        // primeira vez que eu estou adicionando
        product.count = 1;
        return { cart: [...state.cart, product] };
      }
    }), 

  removeFromCart: (product, remove = false) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);

      if(existingProduct) {
        if(remove) {
          state.cart = state.cart.filter((p) => p.id !== existingProduct.id);
        }

        if (existingProduct.count > 1) {
          existingProduct.count--;
        }
      }

      return { cart: [...state.cart]}
    }),

  updateProductCount: (product, value) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count = value;
      }

      return { cart: [...state.cart]}
    }),

  clearCart: () =>
    set(() => ({
      cart: []
    })),

  createCart: (products) =>
    set((state) => {
      state.cart = products

      return { cart: [...state.cart]}
    }),
}));

export default useCart;
