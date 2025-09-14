import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useAppContext } from "../Context/Context";
import CommentBox from "./CommentBox";
import toast from "react-hot-toast";

const Comment = ({ setComment, author, post }) => {
  const { normalApi, API, fetchAllPosts } = useAppContext();
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  const getAllCommentsOfpost = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/api/user/get/comments/${post._id}`);
      if (response.data.success) {
        setPostComments(response.data.comments);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await API.post(`/api/user/comment/${post._id}`, {
        text: newComment,
      });

      if (response.data.success) {
        setNewComment("");
        getAllCommentsOfpost();
        fetchAllPosts();
        toast.success("Comment added successfully! 💬");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getAllCommentsOfpost();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center h-screen justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Comments</h2>
          <button
            onClick={() => setComment(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <AiOutlineClose size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Post Preview */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={
                    author?.profilePhoto?.startsWith("https://res.cloudinary")
                      ? author.profilePhoto
                      : `${normalApi}${
                          author?.profilePhoto || "/public/default_profile.jpeg"
                        }`
                  }
                  alt="Author"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {author.firstName} {author.lastName}
                  </h3>
                  <span className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
                    Follow
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {formatTimeAgo(post.createdAt)}
                </p>
                {post.content && (
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {post.content}
                  </p>
                )}
              </div>
            </div>

            {post.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full max-h-60 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="p-6 pb-8">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Comments ({postComments.length})
              </h3>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : postComments.length > 0 ? (
                <div className="space-y-4">
                  {postComments.map((comment) => (
                    <CommentBox
                      key={comment._id}
                      comment={comment}
                      user={comment.user}
                      post={post}
                      setComment={setComment}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AiOutlineSend className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500 text-sm">No comments yet</p>
                  <p className="text-gray-400 text-xs">
                    Be the first to comment!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all pr-12"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
            >
              <AiOutlineSend size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;