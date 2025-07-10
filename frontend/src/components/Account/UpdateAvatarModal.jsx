import React from "react";

const UpdateAvatarModal = ({ isOpen, onClose, onFileChange, onUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#121212] border border-pink-600/20 rounded-xl p-6 w-[90%] max-w-sm shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Update Avatar</h2>
        <input
          type="file"
          onChange={onFileChange}
          className="text-sm text-red-200 px-2 py-2 w-full bg-black/30 border border-red-500/40 rounded mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-red-700 hover:bg-red-800 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="px-4 py-1.5 rounded-md bg-gradient-to-r from-pink-600 to-yellow-500 font-semibold text-sm hover:scale-105 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatarModal;
