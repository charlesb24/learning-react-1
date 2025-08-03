import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    changed: false,
  },
  reducers: {
    replaceCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.items.find(item => item.id === itemToAdd.id);

      state.changed = true;

      if (!existingItem) {
        state.items.push({
          ...itemToAdd,
          quantity: 1,
          totalPrice: itemToAdd.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      state.totalQuantity++;
      state.totalPrice += itemToAdd.price;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;