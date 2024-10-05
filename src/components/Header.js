import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideContainer } from "../utils/appSlice";
import { addSuggestions } from "../utils/searchSlice";
import { addSearchVideo } from "../utils/videoSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const cacheSuggestions = useSelector((store) => store.search);
  const inputValue = useRef();

  const handleHamsburg = () => {
    dispatch(toggleSideContainer());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cacheSuggestions[searchSuggestions])
        setSuggestions(cacheSuggestions[searchSuggestions]);
      else {
        getSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchSuggestions]);

  const getSuggestions = async () => {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        searchSuggestions
    );
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      addSuggestions({
        [json[0]]: json[1],
      })
    );
  };

  const getSearchVideo = async (sugg) => {
    const query = sugg ? sugg.sugg : inputValue.current.value;
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" +
        query +
        "&key=" +
        process.env.REACT_APP_YOUTUBE_API
    );
    const json = await data.json();
    dispatch(addSearchVideo(json.items));
  };

  return (
    <div className="px-6 pt-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          onClick={handleHamsburg}
          alt="hamburger"
          className="h-5 text-white cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
        />

        <img
          className="ml-7 h-5 cursor-pointer"
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
        />
      </div>

      <div className="relative flex items-center w-[50%] justify-center">
        <div className="relative w-full max-w-[60%]">
          <input
            ref={inputValue}
            type="text"
            value={searchSuggestions}
            onChange={(e) => setSearchSuggestions(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded-l-full"
            placeholder="Search"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />
          {showSuggestions && (
            <ul className="absolute top-full left-0 w-full border py-3 rounded-xl shadow-lg bg-white z-50">
              {suggestions.map((sugg, index) => (
                <li
                  onClick={() => {
                    getSearchVideo({ sugg });
                    setSearchSuggestions(sugg);
                  }}
                  key={index}
                  className="hover:bg-gray-200 px-4 py-1 "
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => getSearchVideo()}
          className="border border-gray-400 py-2 px-4 rounded-r-full hover:bg-gray-200"
        >
          Search
        </button>
        <img
          className="w-9 h-9 cursor-pointer bg-gray-200 rounded-full p-1 ml-2 hover:bg-gray-300"
          src="https://i.pinimg.com/originals/74/ce/14/74ce14befb22695743659cf8a8290c2b.png"
          alt="mic"
        />
      </div>

      <div>
        <img
          className="rounded-full h-10"
          src="https://yt3.ggpht.com/yti/ANjgQV8vjUmC8RHYlWMj34sS4r4-UzXRF2cvNj8bMevHR-w=s88-c-k-c0x00ffffff-no-rj"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Header;
