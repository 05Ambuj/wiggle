import React from "react";

const ReelGrid = ({ reels, onOpen }) => (
  <div className="flex gap-4 overflow-x-auto px-4 py-6 snap-x scrollbar-hide">
    {reels.map((r, i) => (
      <div
        key={r._id}
        className="w-40 h-72 bg-black rounded-md cursor-pointer overflow-hidden snap-center flex-shrink-0 group"
        onClick={() => onOpen(i)}
      >
        <video
          src={r.post.url}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          muted
          loop
          playsInline
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-2 text-xs text-white">
          @{r.owner.name}
        </div>
      </div>
    ))}
  </div>
);

export default ReelGrid;
