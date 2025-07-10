import React from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";
import { motion } from "framer-motion";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  let user;
  if (chat) user = chat.users[0];

  return (
    <>
      {user && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSelectedChat(chat)}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-white/10 hover:border-red-500 transition-all py-3 px-4 rounded-xl cursor-pointer shadow-lg text-white space-y-2 overflow-hidden no-scrollbar"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic.url}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-yellow-500 shadow-md"
              />
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm tracking-wide truncate">
                {user.name}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1 truncate">
                {loggedInUser._id === chat.latestMessage.sender && <BsSendCheck className="text-green-400" />}
                {chat.latestMessage.text.slice(0, 24)}...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chat;
