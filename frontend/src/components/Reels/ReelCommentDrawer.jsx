import { RiCloseLine } from "react-icons/ri";
import { Comment } from "../PostCard"; // reuse your existing comment component

const ReelCommentDrawer = ({ show, onClose, comments, user, ownerId, reelId }) => {
  return (
    <>
      {/* Drawer for small screens */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#1a1a1d] text-white p-4 rounded-t-xl transition-transform duration-300 shadow-lg sm:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button onClick={onClose}>
            <RiCloseLine className="text-2xl" />
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
          {comments.length > 0 ? (
            comments.map((c) => (
              <Comment key={c._id} value={c} user={user} owner={ownerId} id={reelId} />
            ))
          ) : (
            <p className="text-gray-400">No Comments</p>
          )}
        </div>
      </div>

      {/* Side panel for large screens */}
      <div
        className={`hidden sm:block fixed top-0 right-0 h-full w-[400px] bg-[#1a1a1d] p-4 text-white transition-transform duration-300 shadow-xl ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button onClick={onClose}>
            <RiCloseLine className="text-2xl" />
          </button>
        </div>
        <div className="overflow-y-auto h-full space-y-4 pr-2">
          {comments.length > 0 ? (
            comments.map((c) => (
              <Comment key={c._id} value={c} user={user} owner={ownerId} id={reelId} />
            ))
          ) : (
            <p className="text-gray-400">No Comments</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReelCommentDrawer;
