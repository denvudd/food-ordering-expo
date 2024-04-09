import React from "react";
import { randomUUID } from "expo-crypto";
import { CartItem, Product } from "@/types";

interface CartContextType {
  items: CartItem[];
  total: number;
  handleAddItem: (product: Product, size: CartItem["size"]) => void;
  handleUpdateQuantity: (id: string, quantity: -1 | 1) => void;
}

export const CartContext = React.createContext<CartContextType>({
  items: [],
  total: 0,
  handleAddItem: () => {},
  handleUpdateQuantity: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const handleAddItem: CartContextType["handleAddItem"] = (product, size) => {
    const itemInCart = items.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (itemInCart) {
      handleUpdateQuantity(itemInCart.id, 1);
      return undefined;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  const handleUpdateQuantity: CartContextType["handleUpdateQuantity"] = (
    id,
    quantity
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity: item.quantity + quantity,
      };
    });
    const filteredItems = updatedItems.filter((item) => item.quantity > 0);

    setItems(filteredItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{ items, handleAddItem, handleUpdateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
