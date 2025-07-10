import React, { useState } from "react";
import { ChatData } from "../../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const MessageInput = ({ setMessages, selectedChat }) => {
  const [textMsg, setTextMsg] = useState("");
  const { setChats } = ChatData();

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages", {
        message: textMsg,
        recieverId: selectedChat.users[0]._id,
      });

      setMessages((message) => [...message, data]);
      setTextMsg("");
      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: {
                text: textMsg,
                sender: data.sender,
              },
            };
          }
          return chat;
        });
        return updatedChat;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleMessage}
      className="flex items-center gap-3 bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-2"
    >
      <input
        type="text"
        placeholder="Forge your words..."
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-['M_PLUS_1']"
        value={textMsg}
        onChange={(e) => setTextMsg(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-br from-yellow-500 to-red-600 p-2 rounded-full hover:scale-105 transition-transform"
      >
        <PaperAirplaneIcon className="h-5 w-5 text-white -rotate-25 cursor-pointer" />
      </button>
    </form>
  );
};

export default MessageInput;
