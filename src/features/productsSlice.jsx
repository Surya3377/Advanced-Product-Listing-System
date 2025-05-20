import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./services/productApi";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 12,
  viewMode: "grid", // 'grid' | 'list'
  sortBy: "relevance", // 'price-low' | 'price-high' | 'rating' | 'relevance' | 'newest'
  searchQuery: "", // added searchQuery state
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, filters, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getProducts({ page, filters, sort, search });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setViewMode, setSortBy, setCurrentPage, setSearchQuery } =
  productsSlice.actions;
export default productsSlice.reducer;
