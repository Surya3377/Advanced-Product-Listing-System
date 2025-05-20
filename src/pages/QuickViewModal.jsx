import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import StarRating from "./StarRating";

const QuickViewModal = ({ product, onClose, isInWishlist }) => {
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const discountPrice =
    product.price - product.price * (product.discountPercentage / 100);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: selectedQuantity,
      })
    );
    onClose();
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Handle clicking outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Images Section */}
          <div className="w-full md:w-1/2 p-4 bg-gray-50">
            <div className="relative pt-[100%]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Image gallery preview */}
            {product.images && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative pt-[100%] border border-gray-200 rounded"
                  >
                    <img
                      src={image}
                      alt={`${product.title} - view ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

            {/* Rating */}
            <div className="flex items-center mt-2">
              <StarRating rating={product.rating} size="medium" />
              <span className="text-sm text-gray-500 ml-2">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                ${discountPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-lg text-gray-400 line-through ml-2">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Stock */}
            <div className="mt-4 text-sm">
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock > 0 && (
                <span className="text-gray-500 ml-1">
                  ({product.stock} available)
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                  }
                  className="border border-gray-300 rounded-l px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={selectedQuantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={selectedQuantity}
                  onChange={(e) =>
                    setSelectedQuantity(
                      Math.min(
                        product.stock,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    )
                  }
                  className="border-t border-b border-gray-300 w-16 text-center py-1"
                />
                <button
                  onClick={() =>
                    setSelectedQuantity(
                      Math.min(product.stock, selectedQuantity + 1)
                    )
                  }
                  className="border border-gray-300 rounded-r px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={selectedQuantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 py-2 px-4 rounded font-medium ${
                  product.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>

              <button
                onClick={handleToggleWishlist}
                className="p-2 rounded border border-gray-300 hover:bg-gray-50"
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isInWishlist ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
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
                    className="h-6 w-6 text-gray-400"
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
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Category:</span>
                  <span className="text-gray-700 ml-1">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Brand:</span>
                  <span className="text-gray-700 ml-1">{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
