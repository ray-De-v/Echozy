import React from "react";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";

const FriendsRequest = ({ request }) => {
  const {
    API,
    normalApi,
    frdRequests,
    fetchAllFriends,
    fetchAllFriendsRequest,
  } = useAppContext();

  const handleConfirm = async () => {
    try {
      const response = await API.post("/api/friend/accept", {
        senderId: request._id,
      });
      if (response.data.success) {
        toast.success("Friend request accepted! 🎉", {
          style: {
            borderRadius: "12px",
            background: "#10B981",
            color: "#fff",
          },
        });
        fetchAllFriends();
        fetchAllFriendsRequest();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleCancel = async () => {
    try {
      const response = await API.post("/api/friend/cancel", {
        receiverId: request._id,
      });
      if (response.data.success) {
        toast.success("Friend request declined");
        fetchAllFriends();
        fetchAllFriendsRequest();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const profilePhotoUrl = request?.profilePhoto;

  const isDefaultImage = !request?.profilePhoto;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 w-72">
      {/* Profile Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {/* Profile Image Container */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
          {isDefaultImage ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-400 text-2xl" />
            </div>
          ) : (
            <img
              src={profilePhotoUrl}
              alt={request.firstName}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-14 p-5 text-center">
        <h2 className="font-semibold text-xl text-gray-800 mb-1 truncate px-2">
          {request.firstName} {request.lastName}
        </h2>

        <p className="text-sm text-gray-500 mb-6">Wants to connect with you</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <FaCheck size={14} />
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 border border-gray-200"
          >
            <FaTimes size={14} />
            Decline
          </button>
        </div>
      </div>

      {/* Timestamp */}
      <div className="px-5 pb-4">
        <p className="text-xs text-gray-400 text-center">2 days ago</p>
      </div>
    </div>
  );
};

export default FriendsRequest;
