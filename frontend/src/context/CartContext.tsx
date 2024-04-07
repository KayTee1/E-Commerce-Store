import React, { createContext, useReducer, useContext, ReactNode } from "react";

type Item = {
  id: number;
  title: string;
  quantity?: number;
};

type CartState = {
  items: Item[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Item }
  | { type: "REMOVE_FROM_CART"; payload: Item }
  | { type: "INCREMENT_QUANTITY"; payload: Item }
  | { type: "DECREMENT_QUANTITY"; payload: Item }
  | { type: "EMPTY_CART" };

type CartContextType = {
  cartState: CartState;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  incrementQuantity: (item: Item) => void;
  decrementQuantity: (item: Item) => void;
  getTotalQuantity: () => number;
  handleEmptyCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex && item.quantity !== undefined
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, items: updatedItems };

    case "INCREMENT_QUANTITY":
      const incrementedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity! + 1 }
          : item
      );

      return { ...state, items: incrementedItems };

    case "DECREMENT_QUANTITY":
      const decrementedItems = state.items.map((item) =>
        item.id === action.payload.id &&
        item.quantity !== undefined &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return { ...state, items: decrementedItems };

    case "EMPTY_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item: Item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (item: Item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const incrementQuantity = (item: Item) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  };

  const decrementQuantity = (item: Item) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: item });
  };

  const getTotalQuantity = () => {
    return cartState.items.reduce((total, item) => {
      return total + (item.quantity || 0);
    }, 0);
  };

  const handleEmptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        getTotalQuantity,
        handleEmptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
