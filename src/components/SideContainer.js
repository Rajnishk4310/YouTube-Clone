import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideContainer = () => {
  const toggleState = useSelector(
    (store) => store.app.toggleSideContainerState
  );
  if (!toggleState) return null;

  return (
    <div className="p-6 w-64 h-screen shadow-lg">
      <ul className="">
        <Link to="/">
          <li className=" hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
            Home
          </li>
        </Link>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Shorts
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Subscriptions
        </li>
      </ul>

      <ul className="mt-2 ">
        <h1 className="font-bold text-xl text-gray-900 ">Explore</h1>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Trending
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Shopping
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Music
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Movies
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Live
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Gaming
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          News
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Sports
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Courses
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Fashion & Beauty
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-300 ease-in-out">
          Podcasts
        </li>
      </ul>
    </div>
  );
};

export default SideContainer;
