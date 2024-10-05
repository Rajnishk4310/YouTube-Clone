import React from "react";

const FilterContainer = () => {
  const data = [
    "All",
    "Music",
    "Live",
    "Jonny liver",
    "Gaming",
    "Chess",
    "Sports",
  ];
  return (
    <div className="flex space-x-3 overflow-x-scroll scrollbar-hide py-2">
      {data.map((x) => (
        <button
          key={x}
          className="bg-gray-200 px-4 py-1 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-300 transition-all"
        >
          {x}
        </button>
      ))}
    </div>
  );
};

export default FilterContainer;
