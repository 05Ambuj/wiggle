import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Loading, LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [caption, setCaption] = useState(value.caption ? value.caption : "");
  const [captionLoading, setCaptionLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const menuRef = useRef();
  const { user } = UserData();
  const { likePost, addComment, deletePost, deleteComment } = PostData();

  const formatDate = format(new Date(value.createdAt), "MMMM do");

  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === user._id) setIsLike(true);
    }
  }, [value, user._id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  const deleteHandler = async () => {
    setDeleteLoading(true);
    await deletePost(value._id);
    setDeleteLoading(false);
  };

  const editHandler = () => {
    setShowMenu(false);
    setShowInput(true);
  };

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const { data } = await axios.put("/api/post/" + value._id, { caption });
      toast.success(data.message);
      setShowInput(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCaptionLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#2d2d2d] via-[#3a3a3a] to-[#1e1e1e] w-full px-2 sm:px-0">
      <div className="max-w-xl mx-auto p-4">
        {deleteLoading ? (
          <div className="flex justify-center py-10">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link to={`/user/${value.owner._id}`} className="flex items-center gap-3">
                <img
                  src={value.owner.profilePic.url}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-semibold">{value.owner.name}</p>
                  <div className="text-gray-400 text-sm">{formatDate}</div>
                </div>
              </Link>
              {value.owner._id === user._id && (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-white hover:bg-[#222] rounded-full p-1 text-2xl"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-28 bg-[#2e2e2e] border border-[#444] rounded-md shadow-xl z-50">
                      <button
                        onClick={editHandler}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#3d3d3d]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={deleteHandler}
                        disabled={deleteLoading}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-[#3d3d3d]"
                      >
                        {deleteLoading ? <LoadingAnimation /> : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              {showInput ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="custom-input bg-[#111] text-white border border-gray-700 rounded-md px-3 py-2"
                    placeholder="Enter Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={updateCaption}
                      className="bg-yellow-600 text-white px-3 py-1 rounded"
                      disabled={captionLoading}
                    >
                      {captionLoading ? <LoadingAnimation /> : "Update"}
                    </button>
                    <button
                      onClick={() => setShowInput(false)}
                      className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-white text-sm leading-relaxed">{value.caption}</p>
              )}
            </div>

            <div>
              {type === "posts" ? (
                <img
                  src={value.post.url}
                  alt="Post Image"
                  className="w-full h-auto max-h-[500px] object-cover rounded-md"
                  loading="lazy"
                />
              ) : (
                <video
                  src={value.post.url}
                  autoPlay
                  muted
                  loop
                  controls
                  className="w-full h-[500px] sm:h-[600px] object-cover rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.05)] border border-yellow-500/10 transition-transform hover:scale-[1.01]"
                />

              )}
            </div>

            <div className="flex items-center justify-between text-gray-300 mt-4">
              <div className="flex items-center gap-2">
                <span
                  onClick={likeHandler}
                  className="text-red-500 text-2xl cursor-pointer"
                >
                  {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
                </span>
                <span className="text-sm">{value.likes.length} likes</span>
              </div>
              <button
                className="flex items-center gap-2 text-sm hover:text-white"
                onClick={() => setShow(!show)}
              >
                <BsChatFill />
                {value.comments.length} comments
              </button>
            </div>

            {show && (
              <>
                <form onSubmit={addCommentHandler} className="flex gap-3 mt-3">
                  <input
                    type="text"
                    className="custom-input flex-1 bg-[#111] text-white border border-gray-700 rounded-md px-3 py-2"
                    placeholder="Enter Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-yellow-600 text-black font-bold px-4 py-2 rounded-md hover:brightness-110"
                  >
                    Add
                  </button>
                </form>

                <div className="mt-4">
                  <h3 className="text-white font-semibold mb-2">Comments</h3>
                  <div className="max-h-52 overflow-y-auto space-y-3 pr-2">
                    {value.comments && value.comments.length > 0 ? (
                      value.comments.map((e) => (
                        <Comment key={e._id} value={e} user={user} owner={value.owner._id} id={value._id} />
                      ))
                    ) : (
                      <p className="text-gray-400">No Comments</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({ value, user, owner, id }) => {
  const { deleteComment } = PostData();
  const deleteCommentHandler = () => {
    deleteComment(id, value._id);
  };

  return (
    <div className="flex items-start gap-3 text-sm">
      <Link to={`/user/${value.user._id}`}>
        <img
          src={value.user.profilePic.url}
          alt="comment user"
          className="w-8 h-8 rounded-full object-cover"
        />
      </Link>
      <div className="flex-1">
        <Link to={`/user/${value.user._id}`} className="font-semibold text-white">
          {value.user.name}
        </Link>
        <p className="text-gray-400">{value.comment}</p>
      </div>
      {(owner === user._id || value.user._id === user._id) && (
        <button onClick={deleteCommentHandler} className="text-red-500">
          <RiDeleteBin6Line />
        </button>
      )}
    </div>
  );
};
