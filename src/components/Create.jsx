import React, { useState, useRef } from "react";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import { useAppContext } from "../Context/Context";
import { useAuth } from "./../Context/authContext";
import { toast } from "react-hot-toast";

const Create = () => {
  const { API, setCreate, normalApi, navigateTo, fetchAllPosts } =
    useAppContext();
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const MAX_CHARS = 500;

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setPostContent(text);
      setCharCount(text.length);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSumbitHandler = async (e) => {
    e.preventDefault();

    if (!postContent.trim() && !image) {
      toast.error("Please add some content or an image to your post");
      return;
    }

    const formData = new FormData();
    if (postContent.trim()) formData.append("content", postContent);
    if (image) formData.append("image", image);

    try {
      setIsSubmitting(true);
      const response = await API.post("/api/user/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Posted successfully! 🎉");
        setImage(null);
        setPostContent("");
        setCreate(false);
        fetchAllPosts();
        navigateTo("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while posting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const profilePhotoUrl = user?.profilePhoto;

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-3"></div>
            <p className="text-white font-medium">Creating your post...</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto my-8 shadow-2xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
            <button
              onClick={() => setCreate(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <AiOutlineClose size={20} className="text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-0.5">
              <img
                src={profilePhotoUrl}
                alt={user?.firstName || "User"}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">Public</p>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={onSumbitHandler} className="p-6">
              {/* Text Area */}
              <textarea
                onChange={handleTextChange}
                value={postContent}
                placeholder="What's on your mind?"
                className="w-full resize-none outline-none text-gray-900 placeholder-gray-500 min-h-[120px] border-none focus:ring-0 text-base"
              />

              {/* Character Counter */}
              <div className="flex justify-end mb-4">
                <span
                  className={`text-sm ${
                    charCount > MAX_CHARS * 0.8
                      ? "text-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>

              {/* Image Preview - Properly constrained */}
              {image && (
                <div className="relative mb-4 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Post preview"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              )}

              {/* Action Bar */}
              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-gray-700 font-medium mb-3">
                  Add to your post
                </p>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="image"
                    className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <AiOutlinePicture size={20} className="text-green-500" />
                    <span className="text-sm font-medium">Photo</span>
                    <input
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      type="file"
                      accept="image/*"
                      id="image"
                      className="hidden"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Fixed Submit Button at Bottom */}
          <div className="p-6 border-t border-gray-100 bg-white rounded-b-2xl flex-shrink-0">
            <button
              type="submit"
              onClick={onSumbitHandler}
              disabled={isSubmitting || (!postContent.trim() && !image)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
