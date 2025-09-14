import React, { useState } from "react";
import {
  FaRegThumbsUp,
  FaRegCommentDots,
  FaHeart,
  FaEllipsisH,
} from "react-icons/fa";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { useAuth } from "../Context/authContext";
import { useAppContext } from "../Context/Context";
import Comment from "./Comment";
import toast from "react-hot-toast";

const ProfileCard = ({ post, fetchPosts }) => {
  const { user } = useAuth();
  const { normalApi, API } = useAppContext();
  const [comment, setComment] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id));
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleLike = async () => {
    try {
      const response = await API.post(`/api/user/like/${post._id}`);
      if (response.data.success) {
        toast.success(response.data.message, {
          icon: isLiked ? "👎" : "👍",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setIsLiked(!isLiked);
        fetchPosts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;

    // Here you would typically submit the comment to your API
    console.log("Submitting comment:", commentText);
    setCommentText("");
    toast.success("Comment posted successfully");
  };

  const profilePhotoUrl = user?.profilePhoto;

  // Calculate time difference for "X time ago" display
  const getTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return new Date(post.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeletePost = async () => {
    try {
      const res = await API.post(`api/user/delete/post/${post._id}`);
      if (res.data.success) {
        fetchPosts();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <>
      {comment && <Comment setComment={setComment} author={user} post={post} />}
      <div className="max-w-2xl bg-white mx-auto rounded-2xl shadow-lg overflow-hidden mt-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
        {/* Card Header */}
        <div className="p-5 pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
                  <img
                    src={profilePhotoUrl}
                    alt={user?.firstName || "User"}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {getTimeAgo(post.createdAt)}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaEllipsisH />
              </button>

              {showOptions && (
                <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-10">
                  <button
                    onClick={handleDeletePost}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          {post.content && (
            <div className="mt-4 text-gray-800 leading-relaxed text-lg">
              {post.content}
            </div>
          )}
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="w-full overflow-hidden bg-gray-50">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover cursor-pointer"
            />
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="px-5 py-3 flex justify-between items-center text-sm text-gray-500 border-t border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs shadow-sm">
                <FaHeart className="text-xs" />
              </div>
            </div>
            <span className="font-medium">{post.likes.length} likes</span>
          </div>
          <div className="flex items-center">
            <span>{post.comments.length} comments</span>
          </div>
        </div>

        {/* Action Buttons - Only Like and Comment */}
        <div className="px-2 py-3 flex justify-between items-center">
          <button
            onClick={handleToggleLike}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl mx-1 transition-all duration-300 ${
              isLiked
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isLiked ? (
              <FaHeart className="text-lg text-blue-600" />
            ) : (
              <FaRegThumbsUp className="text-lg" />
            )}
            <span className="font-medium">Like</span>
          </button>

          <button
            onClick={() => setComment(true)}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl mx-1 text-gray-600 hover:bg-gray-100 transition-all duration-300"
          >
            <FaRegCommentDots className="text-lg" />
            <span className="font-medium">Comment</span>
          </button>
        </div>

        {/* Comment Input */}
        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-0.5 flex-shrink-0">
              <img
                src={profilePhotoUrl}
                alt="Your profile"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <form
              onSubmit={handleSubmitComment}
              className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200"
            >
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <BsEmojiSmile />
                </button>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className={`p-1 rounded-full transition-colors ${
                    commentText.trim()
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-300"
                  }`}
                >
                  <BsSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
