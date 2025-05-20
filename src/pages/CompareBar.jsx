import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompareModal } from "../features/compareSlice";

const CompareBar = () => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  if (!compareItems.length) return null;

  const handleCompareClick = () => {
    dispatch(toggleCompareModal(true));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t p-4 flex justify-between items-center z-40">
      <div className="text-sm text-gray-700">
        {compareItems.length} product{compareItems.length > 1 ? "s" : ""} added
        for comparison
      </div>
      <button
        onClick={handleCompareClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Compare Now
      </button>
    </div>
  );
};

export default CompareBar;
