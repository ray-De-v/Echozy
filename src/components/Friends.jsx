import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import ProfileFriendCard from "./ProfileFriendCard"; // restore your card component

const Friends = () => {
  const { API, normalApi } = useAppContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added loader state

  const getFriends = async () => {
    setLoading(true);
    try {
      const response = await API.get("api/friend/listFriends");
      if (response.data.success) {
        setFriends(response.data.listFriends); // ✅ original property name
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load friends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  // ✅ Loader UI
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 animate-pulse">Loading friends...</p>
        </div>
      </div>
    );
  }

  // ✅ Empty state
  if (friends.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
        <i className="fa-regular fa-user-group text-5xl text-gray-300 mb-3"></i>
        <p className="text-gray-500">No friends yet</p>
        <p className="text-sm text-gray-400 mt-1">Start connecting with people!</p>
      </div>
    );
  }

  // ✅ Original layout using your ProfileFriendCard
  return (
    <div className="bg-white rounded-xl px-7 py-8 shadow gap-5 max-sm:gap-1 flex flex-wrap items-center justify-center">
      {friends.map((friend, index) => (
        <ProfileFriendCard key={friend._id || index} friend={friend} />
      ))}
    </div>
  );
};

export default Friends;
