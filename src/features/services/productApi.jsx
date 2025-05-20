// src/api/productApi.js
const BASE_URL = "https://dummyjson.com";

// Helper function to build URL with query parameters
const buildQueryParams = (params) => {
  const queryParams = new URLSearchParams();

  if (params.limit) queryParams.append("limit", params.limit);
  if (params.skip) queryParams.append("skip", params.skip);
  if (params.search) queryParams.append("q", params.search);
  if (params.category) queryParams.append("category", params.category);

  return queryParams.toString();
};

// Get products with filters, pagination, sorting and search
export const getProducts = async ({ page = 1, filters = {}, sort, search }) => {
  try {
    const limit = 12; // Products per page
    const skip = (page - 1) * limit;

    let url = `${BASE_URL}/products`;

    // Handle search separately
    if (search) {
      url = `${BASE_URL}/products/search`;
    }

    // Build query parameters
    const params = { limit, skip };
    if (search) params.search = search;

    // Handle category filter
    if (filters.categories?.length === 1) {
      url = `${BASE_URL}/products/category/${filters.categories[0]}`;
    }

    const queryString = buildQueryParams(params);
    const finalUrl = `${url}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(finalUrl);
    const data = await response.json();

    // Client-side filtering for other filters that the API doesn't support
    let filteredProducts = [...data.products];

    // Filter by price range
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max
      );
    }

    // Filter by brands
    if (filters.brands?.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Filter by ratings
    if (filters.ratings?.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const productRating = Math.floor(product.rating);
        return filters.ratings.includes(productRating);
      });
    }

    // Sort products
    if (sort) {
      switch (sort) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          // Assuming there's a createdAt property or similar
          filteredProducts.sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          break;
        default:
          // Default relevance sorting (no change from API)
          break;
      }
    }

    return {
      products: filteredProducts,
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Since the DummyJSON API doesn't have a brands endpoint,
// we'll fetch products and extract unique brands
export const getBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    const data = await response.json();

    // Extract unique brands
    const brands = [...new Set(data.products.map((product) => product.brand))];
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

// Get single product details
export const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};
