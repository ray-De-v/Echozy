import React from "react";
import { useAppContext } from "../Context/Context";
import { FaUser } from "react-icons/fa";

const ProfileFriendCard = ({ friend }) => {
  const { normalApi } = useAppContext();
  
  const profilePhotoUrl = friend?.profilePhoto?.startsWith("https://res.cloudinary")
    ? friend.profilePhoto
    : `${normalApi}${friend?.profilePhoto || "/public/default_cover.png"}`;

  const isDefaultImage = !friend?.profilePhoto?.startsWith("https://res.cloudinary") && 
                         !friend?.profileProfile?.includes("/public/default_cover.png");

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 w-full group">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1">
          {isDefaultImage ? (
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
              <FaUser className="text-gray-400 text-2xl" />
            </div>
          ) : (
            <img
              src={profilePhotoUrl}
              alt={`${friend.firstName} ${friend.lastName}`}
              className="w-full h-full rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/public/default_cover.png";
              }}
            />
          )}
        </div>
      </div>

      {/* Name Only */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
          {friend.firstName} {friend.lastName}
        </h3>
      </div>
    </div>
  );
};

export default ProfileFriendCard;