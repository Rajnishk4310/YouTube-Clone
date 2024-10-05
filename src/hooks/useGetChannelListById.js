import { useEffect } from "react";

const useGetChannelListById = () => {
  useEffect(() => {
    getChannelListById();
  }, []);
  const getChannelListById = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCKQKIY2YlI4L5QVg7hhfjrQ&key=" +
        process.env.REACT_APP_YOUTUBE_API
    );
    const json = await data.json();
  };
};

export default useGetChannelListById;
