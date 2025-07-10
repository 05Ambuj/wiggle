import { useState } from "react";
import ReelCommentDrawer from "./ReelCommentDrawer";
import { IoHeartSharp } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";

const ReelItem = ({ reel, isActive, user }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black">
      <video
        src={reel.post.url}
        autoPlay={isActive}
        muted
        loop
        className="w-full h-full object-cover"
      />

      {/* Overlay Controls */}
      <div className="absolute bottom-10 left-4 text-white flex flex-col gap-6">
        <button className="text-2xl">
          <IoHeartSharp />
        </button>
        <button className="text-2xl" onClick={() => setShowComments(!showComments)}>
          <BsChatDots />
        </button>
      </div>

      {/* Comment Drawer */}
      <ReelCommentDrawer
        show={showComments}
        onClose={() => setShowComments(false)}
        comments={reel.comments}
        user={user}
        ownerId={reel.owner._id}
        reelId={reel._id}
      />
    </div>
  );
};

export default ReelItem;
