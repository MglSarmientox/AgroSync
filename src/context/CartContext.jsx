import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

  const addToCart = useCallback((product, qty = 1) => {
    const amount = Math.max(1, Math.round(qty));
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + amount } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          qty: amount,
          image: product.image,
          imageBg: product.imageBg,
          companyId: product.companyId,
          companyName: product.companyName,
        },
      ];
    });
  }, []);

  const setQty = useCallback((productId, qty) => {
    const amount = Math.max(0, Math.round(qty));
    setItems((prev) =>
      amount === 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty: amount } : i))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        setQty,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}