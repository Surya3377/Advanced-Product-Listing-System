import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery, setCurrentPage } from "../features/productsSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const debounceRef = useRef();

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(setSearchQuery(input));
      dispatch(setCurrentPage(1));
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceRef.current);
  }, [input, dispatch]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search products..."
      className="border border-gray-300 rounded px-4 py-2 w-full md:w-96"
    />
  );
};

export default SearchBar;
