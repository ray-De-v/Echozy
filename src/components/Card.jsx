import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaRegThumbsUp, FaRegCommentDots, FaHeart } from "react-icons/fa";
import { BsThreeDots, BsEmojiSmile, BsSend } from "react-icons/bs";
import { useAuth } from "../Context/authContext";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import Comment from "./Comment";

const Card = ({ post, author }) => {
  const { user } = useAuth();
  const { normalApi, API, fetchAllPosts } = useAppContext();
  const [comment, setComment] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id));
  const [commentText, setCommentText] = useState("");

  // Date formatting function
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const handleToggleLike = async () => {
    try {
      const response = await API.post(`/api/user/like/${post._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setIsLiked(!isLiked);
        fetchAllPosts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    setCommentText("");
    toast.success("Comment posted");
  };

  const profilePhotoUrl = author?.profilePhoto?.startsWith("https://res.cloudinary")
    ? author.profilePhoto
    : `${normalApi}${author?.profilePhoto || "/public/default_profile.jpeg"}`;

  // Use the formatTimeAgo function here
  const formattedDate = formatTimeAgo(post.createdAt);

  return (
    <>
      {comment && (
        <Comment setComment={setComment} author={author} post={post} />
      )}

      <div className="max-w-xl bg-white mx-auto rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4 transition-all duration-300 hover:shadow-md">
        {/* Card Header */}
        <div className="p-4 pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={profilePhotoUrl}
                  alt={author?.firstName || "User"}
                  className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-gray-900 font-semibold hover:underline cursor-pointer">
                  {author?.firstName} {author?.lastName}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
            </div>
            <button className="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors">
              Follow
            </button>
          </div>

          {/* Post Content */}
          {post.content && (
            <div className="mt-3 text-gray-800 leading-relaxed">
              {post.content}
            </div>
          )}
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="w-full overflow-hidden">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover cursor-pointer"
            />
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                <FaHeart className="text-xs" />
              </div>
            </div>
            <span>{post.likes.length} likes</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{post.comments.length} comments</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-2 py-2 flex justify-between items-center">
          <button
            onClick={handleToggleLike}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg mx-1 transition-colors ${
              isLiked
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {isLiked ? (
              <FaHeart className="text-blue-600" />
            ) : (
              <FaRegThumbsUp />
            )}
            <span className="font-medium">Like</span>
          </button>

          <button
            onClick={() => setComment(true)}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg mx-1 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <FaRegCommentDots />
            <span className="font-medium">Comment</span>
          </button>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={profilePhotoUrl}
              alt="Your profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <form
              onSubmit={handleSubmitComment}
              className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
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
                  className="text-gray-400 hover:text-gray-600"
                >
                  <BsEmojiSmile />
                </button>
                <button
                  type="submit"
                  className="text-gray-400 hover:text-blue-600"
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

export default Card;
