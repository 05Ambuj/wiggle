import React, { useState, useEffect, useRef } from "react";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";
import { IoHeart, IoHeartOutline, IoClose } from "react-icons/io5";
import { BsChatFill } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { Comment } from "../components/PostCard";
import { UserData } from "../context/UserContext";

const Reels = () => {
  const { reels, loading, likePost, addComment } = PostData();
  const { user } = UserData();
  const [index, setIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentMap, setCommentMap] = useState({});
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

  const handleCommentChange = (reelId, value) => {
    setCommentMap((prev) => ({ ...prev, [reelId]: value }));
  };

  const handleCommentSubmit = (e, reelId) => {
    e.preventDefault();
    const comment = commentMap[reelId]?.trim();
    if (!comment) return;
    addComment(reelId, comment, () =>
      setCommentMap((prev) => ({ ...prev, [reelId]: "" }))
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (scrollTimeout.current) return;

      if (e.deltaY > 0 && index < reels.length - 1) setIndex((i) => i + 1);
      else if (e.deltaY < 0 && index > 0) setIndex((i) => i - 1);

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [index, reels.length]);

  return loading ? (
    <Loading />
  ) : (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black text-white overflow-hidden relative transition-transform duration-700 ease-in-out"
    >
      <button
        onClick={() => setShowComments(false)}
        className="absolute top-4 right-4 text-white text-3xl z-50 lg:hidden"
      >
        <IoClose />
      </button>

      {reels && reels.length > 0 ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-full lg:w-2/3 h-full flex items-center justify-center relative">
            <video
              src={reels[index].post.url}
              className="w-full h-full object-contain transition-transform duration-700 ease-in-out"
              loop
              muted
              autoPlay
              playsInline
            />

            {/* Caption + Username */}
            <div className="absolute bottom-16 left-0 w-full px-4 z-10">
              <div className="bg-gradient-to-t from-black/60 to-transparent p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <img
                    src={reels[index].owner.profilePic.url}
                    alt="pfp"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      @{reels[index].owner.name}
                    </p>
                    <p className="text-sm text-white">{reels[index].caption}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Like + Comment */}
            <div className="absolute bottom-16 right-4 flex flex-col gap-4 items-center text-white z-10">
              <button
                onClick={() => likePost(reels[index]._id)}
                className="text-3xl"
              >
                {reels[index].likes.includes(user._id) ? (
                  <IoHeart className="text-red-500" />
                ) : (
                  <IoHeartOutline />
                )}
              </button>
              <span>{reels[index].likes.length}</span>
              <button
                onClick={() => setShowComments((v) => !v)}
                className="text-3xl mt-2"
              >
                <BsChatFill />
              </button>
              <span>{reels[index].comments.length}</span>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div
                className={`absolute bg-[#111] text-white shadow-xl z-40 flex flex-col ${
                  window.innerWidth >= 1024
                    ? "top-0 right-0 w-[400px] h-full border-l border-gray-800"
                    : "bottom-0 left-0 w-full h-[50%] rounded-t-2xl"
                }`}
              >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="font-semibold">Comments</h2>
                  <button
                    onClick={() => setShowComments(false)}
                    className="text-sm text-gray-300"
                  >
                    Close
                  </button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  {reels[index].comments.length > 0 ? (
                    reels[index].comments.map((c) => (
                      <Comment
                        key={c._id}
                        value={c}
                        user={c.user}
                        owner={reels[index].owner._id}
                        id={reels[index]._id}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet</p>
                  )}
                </div>
                <div className="p-4 border-t border-gray-800 bg-[#111] sticky bottom-0">
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, reels[index]._id)}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentMap[reels[index]._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(reels[index]._id, e.target.value)
                      }
                      className="flex-1 bg-[#222] text-white rounded px-4 py-2 text-sm outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold text-sm"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400 italic mt-12">No Reels</p>
      )}
    </div>
  );
};

export default Reels;