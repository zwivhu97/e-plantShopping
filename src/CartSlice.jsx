import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {

    // ➕ Add item to cart
    addItem: (state, action) => {
      const item = action.payload;

      // Check if item already exists
      const existingItem = state.items.find(
        (i) => i.id === item.id
      );

      if (existingItem) {
        // If exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If not, add new item with quantity
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // ❌ Remove item completely
    removeItem: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== id
      );
    },

    // 🔄 Update quantity
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;

      const item = state.items.find(
        (i) => i.id === id
      );

      if (item) {
        item.quantity += amount;

        // Remove if quantity becomes 0 or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.id !== id
          );
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;