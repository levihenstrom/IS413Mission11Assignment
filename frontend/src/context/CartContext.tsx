/* eslint-disable react-refresh/only-export-components -- Provider + useCart hook */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: {
    bookID: number;
    title: string;
    unitPrice: number;
    quantity: number;
  }) => void;
  removeFromCart: (bookID: number) => void;
  updateQuantity: (bookID: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (item: {
      bookID: number;
      title: string;
      unitPrice: number;
      quantity: number;
    }) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.bookID === item.bookID);
        if (existing) {
          return prev.map((c) =>
            c.bookID === item.bookID
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          );
        }
        return [
          ...prev,
          {
            bookID: item.bookID,
            title: item.title,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback((bookID: number) => {
    setCart((prev) => prev.filter((c) => c.bookID !== bookID));
  }, []);

  const updateQuantity = useCallback((bookID: number, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((c) => c.bookID !== bookID));
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.bookID === bookID ? { ...c, quantity } : c))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
