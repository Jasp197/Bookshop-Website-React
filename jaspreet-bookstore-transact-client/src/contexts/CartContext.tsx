import React, {createContext, useReducer, useContext, ReactNode, useEffect} from 'react';
import { BookItem, ShoppingCart } from '../types';
import useLocalStorage from "./useLocalStore.hook.ts";

// Define action types
type Action =
  | { type: 'ADD_BOOK'; book: BookItem }
  | { type: 'UPDATE_QUANTITY'; book: BookItem; quantity: number }
  | { type: 'CLEAR_CART' };

// Define the initial state
const initialState: ShoppingCart = new ShoppingCart();

// Create the reducer function
const cartReducer = (state: ShoppingCart, action: Action): ShoppingCart => {
  switch (action.type) {
    case 'ADD_BOOK':
      state.addBook(action.book);
      return Object.assign(new ShoppingCart(), { ...state });
    case 'UPDATE_QUANTITY':
      state.update(action.book, action.quantity );
      return Object.assign(new ShoppingCart(), { ...state });
    case 'CLEAR_CART':
      state.clear();
      return Object.assign(new ShoppingCart(), { ...state });

    default:
      return state;
  }
};



// Create context
interface CartContextType {
  cart: ShoppingCart;
  dispatch: React.Dispatch<Action>;
}

const CartContext = createContext<CartContextType>({
    cart: initialState,
    dispatch: () => null
});


// Create provider component

export const CartProvider = ({ children }: { children: ReactNode }) => {

  // Define a function from a JSON object to a shopping cart
  const toCart = (obj: any) => Object.assign(new ShoppingCart(), obj);

  // Read the initial cart value from local storage if present
  const [localCart, setLocalCart] = useLocalStorage<ShoppingCart>("cart", initialState, toCart);
  const [cart, dispatch] = useReducer(cartReducer, localCart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart, setLocalCart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


// Create custom hook to use shopping cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};