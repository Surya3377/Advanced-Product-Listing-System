import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2; // how many pages to show before and after current page

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const handleClick = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex items-center space-x-1 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-md">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        {getPages().map((page, index) => (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`px-3 py-1 text-sm rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : page === "..."
                ? "cursor-default text-gray-500"
                : "text-blue-600 hover:bg-gray-100"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
