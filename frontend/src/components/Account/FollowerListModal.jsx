import React from "react";

const FollowerListModal = ({ isOpen, onClose, followers, onUnfollow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#111] text-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl border border-yellow-600/20 p-6 relative">
        <button
          className="absolute top-2 right-4 text-yellow-400 hover:text-yellow-300 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Followers</h2>

        {followers.length === 0 ? (
          <p className="text-red-300">You have no followers yet.</p>
        ) : (
          <ul className="space-y-4">
            {followers.map((follower) => (
              <li
                key={follower._id}
                className="flex items-center justify-between bg-[#1a1a1d] px-4 py-2 rounded-lg shadow hover:bg-[#222]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.profilePic.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-yellow-600"
                  />
                  <p className="text-sm font-medium text-yellow-200">
                    {follower.name}
                  </p>
                </div>
                <button
                  onClick={() => onUnfollow(follower._id)}
                  className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md shadow"
                >
                  Unfollow
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowerListModal;
