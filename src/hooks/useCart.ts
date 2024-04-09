import { CartContext } from "@/providers/CardProvider";
import React from "react";

export function useCart() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
