import React, { useEffect, useState } from "react";
import VideoCard, { withAdLabel } from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { addPopularVideo } from "../utils/videoSlice";

const AdCard = withAdLabel(VideoCard);

const VideosContainer = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const popularVideo = useSelector((store) => store.video.popularVideo);
  const searchVideo = useSelector((store) => store.video.searchVideo);

  useEffect(() => {
    if (searchVideo.length) setMovies(searchVideo);
    else if (popularVideo.length) setMovies(popularVideo);
    else {
      getVideosList();
    }
  }, [searchVideo, popularVideo]);

  const getVideosList = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" +
        process.env.REACT_APP_YOUTUBE_API
    );
    const json = await data.json();
    dispatch(addPopularVideo(json.items));
    setMovies(json.items);
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 py-4 ">
      {/* {movies.length > 0 && <AdCard video={movies[0]} />} */}

      {movies.slice(1).map((movie, index) => (
        <VideoCard
          key={
            typeof movie.id === "object" && movie.id !== null
              ? movie?.id?.videoId
              : movie?.id
          }
          video={movie}
        />
      ))}
    </div>
  );
};

export default VideosContainer;
