import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import UpdateAvatarModal from "./UpdateAvatarModal";
import { FaPowerOff } from "react-icons/fa";
import { MdOutlinePassword, MdMoreVert, MdEdit } from "react-icons/md";

const ProfileCard = ({
  user,
  name,
  showInput,
  setShowInput,
  setName,
  UpdateName,
  logoutHandler,
  showUpdatePass,
  setShowUpdatePass,
  changeFileHandler,
  changeImageHandler,
  setShow,
  setShow1,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setAvatarModalOpen(false);
        setMenuOpen(false);
        setShowInput(false);
        setShowUpdatePass(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowInput, setShowUpdatePass]);

  return (
    <div className="relative w-full max-w-2xl mx-auto px-3 py-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-50px] left-[-40px] w-48 h-48 bg-red-600/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-40px] right-[-30px] w-60 h-60 bg-yellow-400/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 bg-[#0c0c0e]/90 backdrop-blur-xl border border-[#ff416c30] rounded-xl shadow-[0_0_30px_rgba(255,0,90,0.08)] text-white p-4 font-['M_PLUS_1']">
        {/* Mobile 3-dot menu */}
        <div className="absolute top-3 right-3 sm:hidden">
          <button
            className="text-xl text-yellow-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MdMoreVert />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1d] border border-yellow-600/20 rounded-md shadow-lg z-20">
              <button
                onClick={() => {
                  setShowUpdatePass(!showUpdatePass);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-yellow-500/10"
              >
                <MdOutlinePassword className="inline-block mr-2" />
                {showUpdatePass ? "Close Password" : "Update Password"}
              </button>
              <button
                onClick={logoutHandler}
                className="w-full px-4 py-2 text-sm text-left hover:bg-yellow-500/10"
              >
                <FaPowerOff className="inline-block mr-2" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Layout: image + info */}
        <div className="flex flex-row gap-4 flex-wrap sm:flex-nowrap">
          {/* Avatar */}
          <div className="relative group w-20 h-20 sm:w-28 sm:h-28">
            <img
              src={user.profilePic.url}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-black transition-transform duration-300 hover:scale-105"
            />
            <div
              onClick={() => setAvatarModalOpen(true)}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition"
            >
              <MdEdit className="text-white text-lg sm:text-2xl" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-yellow-300">
                {name || user.name}
              </h1>

              <EditProfile
                name={name}
                setName={setName}
                showInput={showInput}
                setShowInput={setShowInput}
                UpdateName={UpdateName}
              />
            </div>

            <div className="flex gap-6 mt-1">
              <div
                onClick={() => setShow(true)}
                className="cursor-pointer text-center group"
              >
                <p className="text-xs text-red-300 group-hover:text-yellow-300">Followers</p>
                <p className="text-base font-semibold text-yellow-400 group-hover:text-yellow-300">
                  {user.followers.length}
                </p>
              </div>
              <div
                onClick={() => setShow1(true)}
                className="cursor-pointer text-center group"
              >
                <p className="text-xs text-red-300 group-hover:text-yellow-300">Following</p>
                <p className="text-base font-semibold text-yellow-400 group-hover:text-yellow-300">
                  {user.followings.length}
                </p>
              </div>
            </div>

            {/* Buttons (desktop only) */}
            <div className="hidden sm:flex gap-3 mt-3 justify-end">
              <button
                onClick={() => setShowUpdatePass(!showUpdatePass)}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-pink-600 px-4 py-2 rounded-md text-sm font-semibold tracking-wide hover:scale-105 shadow-md transition"
              >
                <MdOutlinePassword />
                {showUpdatePass ? "Close" : "Update Password"}
              </button>
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md text-sm font-semibold tracking-wide shadow-md transition"
              >
                <FaPowerOff /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      <UpdateAvatarModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        onFileChange={changeFileHandler}
        onUpdate={() => {
          changeImageHandler();
          setAvatarModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProfileCard;
