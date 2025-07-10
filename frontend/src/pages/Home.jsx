import React, { useEffect, useRef, useState, useCallback } from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";
import { motion } from "framer-motion";

const Home = () => {
  const { posts, loading } = PostData();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const loaderRef = useRef(null);
  const POSTS_PER_LOAD = 5;

  const loadMorePosts = useCallback(() => {
    const nextIndex = postIndex + POSTS_PER_LOAD;
    const nextPosts = posts.slice(postIndex, nextIndex);
    setVisiblePosts((prev) => [...prev, ...nextPosts]);
    setPostIndex(nextIndex);
  }, [postIndex, posts]);

  // Reset visible posts when posts array changes
  useEffect(() => {
    if (!loading && posts.length > 0) {
      setPostIndex(0);
      setVisiblePosts([]);
    }
  }, [posts]);

  // Load initial posts when visiblePosts is empty
  useEffect(() => {
    if (!loading && posts.length > 0 && visiblePosts.length === 0) {
      loadMorePosts();
    }
  }, [loading, posts, loadMorePosts, visiblePosts.length]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && postIndex < posts.length) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, postIndex, posts.length, loadMorePosts]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#0f0f0f] text-white font-['M_PLUS_1'] pb-32 overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto px-4 pt-6">
            {/* Add Post Section */}
            <AddPost type="post" />

            {/* Posts Feed */}
            {visiblePosts.length > 0 ? (
              <div className="space-y-6 mt-8">
                {visiblePosts.map((e, i) => (
                  <motion.div
                    key={e._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <React.Suspense
                      fallback={
                        <div className="w-full h-52 rounded-lg bg-neutral-800 animate-pulse"></div>
                      }
                    >
                      <PostCard value={e} type="posts" />
                    </React.Suspense>
                  </motion.div>
                ))}
                <div ref={loaderRef} className="text-center text-gray-400 py-6">
                  {postIndex < posts.length ? "Loading more..." : "No more posts."}
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-gray-400 italic mt-12 flex flex-col items-center gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/631/631089.png"
                  alt="Empty"
                  loading="lazy"
                  className="w-20 opacity-20"
                />
                <p>
                  “Even silence echoes<br />In the samurai’s lonely hall —<br />No posts for now.”
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
