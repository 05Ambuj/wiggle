import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Comment } from "../PostCard";
import { UserData } from "../../context/UserContext";
import { PostData } from "../../context/PostContext";

const ReelCard = ({ reel }) => {
  const { user } = UserData();
  const { likePost } = PostData();

  const [doubleTap, setDoubleTap] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [localLiked, setLocalLiked] = useState(reel.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(reel.likes.length);

  const tapTimeout = useRef(null);

  const handleDoubleTap = () => {
    if (!doubleTap) {
      setDoubleTap(true);
      handleLike();
      clearTimeout(tapTimeout.current);
      tapTimeout.current = setTimeout(() => setDoubleTap(false), 800);
    }
  };

  const handleLike = () => {
    // Toggle locally
    const isNowLiked = !localLiked;
    setLocalLiked(isNowLiked);
    setLikeCount((prev) => prev + (isNowLiked ? 1 : -1));
    likePost(reel._id);
    // No toast shown
  };

  const videoRef = useRef();
  const { ref, inView } = useInView({ threshold: 0.8 });

  useEffect(() => {
    if (inView) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-black flex items-center justify-center"
    >
      <div
        className="w-full max-w-md h-full relative"
        onDoubleClick={handleDoubleTap}
      >
        <video
          ref={videoRef}
          src={reel.post.url}
          className="object-contain w-full h-full"
          loop
          muted
          playsInline
        />

        {/* ❤️ Double-tap like animation */}
        <AnimatePresence>
          {doubleTap && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-red-600 text-7xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <IoHeart />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Username & caption */}
        <div className="absolute bottom-16 left-4 text-white drop-shadow-md">
          <Link to={`/user/${reel.owner._id}`} className="font-bold hover:underline">
            @{reel.owner.name}
          </Link>
          <p className="mt-1">{reel.caption}</p>
        </div>

        {/* Like & comment buttons */}
        <div className="absolute bottom-16 right-4 flex flex-col gap-4 items-center text-white">
          <button
            onClick={handleLike}
            className="text-3xl transition-all duration-300"
          >
            {localLiked ? (
              <IoHeart className="text-red-500 scale-110 transition-transform duration-300" />
            ) : (
              <IoHeartOutline />
            )}
          </button>
          <span>{likeCount}</span>
          <button
            onClick={() => setShowComments((v) => !v)}
            className="text-3xl"
          >
            <BsChatFill />
          </button>
          <span>{reel.comments.length}</span>
        </div>

        {/* Comments drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              key="comments"
              initial={{
                y: window.innerWidth < 1024 ? "100%" : 0,
                x: window.innerWidth >= 1024 ? "100%" : 0,
                opacity: 0,
              }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{
                y: window.innerWidth < 1024 ? "100%" : 0,
                x: window.innerWidth >= 1024 ? "100%" : 0,
                opacity: 0,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="bg-[#111] text-white overflow-y-auto z-10"
              style={{
                width: window.innerWidth < 1024 ? "100%" : "35%",
                height: window.innerWidth < 1024 ? "35%" : "100%",
                position: "absolute",
                bottom: window.innerWidth < 1024 ? 0 : undefined,
                right: window.innerWidth >= 1024 ? 0 : undefined,
              }}
            >
              <div className="p-4 border-b border-gray-800 flex justify-between">
                <h2 className="font-semibold">Comments</h2>
                <button onClick={() => setShowComments(false)}>Close</button>
              </div>
              <div className="p-4 space-y-4">
                {reel.comments.length ? (
                  reel.comments.map((c) => (
                    <Comment
                      key={c._id}
                      value={c}
                      user={c.user}
                      owner={reel.owner._id}
                      id={reel._id}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReelCard;
