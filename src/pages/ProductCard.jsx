import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { addToCompare } from "../features/compareSlice";
import StarRating from "./StarRating";
import QuickViewModal from "./QuickViewModal";
// import QuickViewModal from "./QuickViewModal";
// import StarRating from "./common/StarRating";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare.items);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isInCompare = compareItems.some((item) => item.id === product.id);
  const canAddToCompare = compareItems.length < 3;

  const discountPrice =
    product.price - product.price * (product.discountPercentage / 100);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCompare = () => {
    if (!isInCompare && canAddToCompare) {
      dispatch(addToCompare(product));
    }
  };

  const openQuickView = () => {
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
        {/* Product image and actions */}
        <div className="relative pt-[100%]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
          />

          {/* Action buttons - top right */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            {/* Wishlist button */}
            <button
              onClick={handleToggleWishlist}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
              aria-label={
                isInWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isInWishlist ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>

            {/* Compare button */}
            <button
              onClick={handleAddToCompare}
              disabled={isInCompare || !canAddToCompare}
              className={`bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors ${
                isInCompare || !canAddToCompare
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-label={isInCompare ? "Already in compare" : "Add to compare"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  isInCompare ? "text-blue-500" : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>

            {/* Quick view button */}
            <button
              onClick={openQuickView}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
              aria-label="Quick view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Discount tag - top left */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        {/* Product details */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-bold text-lg">
                  ${discountPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ${product.price}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">{product.brand}</span>
            </div>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Quick view modal */}
      {isQuickViewOpen && (
        <QuickViewModal product={product} onClose={closeQuickView} />
      )}
    </>
  );
};

export default ProductCard;
