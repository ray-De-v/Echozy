import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/Context";
import { useAuth } from "../Context/authContext";
import toast from "react-hot-toast";

const FriendCard = ({ friend, nonFriend }) => {
  const { normalApi, API } = useAppContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const sendFriendRequest = async (userId) => {
    setIsLoading(true);
    try {
      const response = await API.post("/api/friend/send", {
        receiverId: userId,
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const profilePhoto = friend 
    ? friend?.profilePhoto?.startsWith("https://res.cloudinary")
      ? friend.profilePhoto
      : `${normalApi}${friend?.profilePhoto || "/public/default_profile.jpeg"}`
    : nonFriend?.profilePhoto?.startsWith("https://res.cloudinary")
      ? nonFriend.profilePhoto
      : `${normalApi}${nonFriend?.profilePhoto || "/public/default_profile.jpeg"}`;

  const fullName = friend
    ? `${friend.firstName} ${friend.lastName}`
    : `${nonFriend.firstName} ${nonFriend.lastName}`;

  const isCloudinaryImage = profilePhoto?.includes("res.cloudinary.com");

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white w-72 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Profile Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {/* Profile Image Container */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
          <img
            src={profilePhoto}
            alt={fullName}
            className={`w-full h-full object-cover ${isCloudinaryImage ? "" : "p-2 bg-gray-100"}`}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-14 p-5 text-center">
        <h2 className="font-semibold text-xl text-gray-800 mb-1 truncate px-2">
          {fullName}
        </h2>
        
        {/* Status Indicator for Friends */}
        {friend && (
          <div className="flex items-center justify-center mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-500">Friends</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5 mt-auto">
        <button
          onClick={() => nonFriend && sendFriendRequest(nonFriend._id)}
          disabled={isLoading || friend}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center
            ${nonFriend 
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg" 
              : "bg-gray-100 text-gray-600 cursor-default"
            }
            ${isLoading ? "opacity-75 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : nonFriend ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Friend
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Friends
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FriendCard;