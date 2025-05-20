import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrands, getCategories } from "./services/productApi";

const initialState = {
  categories: [],
  selectedCategories: [],
  priceRange: { min: 0, max: 1000 },
  selectedPriceRange: { min: 0, max: 1000 },
  brands: [],
  selectedBrands: [],
  ratings: [5, 4, 3, 2, 1],
  selectedRatings: [],
  nextDayDelivery: false,
  searchQuery: "",
  categoriesStatus: "idle",
  brandsStatus: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "filters/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBrands();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
    },
    setPriceRange: (state, action) => {
      state.selectedPriceRange = action.payload;
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    toggleRating: (state, action) => {
      const rating = action.payload;
      if (state.selectedRatings.includes(rating)) {
        state.selectedRatings = state.selectedRatings.filter(
          (r) => r !== rating
        );
      } else {
        state.selectedRatings.push(rating);
      }
    },
    toggleNextDayDelivery: (state) => {
      state.nextDayDelivery = !state.nextDayDelivery;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearAllFilters: (state) => {
      state.selectedCategories = [];
      state.selectedPriceRange = {
        min: state.priceRange.min,
        max: state.priceRange.max,
      };
      state.selectedBrands = [];
      state.selectedRatings = [];
      state.nextDayDelivery = false;
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  toggleCategory,
  setPriceRange,
  toggleBrand,
  toggleRating,
  toggleNextDayDelivery,
  setSearchQuery,
  clearAllFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
