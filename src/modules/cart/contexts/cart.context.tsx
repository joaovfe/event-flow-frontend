import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { ValidatedCartItem } from '@/modules/orders/domain';

import { CartItem } from '../domain';

const CART_STORAGE_KEY = '@event-flow/cart';

interface ICartContext {
  items: CartItem[];
  total: number;
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (ticketTypeId: number) => void;
  updateQuantity: (ticketTypeId: number, quantity: number) => void;
  applyValidatedCart: (validatedItems: ValidatedCartItem[]) => void;
  clear: () => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);
CartContext.displayName = 'CartContext';

function clamp(quantity: number, max: number): number {
  if (max > 0) return Math.max(1, Math.min(quantity, max));
  return Math.max(1, quantity);
}

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.ticketTypeId === item.ticketTypeId);

      if (existing) {
        return prev.map((i) =>
          i.ticketTypeId === item.ticketTypeId
            ? { ...i, quantity: clamp(i.quantity + item.quantity, item.maxAvailable) }
            : i,
        );
      }

      return [...prev, { ...item, quantity: clamp(item.quantity, item.maxAvailable) }];
    });
  }

  function removeItem(ticketTypeId: number) {
    setItems((prev) => prev.filter((i) => i.ticketTypeId !== ticketTypeId));
  }

  function updateQuantity(ticketTypeId: number, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.ticketTypeId === ticketTypeId
          ? { ...i, quantity: clamp(quantity, i.maxAvailable) }
          : i,
      ),
    );
  }

  function applyValidatedCart(validatedItems: ValidatedCartItem[]) {
    setItems((prev) =>
      validatedItems
        .filter((line) => line.valid)
        .map((line) => {
          const existing = prev.find((i) => i.ticketTypeId === line.ticketTypeId);

          return {
            ticketTypeId: line.ticketTypeId,
            eventSlug: existing?.eventSlug ?? '',
            eventTitle: line.eventTitle,
            ticketTypeName: line.name,
            price: line.price,
            quantity: clamp(line.quantity, line.available),
            maxAvailable: line.available,
          };
        }),
    );
  }

  function clear() {
    setItems([]);
  }

  const { total, count } = useMemo(
    () => ({
      total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      count: items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, total, count, addItem, removeItem, updateQuantity, applyValidatedCart, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart deve ser usado dentro de um CartProvider');

  return context;
}
