import React, { createContext, useReducer, useContext, ReactNode } from "react";
type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

type CartState = {
  items: Product[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: Product }
  | { type: "INCREMENT_QUANTITY"; payload: Product }
  | { type: "DECREMENT_QUANTITY"; payload: Product }
  | { type: "SET_QUANTITY"; payload: Product[] }
  | { type: "EMPTY_CART" };

type CartContextType = {
  cartState: CartState;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  incrementQuantity: (item: Product) => void;
  decrementQuantity: (item: Product) => void;
  getTotalQuantity: () => number;
  setQuantity: (item: Product, quantity: number) => void;
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

    case "SET_QUANTITY":
      return { ...state, items: action.payload };

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

  const addToCart = (item: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (item: Product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const incrementQuantity = (item: Product) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  };

  const decrementQuantity = (item: Product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: item });
  };

  const getTotalQuantity = () => {
    return cartState.items.reduce((total, item) => {
      return total + (item.quantity || 0);
    }, 0);
  };

  const setQuantity = (item: Product, quantity: number) => {
    const updatedItems = cartState.items.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
    );

    dispatch({ type: "SET_QUANTITY", payload: updatedItems });
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
        setQuantity,
        handleEmptyCart,
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
