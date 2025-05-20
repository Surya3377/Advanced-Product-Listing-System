import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import filtersReducer from "../features/filterSlice";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "../features/wishlistSlice";
import compareReducer from "../features/compareSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
  },
});
