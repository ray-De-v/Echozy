import React, { useState } from "react";
import Card from "./Card";
import Create from "./Create";
import { useAppContext } from "../Context/Context";
import { useAuth } from "../Context/authContext";

const PostDisplay = () => {
  const { create, setCreate, posts } = useAppContext();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="mt-16 pb-8">
      {/* Create Post Prompt */}
      <div className="px-4 max-w-[600px] mx-auto mb-6">
        <div
          onClick={() => setCreate(true)}
          className="bg-white cursor-pointer rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-gray-300"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-sm">
              What's on your mind, {user.firstName}?
            </p>
          </div>
          <div className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </div>
        </div>
      </div>

      {create && <Create />}

      {/* Posts Display */}
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post._id} post={post} author={post.author} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-500 text-sm">Be the first to share something with your network!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;