import React from "react";
import { useAppContext } from "../Context/Context";
import { AiOutlineDelete } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

const CommentBox = ({ user, comment, post, setComment }) => {
  const { normalApi, API, fetchAllPosts } = useAppContext();

  const deleteComment = async () => {
    try {
      const response = await API.post(`api/user/comment/delete/${post._id}`, {
        commentId: comment._id,
      });
      if (response.data.success) {
        toast.success("Comment deleted 🗑️", {
          style: {
            borderRadius: '12px',
            background: '#EF4444',
            color: '#fff',
          },
        });
        setComment(false);
        fetchAllPosts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  const profilePhotoUrl = user?.profilePhoto
  return (
    <div className="flex gap-3 group p-3 rounded-lg transition-all duration-200 hover:bg-gray-50/80">
      {/* Profile Image with Gradient Border */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5">
          <img
            src={profilePhotoUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default_profile.jpeg";
            }}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <p className="font-semibold text-sm text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        
        {/* Comment Bubble */}
        <div className="bg-gray-100 rounded-2xl px-4 py-2.5 border border-gray-200/50">
          <p className="text-gray-800 text-sm leading-relaxed">
            {comment?.text}
          </p>
        </div>
      </div>

      {/* Delete Button - Modern Style */}
      <div className="flex-shrink-0">
        <button
          onClick={deleteComment}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 opacity-70 hover:opacity-100"
          title="Delete comment"
        >
          <AiOutlineDelete size={16} />
        </button>
      </div>
    </div>
  );
};

export default CommentBox;