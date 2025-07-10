import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { LoadingAnimation } from "../Loading";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { SocketData } from "../../context/SocketContext";

const MessageContainer = ({ selectedChat, setChats }) => {
  const [messages, setMessages] = useState([]);
  const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const { socket } = SocketData();

  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedChat._id === message.chatId) {
        setMessages((prev) => [...prev, message]);
      }

      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === message.chatId) {
            return {
              ...chat,
              latestMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return chat;
        });
        return updatedChat;
      });
    });

    return () => socket.off("newMessage");
  }, [socket, selectedChat, setChats]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/messages/" + selectedChat.users[0]._id
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full bg-black/10 text-white font-['M_PLUS_1']">
      {selectedChat && (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-red-600/20">
            <img
              src={selectedChat.users[0].profilePic.url}
              className="w-8 h-8 rounded-full object-cover border border-yellow-500"
              alt="User"
            />
            <span className="text-base font-semibold tracking-wide">
              {selectedChat.users[0].name}
            </span>
          </div>

          {/* Message List */}
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto px-2 py-4 space-y-1 no-scrollbar bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#1f1f1f]"
          >
            {loading ? (
              <LoadingAnimation />
            ) : (
              messages.map((e, i) => (
                <Message
                  key={i}
                  message={e.text}
                  ownMessage={e.sender === user._id}
                />
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-yellow-600/20 px-4 py-3 bg-black/20">
            <MessageInput setMessages={setMessages} selectedChat={selectedChat} />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
