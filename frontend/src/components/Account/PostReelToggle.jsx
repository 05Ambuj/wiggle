import React from "react";

const PostReelToggle = ({ type, setType }) => {
  return (
    <div className="relative w-[220px] mx-auto my-6">
      <div className="relative flex bg-[#1a1a1d] border border-yellow-500/20 rounded-full shadow-inner overflow-hidden">
        {/* Sliding Indicator */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full transition-transform duration-300 ${
            type === "reels" ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Posts Button */}
        <button
          onClick={() => setType("posts")}
          className={`w-1/2 py-2 text-sm font-semibold z-10 transition duration-300 ${
            type === "posts"
              ? "text-black"
              : "text-yellow-300 hover:text-white"
          }`}
        >
          Posts
        </button>

        {/* Reels Button */}
        <button
          onClick={() => setType("reels")}
          className={`w-1/2 py-2 text-sm font-semibold z-10 transition duration-300 ${
            type === "reels"
              ? "text-black"
              : "text-yellow-300 hover:text-white"
          }`}
        >
          Reels
        </button>
      </div>
    </div>
  );
};

export default PostReelToggle;
