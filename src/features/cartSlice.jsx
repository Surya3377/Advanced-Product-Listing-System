import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Otherwise add new item with quantity 1
        state.items.push({ ...product, quantity: 1 });
      }

      // Update total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex !== -1) {
        // If quantity is 1, remove the item
        if (state.items[existingItemIndex].quantity === 1) {
          state.items = state.items.filter((item) => item.id !== productId);
        } else {
          // Otherwise decrease quantity
          state.items[existingItemIndex].quantity -= 1;
        }
      }

      // Update total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Otherwise update quantity
          state.items[existingItemIndex].quantity = quantity;
        }
      }

      // Update total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
