import React from "react";
import { motion } from "framer-motion";

const Message = ({ ownMessage, message }) => {
  return (
    <div
      className={`mb-2 px-3 flex ${ownMessage ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative max-w-[70%] px-4 py-2 text-sm rounded-xl shadow-md border ${
          ownMessage
            ? "bg-[#2d2d2d] text-white border-[#ff4d4d]/30"
            : "bg-[#1a1a1a] text-gray-300 border-[#333]/50"
        }`}
      >
        <p className="whitespace-pre-wrap break-words leading-snug font-['M_PLUS_1'] tracking-wide">
          {message}
        </p>
        <span
          className={`absolute bottom-0 w-2 h-2 rotate-45 ${
            ownMessage
              ? "right-[-4px] bg-[#2d2d2d]"
              : "left-[-4px] bg-[#1a1a1a]"
          }`}
        ></span>
      </motion.div>
    </div>
  );
};

export default Message;
