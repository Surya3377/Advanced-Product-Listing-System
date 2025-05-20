import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCompare,
  toggleCompareModal,
  clearCompare,
} from "../features/compareSlice";

const CompareModal = () => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  const handleClose = () => {
    dispatch(toggleCompareModal(false));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCompare(id));
  };

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-5xl max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Compare Products</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Feature</th>
                {compareItems.map((item) => (
                  <th key={item.id} className="border px-4 py-2">
                    <div className="flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 object-contain"
                      />
                      <span className="font-semibold">{item.name}</span>
                      <button
                        className="text-red-500 mt-1 text-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Price</td>
                {compareItems.map((item) => (
                  <td key={item.id + "-price"} className="border px-4 py-2">
                    ₹{item.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Brand</td>
                {compareItems.map((item) => (
                  <td key={item.id + "-brand"} className="border px-4 py-2">
                    {item.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Rating</td>
                {compareItems.map((item) => (
                  <td key={item.id + "-rating"} className="border px-4 py-2">
                    ⭐ {item.rating}
                  </td>
                ))}
              </tr>
              {/* Add more features as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
