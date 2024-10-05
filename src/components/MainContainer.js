import React from "react";
import FilterContainer from "./FilterContainer";
import VideosContainer from "./VideosContainer";

const MainContainer = () => {
  return (
    <div className="p-6 flex-1 bg-white">
      <FilterContainer />
      <VideosContainer />
    </div>
  );
};

export default MainContainer;
