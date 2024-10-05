import React, { useEffect, useRef } from "react";
import LiveMessage from "./LiveMessage";
import { GenerateString, getLiveChatId, RandomName } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../utils/chatSlice";

const LiveChat = ({ videoId }) => {
  const chatSubmit = useRef(null); // Ref for the input field
  const chatContainerRef = useRef(null); // Ref for the chat container (for auto-scrolling)
  const dispatch = useDispatch();
  const liveChatMessage = useSelector((store) => store.chat.chatMessage);
  useEffect(() => {
    const fetchChatId = async () => {
      const liveChatId = await getLiveChatId(videoId);
      getLiveChat({ liveChatId });
    };

    const timer = setInterval(() => fetchChatId(), 3000);
    return () => clearInterval(timer);
  }, []);

  const getLiveChat = async ({ liveChatId }) => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=" +
          liveChatId +
          "&part=snippet&part=authorDetails%2Cid&maxResults=200&key=" +
          process.env.REACT_APP_YOUTUBE_API
      );

      if (!response.ok) {
        throw new Error("Failed to fetch live chat messages");
      }

      const data = await response.json();
      dispatch(addChatMessage(data.items));
    } catch (error) {
      console.error("Error fetching live chat messages:", error);
    }
  };

  useEffect(() => {
    // Auto-scroll to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [liveChatMessage]);

  const generateChat = () => {
    const newMessage = {
      name: RandomName(),
      message: GenerateString(21),
    };
    dispatch(addChatMessage(newMessage));
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();

    const message = chatSubmit.current.value;
    if (message.trim()) {
      // Only dispatch if the input is not empty
      dispatch(addChatMessage({ name: "Rajnish", message }));
    }
    chatSubmit.current.value = "";
  };
  if (!liveChatMessage.length) return;
  return (
    <div className="border border-gray-200 h-[700px] rounded-lg ml-5 w-[80%] flex flex-col justify-between bg-white">
      <h1 className="text-lg px-4 py-2 border-b bg-gray-50">Live Chat</h1>
      <div
        ref={chatContainerRef}
        className="flex-1 px-4 py-2 overflow-y-auto space-y-2"
      >
        {liveChatMessage.map((chat, index) => (
          <LiveMessage
            key={index}
            name={chat.authorDetails.displayName}
            message={chat.snippet.textMessageDetails.messageText}
            profileURL={chat.authorDetails.profileImageUrl}
          />
        ))}
      </div>
      <form
        onSubmit={handleChatSubmit}
        className="flex items-center px-4 py-2 border-t bg-gray-50"
      >
        <input
          ref={chatSubmit}
          type="text"
          className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
