import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { IoClose, IoHeart, IoHeartOutline } from "react-icons/io5";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Comment } from "../PostCard";
import { UserData } from "../../context/UserContext";
import { PostData } from "../../context/PostContext";

const ReelViewer = ({ reels, startIndex, onClose }) => {
  const { user } = UserData();
  const { likePost, addComment } = PostData();

  const [index, setIndex] = useState(startIndex);
  const [showComments, setShowComments] = useState(false);
  const [doubleTapReelId, setDoubleTapReelId] = useState(null);
  const swipeRef = useRef();

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => index < reels.length - 1 && setIndex((i) => i + 1),
    onSwipedDown: () => index > 0 && setIndex((i) => i - 1),
    trackMouse: true,
    trackTouch: true,
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const Reel = memo(({ reel }) => {
    const videoRef = useRef();
    const { ref, inView } = useInView({ threshold: 0.8 });

    const [isLiked, setIsLiked] = useState(reel.likes.includes(user._id));
    const [likeCount, setLikeCount] = useState(reel.likes.length);
    const [comment, setComment] = useState("");

    useEffect(() => {
      if (inView) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    }, [inView]);

    const onHeart = () => {
      const updatedLike = !isLiked;
      setIsLiked(updatedLike);
      setLikeCount((prev) => prev + (updatedLike ? 1 : -1));
      likePost(reel._id);
    };

    const handleDoubleTap = () => {
      setDoubleTapReelId(reel._id);
      onHeart();
      setTimeout(() => setDoubleTapReelId(null), 800);
    };

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      const trimmed = comment.trim();
      if (!trimmed) return;
      addComment(reel._id, trimmed, () => setComment(""));
    };

    return (
      <div
        className="relative h-full w-full flex items-center justify-center"
        ref={ref}
      >
        <div
          className="relative w-full lg:w-2/3 h-full"
          onDoubleClick={handleDoubleTap}
        >
          <video
            ref={videoRef}
            src={reel.post.url}
            className="w-full h-full object-contain"
            loop
            muted
            playsInline
          />

          <AnimatePresence>
            {doubleTapReelId === reel._id && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-red-500 text-7xl pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <IoHeart />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Caption + User */}
          <div className="absolute bottom-16 left-0 w-full px-4 text-white z-10">
            <div className="bg-black bg-opacity-40 px-4 py-2 rounded-lg w-fit lg:w-auto max-w-[90%] backdrop-blur-sm drop-shadow-lg">
              <div className="flex items-center gap-2">
                <img
                  src={reel.owner.profilePic.url}
                  alt="pfp"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/user/${reel.owner._id}`}
                    className="font-semibold hover:underline block"
                  >
                    @{reel.owner.name}
                  </Link>
                  <p className="text-sm">{reel.caption}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Like & Comment */}
          <div className="absolute bottom-16 right-4 flex flex-col gap-4 items-center text-white z-10">
            <button onClick={onHeart} className="text-3xl transition-all duration-300">
              {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
            </button>
            <span>{likeCount}</span>
            <button
              onClick={() => setShowComments((v) => !v)}
              className="text-3xl mt-2"
            >
              <BsChatFill />
            </button>
            <span>{reel.comments.length}</span>
          </div>
        </div>

        {/* Comment Drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              key="comments"
              className="bg-[#111] text-white overflow-y-auto shadow-xl z-20"
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
              style={{
                width: window.innerWidth < 1024 ? "100%" : "35%",
                height: window.innerWidth < 1024 ? "35%" : "100%",
                position: "absolute",
                bottom: window.innerWidth < 1024 ? 0 : undefined,
                right: window.innerWidth >= 1024 ? 0 : undefined,
              }}
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
              <div className="p-4 space-y-4 max-h-[calc(100%-80px)] overflow-y-auto">
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
              <form
                onSubmit={handleCommentSubmit}
                className="p-4 border-t border-gray-800 flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 bg-[#222] text-white rounded px-4 py-2 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold text-sm"
                >
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-10"
        >
          <IoClose />
        </button>

        <div
          {...swipeHandlers}
          ref={swipeRef}
          className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        >
          {reels.map((reel, i) => (
            <div
              key={reel._id}
              className="h-screen w-full snap-start flex items-center justify-center"
            >
              <Reel reel={reel} />
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReelViewer;
