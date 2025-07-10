import React, { useEffect, useRef } from "react";
import { FaUserMinus } from "react-icons/fa";

const Modal = ({ value = [], title, setShow, onUnfollow }) => {
  const modalRef = useRef();

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShow]);

  // Outside click to close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-[#1a1a1d] border border-yellow-500/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-xl p-6 text-white relative font-['M_PLUS_1']"
      >
        <h2 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-500/10 pb-2">
          {title}
        </h2>
        {value.length === 0 ? (
          <p className="text-gray-400 text-sm">No users found.</p>
        ) : (
          <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
            {value.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between bg-[#2b2b2e] hover:bg-[#333] p-3 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic?.url}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-black"
                  />
                  <span className="text-sm text-yellow-100 font-medium">{user.name}</span>
                </div>
                {onUnfollow && (
                  <button
                    onClick={() => onUnfollow(user._id)}
                    className="text-sm flex items-center gap-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded-md text-white font-semibold transition"
                  >
                    <FaUserMinus /> Unfollow
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
