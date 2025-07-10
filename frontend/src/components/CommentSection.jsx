import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);

    axios
      .get(`/api/comments/${postId}`)
      .then((res) => {
        setComments(res.data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch comments", err);
        setLoading(false);
      });
  }, [postId]);

  if (!postId) return null;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400">No comments yet</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="bg-[#1e1e1e] p-3 rounded-md">
              <p className="text-sm font-medium">{c.username}</p>
              <p className="text-sm text-gray-300">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
