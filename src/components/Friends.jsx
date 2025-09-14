import React from "react";
import { useAppContext } from "../Context/Context";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ProfileFriendCard from "./ProfileFriendCard";

const Friends = () => {
  const { API, normalApi } = useAppContext();
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const response = await API.get("api/friend/listFriends");
    if (response.data.success) {
      setFriends(response.data.listFriends);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <div className="flex bg-white rounded-xl px-7 py-8 shadow gap-5 max-sm:gap-1 flex-wrap items-center justify-center">
        {friends.length > 0 ? (
          friends.map((friend, index) => {
            return <ProfileFriendCard key={index} friend={friend} />;
          })
        ) : (
          <p className="text-center mx-auto text-gray-500">No friends yet</p>
        )}
      </div>
    </>
  );
};

export default Friends;
