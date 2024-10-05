import React from "react";
import { GenerateString, RandomName } from "../utils/constant";

const LiveMessage = ({ name, message,profileURL }) => {
  return (
    <div className="flex">
      <img className="rounded-full h-6" src={profileURL} alt="user" />
      <div className="mx-2 ">
        <span className="text-gray-600 mr-2">{name}</span>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default LiveMessage;
