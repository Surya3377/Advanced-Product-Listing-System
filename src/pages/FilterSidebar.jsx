import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCategory,
  setPriceRange,
  toggleBrand,
  toggleRating,
  toggleNextDayDelivery,
  clearAllFilters,
} from "../features/filterSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterSidebar = ({ onCloseMobile }) => {
  const dispatch = useDispatch();
  const {
    categories,
    selectedCategories,
    priceRange,
    selectedPriceRange,
    brands,
    selectedBrands,
    ratings,
    selectedRatings,
    nextDayDelivery,
    categoriesStatus,
    brandsStatus,
  } = useSelector((state) => state.filters);

  const handleCategoryToggle = (category) => {
    dispatch(toggleCategory(category));
  };

  const handlePriceChange = (values) => {
    dispatch(setPriceRange({ min: values[0], max: values[1] }));
  };

  const handleBrandToggle = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const handleRatingToggle = (rating) => {
    dispatch(toggleRating(rating));
  };

  const handleNextDayDeliveryToggle = () => {
    dispatch(toggleNextDayDelivery());
  };

  const handleClearAll = () => {
    dispatch(clearAllFilters());
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
          <button
            onClick={onCloseMobile}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Categories</h3>
        {categoriesStatus === "loading" ? (
          <div className="animate-pulse h-32 bg-gray-200 rounded"></div>
        ) : categories.length > 0 ? (
          <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700 capitalize"
                >
                  {category.name.replace("-", " ")}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No categories available</p>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Price Range</h3>
        <div className="px-2">
          <Slider
            range
            min={priceRange.min}
            max={priceRange.max}
            value={[selectedPriceRange.min, selectedPriceRange.max]}
            onChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">
              ${selectedPriceRange.min}
            </span>
            <span className="text-sm text-gray-600">
              ${selectedPriceRange.max}
            </span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Brands</h3>
        {brandsStatus === "loading" ? (
          <div className="animate-pulse h-32 bg-gray-200 rounded"></div>
        ) : brands.length > 0 ? (
          <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  id={`brand-${brand}`}
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No brands available</p>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Rating</h3>
        <div className="space-y-1">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                id={`rating-${rating}`}
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                <div className="flex">
                  {[...Array(rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1">& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Next Day Delivery */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            id="next-day-delivery"
            type="checkbox"
            checked={nextDayDelivery}
            onChange={handleNextDayDeliveryToggle}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="next-day-delivery"
            className="ml-2 text-sm text-gray-700 font-medium"
          >
            Next Day Delivery
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
