import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";

const EditProfile = ({ name, setName, showInput, setShowInput, UpdateName }) => {
  return showInput ? (
    <div className="flex items-center gap-3 mt-1">
      {/* Floating Label Input */}
      <div className="relative w-[150px]">
        <input
          type="text"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          className="peer w-full px-3 pt-4 pb-1.5 text-sm text-yellow-300 bg-[#1a1a1d] border border-yellow-600/30 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
          placeholder="Enter Name"
          required
        />
        <label className="absolute left-3 top-1 text-xs text-yellow-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-yellow-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-300">
          Name
        </label>
      </div>

      {/* Confirm Button */}
      <button
        onClick={UpdateName}
        className="p-2 bg-gradient-to-r from-yellow-600 to-pink-600 text-white rounded-md hover:scale-105 transition duration-200 shadow-sm"
        aria-label="Update Name"
      >
        <FaCheck size={14} />
      </button>

      {/* Cancel Button */}
      <button
        onClick={() => setShowInput(false)}
        className="p-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition duration-200 shadow-sm"
        aria-label="Cancel Edit"
      >
        <FaTimes size={14} />
      </button>
    </div>
  ) : (
    <button
      onClick={() => setShowInput(true)}
      className="text-yellow-300 hover:text-pink-400 transition p-1 rounded-full hover:bg-[#1a1a1d]/50"
      aria-label="Edit Username"
    >
      <CiEdit size={20} />
    </button>
  );
};

export default EditProfile;
