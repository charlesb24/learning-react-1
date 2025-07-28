import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingItemIdx = state.items.findIndex(item => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingItemIdx > -1) {
      const existingItem = state.items[existingItemIdx];

      updatedItems[existingItemIdx] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingItemIdx = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIdx];

    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIdx, 1);
    } else {
      updatedItems[existingItemIdx] = {
        ...updatedItems,
        quantity: existingItem.quantity - 1,
      };
    }

    return {...state, items: updatedItems};
  }

  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export function CartProvider({ children }) {
  const [cart, dispatchCartAction ] = useReducer(cartReducer, {
    items: []
  });

  function addItem(item) {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type: 'CLEAR_CART',
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{ children }</CartContext.Provider>
}

export default CartContext;