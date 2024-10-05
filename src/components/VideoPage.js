import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changeToggleSideContainerState } from "../utils/appSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import VideoRelated from "./VideoRelated";

const VideoPage = () => {
  const [commentList, setCommentList] = useState([]);
  const [searchParams] = useSearchParams("v=");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeToggleSideContainerState(false));
    getComment();
  }, []);

  const getComment = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${searchParams.get(
          "v"
        )}&maxResults=100&key=${process.env.REACT_APP_YOUTUBE_API}`
      );

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const json = await response.json();
      setCommentList(json.items);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Optionally, you can set an error state to display in the UI
    }
  };

  if (!searchParams) return;
  return (
    <div className="p-8 pl-28 flex w-full">
      <div className="w-[1250px]">
        <iframe
          className="rounded-xl "
          width="1250"
          height="700"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <CommentsContainer commentList={commentList} />
      </div>
      <div className="w-full">
        <LiveChat videoId={searchParams.get("v")} />
        <VideoRelated />
      </div>
    </div>
  );
};

export default VideoPage;
