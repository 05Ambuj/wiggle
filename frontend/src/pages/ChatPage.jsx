import React, { useEffect, useState } from "react";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";
import { motion } from "framer-motion";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData();
  const { onlineUsers } = SocketData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  const createNewChat = async (id) => {
    await createChat(id);
    setSearch(false);
    getAllChats();
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-[#111111] via-[#191919] to-[#1f1f1f] text-white font-['M_PLUS_1']">
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`md:w-1/3 w-full bg-white/5 backdrop-blur-md rounded-none md:rounded-2xl p-4 border border-red-700/20 shadow-[0_0_30px_rgba(255,0,0,0.1)] overflow-hidden transition-all duration-300 md:block ${
            selectedChat ? "hidden md:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-wide text-red-200">Chats</h2>
            <button
              className="bg-red-600 hover:bg-red-700 transition-all text-white p-2 rounded-full shadow-md"
              onClick={() => setSearch(!search)}
            >
              {search ? "✕" : <FaSearch />}
            </button>
          </div>

          {search ? (
            <div>
              <input
                type="text"
                placeholder="Search Ronins..."
                className="w-full mb-3 bg-black/40 px-4 py-2 rounded-lg border border-red-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="h-[calc(100vh-250px)] overflow-y-auto pr-1 no-scrollbar">
                {users.length > 0 ? (
                  users.map((e) => (
                    <motion.div
                      key={e._id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => createNewChat(e._id)}
                      className="bg-[#222] hover:bg-[#2a2a2a] transition-all p-3 rounded-lg flex items-center gap-3 cursor-pointer border border-white/10 mb-2"
                    >
                      <img src={e.profilePic.url} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <span className="text-sm font-medium text-white/90">{e.name}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No Ronins found</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[calc(100vh-180px)] overflow-y-auto pr-1 no-scrollbar">
              {chats.map((e) => (
                <Chat
                  key={e._id}
                  chat={e}
                  setSelectedChat={setSelectedChat}
                  isOnline={onlineUsers.includes(e.users[0]._id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Message area */}
        <div
          className={`md:w-2/3 w-full bg-white/5 backdrop-blur-md rounded-none md:rounded-2xl px-4 pt-4 pb-4 md:pb-12 border border-yellow-600/20 shadow-[0_0_30px_rgba(255,255,0,0.1)] relative flex flex-col transition-all duration-300 ${
            selectedChat ? "flex" : "hidden md:flex"
          }`}
        >
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.02),transparent_80%)] pointer-events-none z-0" />
          <div className="relative z-10 w-full h-full flex flex-col overflow-hidden">
            <div className="md:hidden mb-2">
              <button
                onClick={() => setSelectedChat(null)}
                className="flex items-center text-yellow-400 hover:text-yellow-300 text-sm gap-1"
              >
                <FaArrowLeft /> Back to Chats
              </button>
            </div>

            {selectedChat === null ? (
              <div className="text-center animate-fade-in text-lg text-red-300 italic pt-16">
                Hello 👋 Choose a chat to begin your journey.
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <MessageContainer selectedChat={selectedChat} setChats={setChats} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;