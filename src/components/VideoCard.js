import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const { statistics, snippet, id } = video;
  const { channelTitle, localized, thumbnails } = snippet;
  const videoId = typeof id === "object" && id !== null ? id?.videoId : id;

  return (
    <div className="w-[18%] bg-white rounded-lg hover:scale-105 transform transition-all shadow-sm">
      <Link to={`/watch?v=${videoId}`}>
        <img
          className="rounded-lg w-full h-40 object-cover"
          src={thumbnails.high.url}
          alt="Video thumbnail"
        />
        <div className="mt-2 p-2 py-4">
          {localized?.title && (
            <h1 className="font-bold text-sm line-clamp-2">
              {localized?.title}
            </h1>
          )}
          <p className="text-gray-500 text-xs">{channelTitle}</p>
          {statistics?.viewCount && (
            <p className="text-gray-600 text-xs">
              {statistics?.viewCount} views
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

// Higher-Order Component (HOC) to add Sponsored label
export const withAdLabel = (WrappedComponent) => {
  return (props) => (
    <div className="relative border-2 border-red-500 rounded-xl shadow-lg p-2 hover:scale-105 transition-transform">
      {/* Render the Wrapped Component (VideoCard) */}
      <WrappedComponent {...props} />

      {/* Sponsored Label */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
        Sponsored
      </div>
    </div>
  );
};

export default VideoCard;
