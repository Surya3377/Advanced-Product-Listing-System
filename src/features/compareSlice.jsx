import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCompareModalOpen: false,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists && state.items.length < 4) {
        state.items.push(action.payload);
        state.isCompareModalOpen = true;
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleCompareModal: (state, action) => {
      state.isCompareModalOpen = action.payload;
    },
    clearCompare: (state) => {
      state.items = [];
      state.isCompareModalOpen = false;
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  toggleCompareModal,
  clearCompare,
} = compareSlice.actions;

export default compareSlice.reducer;
