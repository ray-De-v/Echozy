// import React from "react";
// import { useAppContext } from "../Context/Context";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import ProfileFriendCard from "./ProfileFriendCard";

// const Friends = () => {
//   const { API, normalApi } = useAppContext();
//   const [friends, setFriends] = useState([]);

//   const getFriends = async () => {
//     const response = await API.get("api/friend/listFriends");
//     if (response.data.success) {
//       setFriends(response.data.listFriends);
//     } else {
//       toast.error(response.data.message);
//     }
//   };

//   useEffect(() => {
//     getFriends();
//   }, []);

//   return (
//     <>
//       <div className="flex bg-white rounded-xl px-7 py-8 shadow gap-5 max-sm:gap-1 flex-wrap items-center justify-center">
//         {friends.length > 0 ? (
//           friends.map((friend, index) => {
//             return <ProfileFriendCard key={index} friend={friend} />;
//           })
//         ) : (
//           <p className="text-center mx-auto text-gray-500">No friends yet</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Friends;



import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/authContext";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API } = useAppContext();
  const { user } = useAuth();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const response = await API.get("api/user/get-friends"); // adjust endpoint if needed
      if (response.data.success) {
        setFriends(response.data.friends);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load friends");
    } finally {
      setLoading(false);
    }
  };

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

  if (friends.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
        <i className="fa-regular fa-user-group text-5xl text-gray-300 mb-3"></i>
        <p className="text-gray-500">No friends yet</p>
        <p className="text-sm text-gray-400 mt-1">Start connecting with people!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {friends.map((friend) => (
          <div key={friend._id} className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img
              src={friend.profilePhoto || "/default_profile.jpeg"}
              alt={friend.firstName}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <p className="mt-2 font-medium text-sm text-center">{friend.firstName} {friend.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
