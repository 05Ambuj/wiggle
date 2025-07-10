import React, { useEffect, useRef, useState } from "react";
import { PostData } from "../context/PostContext";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "./Loading";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [postType, setPostType] = useState(""); // auto-detected: 'post' or 'reel'
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiRef = useRef(null);
  const { addPost, addLoading } = PostData();
  const { user } = UserData();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(selectedFile);

      // Auto-detect type
      const fileType = selectedFile.type;
      if (fileType.startsWith("video/")) {
        setPostType("reel");
      } else if (fileType.startsWith("image/")) {
        setPostType("post");
      } else {
        setPostType(""); // not supported
        setFile("");
        setFilePrev("");
        alert("Unsupported file type. Please upload an image or video.");
      }
    };
  };

  const removeFile = () => {
    setFile("");
    setFilePrev("");
    setPostType("");
  };

  const onEmojiClick = (emojiData) => {
    setCaption((prev) => prev + emojiData.emoji);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file || !postType) return;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);
    addPost(formData, setFile, setCaption, setFilePrev, postType);
  };

  return (
    <div className={`w-full flex justify-center pt-2 pb-3 ${filePrev ? "min-h-[40vh]" : ""}`}>
      <div className="w-full max-w-[95vw] sm:max-w-4xl border border-[#272727] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] shadow-[0_0_40px_#ff000020] p-4 sm:p-6 text-white rounded-xl transition-all duration-300">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          {user?.profilePic?.url ? (
            <img
              src={user.profilePic.url}
              alt="User Avatar"
              className="w-10 h-10 mt-1 sm:w-14 sm:h-14 rounded-full object-cover border border-yellow-600 shadow-md"
            />
          ) : (
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black shadow-md">
              U
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="flex-1 flex flex-col gap-4">
            {/* Caption */}
            <textarea
              rows="3"
              className="w-full px-4 py-3 rounded-md bg-[#0f0f0f] border border-[#2c2c2c] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none transition-all"
              placeholder="Share your warrior's tale..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            {/* Tools */}
            <div className="flex items-center gap-5 text-yellow-500 text-lg relative">
              <label className="cursor-pointer hover:text-yellow-400 transition">
                <HiOutlinePhotograph />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={changeFileHandler}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="hover:text-yellow-400 transition"
              >
                <BsEmojiSmile />
              </button>

              {showEmojiPicker && (
                <div
                  ref={emojiRef}
                  className="absolute top-10 z-50 max-w-xs w-[90vw] sm:w-auto"
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    theme="dark"
                    height={350}
                    width={300}
                  />
                </div>
              )}
            </div>

            {/* Preview */}
            {filePrev && (
              <div className="relative w-full max-h-[300px] sm:max-h-[400px] overflow-hidden rounded-md border border-[#333] mt-2 shadow-inner">
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 z-10"
                >
                  <IoClose size={18} />
                </button>
                {postType === "post" ? (
                  <img
                    src={filePrev}
                    alt="preview"
                    className="w-full h-auto object-cover rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={filePrev}
                    className="w-full max-h-[300px] sm:max-h-[400px] rounded-md"
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                  />
                )}
              </div>
            )}


            {/* Submit */}
            <div className="flex justify-end mt-2">
              <button
                disabled={addLoading || !postType}
                className="bg-gradient-to-br from-yellow-500 to-red-500 text-black font-bold py-2 px-6 rounded-full hover:brightness-110 transition-all text-sm shadow-lg"
              >
                {addLoading ? <LoadingAnimation /> : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
