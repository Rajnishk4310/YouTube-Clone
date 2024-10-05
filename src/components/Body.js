import React from "react";
import SideContainer from "./SideContainer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex">
      <SideContainer />
      <Outlet />
    </div>
  );
};

export default Body;
