import React, { useState } from "react";
import PostCard from "../PostCard";
import ReelGrid from "../Reels/ReelGrid";
import ReelViewer from "../Reels/ReelViewer";

const AccountContent = ({ type, myPosts, myReels }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (type === "posts") {
    return (
      <>
        {myPosts.length ? (
          myPosts.map(post => <PostCard key={post._id} type="posts" value={post} />)
        ) : (
          <p className="text-gray-500 text-center mt-8">No Posts yet</p>
        )}
      </>
    );
  }

  if (type === "reels") {
    return (
      <>
        <ReelGrid reels={myReels} onOpen={setActiveIndex} />
        {activeIndex !== null && (
          <ReelViewer
            reels={myReels}
            startIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </>
    );
  }

  return null;
};

export default AccountContent;
