import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCategories } from "../features/filterSlice";
import {
  fetchProducts,
  setCurrentPage,
  setSortBy,
} from "../features/productsSlice";
import { addToCart } from "../features/cartSlice"; // Import the addToCart action
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import SearchBar from "./Searchbar";
import Loader from "./Loader";
import CompareBar from "./CompareBar";
import CompareModal from "./CompareModal";
import { toast } from "react-toastify"; // Import toast for notifications

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    items: products,
    status,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    viewMode,
    sortBy,
    searchQuery,
  } = useSelector((state) => state.products);

  const {
    selectedCategories,
    selectedPriceRange,
    selectedBrands,
    selectedRatings,
    nextDayDelivery,
  } = useSelector((state) => state.filters);

  const compareItems = useSelector((state) => state.compare.items);
  const isCompareModalOpen = useSelector(
    (state) => state.compare.isCompareModalOpen
  );

  // Add cart items from state
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        filters: {
          categories: selectedCategories,
          priceRange: selectedPriceRange,
          brands: selectedBrands,
          ratings: selectedRatings,
          nextDayDelivery,
        },
        sort: sortBy,
        search: searchQuery,
      })
    );
  }, [
    dispatch,
    currentPage,
    selectedCategories,
    selectedPriceRange,
    selectedBrands,
    selectedRatings,
    nextDayDelivery,
    sortBy,
    searchQuery,
  ]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  // Add to cart handler function
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-center text-gray-800">
            Error Loading Products
          </h2>
          <p className="mb-6 text-center text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-full px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-2 py-4 mx-auto">
        {/* Header with search and total count */}
        <div className="p-1 mb-1 bg-white rounded-xl shadow-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Discover Products
              </h1>
              <p className="mt-2 text-gray-500">
                Browse through our collection of {totalCount} premium products
              </p>
            </div>
            <div className="w-full md:w-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Cart indicator */}
        <div className="flex justify-end mb-0">
          <div className="relative">
            <button className="flex items-center justify-center p-2 bg-white rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="block mb-6 md:hidden">
          <button
            onClick={toggleMobileFilters}
            className="flex items-center justify-between w-full px-6 py-4 bg-white rounded-xl shadow-md text-gray-800 hover:bg-gray-50 transition duration-200"
          >
            <span className="flex items-center font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter Products
            </span>
            <div className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
              {selectedCategories.length +
                selectedBrands.length +
                (selectedRatings > 0 ? 1 : 0) +
                (selectedPriceRange.min > 0 || selectedPriceRange.max < 10000
                  ? 1
                  : 0) +
                (nextDayDelivery ? 1 : 0)}
            </div>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - improved mobile experience */}
          <div
            className={`
              ${
                mobileFiltersOpen
                  ? "fixed inset-0 z-40 bg-black bg-opacity-50"
                  : "hidden"
              } 
              md:relative md:block md:bg-transparent md:w-80 md-min-w-72
            `}
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileFiltersOpen(false);
            }}
          >
            <div
              className={`
                ${
                  mobileFiltersOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"
                } 
                transform transition-transform duration-300 ease-in-out
                h-full w-4/5 max-w-xs bg-white md:bg-transparent fixed md:sticky
                top-0 left-0 md:top-6 overflow-y-auto z-50 md:z-auto
                p-6 md:p-0 filters
              `}
            >
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-0 bg-white rounded-xl shadow-md">
                <FilterSidebar
                  onCloseMobile={() => setMobileFiltersOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow">
            {/* Sorting and view options */}
            <div className="p-1 mb-2 bg-white rounded-xl shadow-md">
              <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700 font-medium">
                    Sort by:
                  </span>
                  <select
                    className="py-2 pl-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={sortBy || "popularity"}
                    onChange={handleSortChange}
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      /* Handle grid view */
                    }}
                    className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      /* Handle list view */
                    }}
                    className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {status === "loading" ? (
                <div className="flex items-center justify-center p-16">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-medium">
                      Loading products...
                    </p>
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div>
                  <div className="p-6">
                    <div className="max-h-500 overflow-y-auto scrollbar">
                      {viewMode === "grid" ? (
                        <ProductGrid
                          products={products}
                          onAddToCart={handleAddToCart}
                        />
                      ) : (
                        <ProductList
                          products={products}
                          onAddToCart={handleAddToCart}
                        />
                      )}
                    </div>
                  </div>
                  {/* Pagination */}
                  <div className="border-t border-gray-200">
                    <div className="p-6">
                      <Pagination
                        currentPage={currentPage}
                        totalItems={totalCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-gray-800">
                    No products found
                  </h2>
                  <p className="max-w-md mx-auto mb-8 text-gray-500">
                    We couldn't find any products matching your criteria. Try
                    adjusting your search or filter options.
                  </p>
                  <button
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compare bar - shown only when compare items exist */}
        {compareItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-30">
            <CompareBar />
          </div>
        )}

        {/* Compare modal */}
        {isCompareModalOpen && <CompareModal />}
      </div>
    </div>
  );
};

export default ProductListingPage;
