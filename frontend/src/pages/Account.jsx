import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

import Modal from "../components/Modal";
import { Loading } from "../components/Loading";
import ProfileCard from "../components/Account/ProfileCard";
import UpdatePasswordForm from "../components/Account/UpdatePasswordForm";
import PostReelToggle from "../components/Account/PostReelToggle";
import AccountContent from "../components/Account/AccountContent";

const Account = ({ user }) => {
  const [type, setType] = useState("posts");
  const [index, setIndex] = useState(0);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { logoutUser, updateProfile, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  const myPosts = posts?.filter((post) => post.owner._id === user._id) || [];
  const myReels = reels?.filter((reel) => reel.owner._id === user._id) || [];

  const prevReel = () => index > 0 && setIndex(index - 1);
  const nextReel = () => index < myReels.length - 1 && setIndex(index + 1);

  const logoutHandler = () => logoutUser(navigate);

  const followData = async () => {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await axios.post(`/api/user/follow/${id}`);
      toast.success("Unfollowed successfully");
      followData(); // refresh list
    } catch (error) {
      toast.error("Failed to unfollow");
    }
  };

  useEffect(() => {
    followData();
  }, [user]);

  const changeFileHandler = (e) => setFile(e.target.files[0]);

  const changeImageHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    updateProfile(user._id, formData, setFile);
  };

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/" + user._id, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <>
      {user && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-[#0c0c0e] min-h-screen text-white flex flex-col items-center justify-center pt-3 pb-14 transition-colors duration-300">
              {/* Followers Modal */}
              {show && (
                <Modal
                  value={followersData}
                  title="Followers"
                  setShow={setShow}
                  onUnfollow={handleUnfollow}
                />
              )}

              {/* Following Modal */}
              {show1 && (
                <Modal
                  value={followingsData}
                  title="Followings"
                  setShow={setShow1}
                  onUnfollow={handleUnfollow}
                />
              )}

              {/* Profile Info Card */}
              <ProfileCard
                user={user}
                name={name}
                setName={setName}
                showInput={showInput}
                setShowInput={setShowInput}
                UpdateName={UpdateName}
                logoutHandler={logoutHandler}
                setShow={setShow}
                setShow1={setShow1}
                showUpdatePass={showUpdatePass}
                setShowUpdatePass={setShowUpdatePass}
                changeFileHandler={changeFileHandler}
                changeImageHandler={changeImageHandler}
              />

              {/* Update Password Modal */}
              {showUpdatePass && (
                <UpdatePasswordForm
                  oldPassword={oldPassword}
                  newPassword={newPassword}
                  setOldPassword={setOldPassword}
                  setNewPassword={setNewPassword}
                  updatePassword={updatePassword}
                  onClose={() => setShowUpdatePass(false)}
                />
              )}

              {/* Toggle between Posts & Reels */}
<PostReelToggle type={type} setType={setType} />

              {/* Main Content */}
              <AccountContent
                type={type}
                myPosts={myPosts}
                myReels={myReels}
                index={index}
                prevReel={prevReel}
                nextReel={nextReel}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Account;
