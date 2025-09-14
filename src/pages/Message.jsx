import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import { useEffect } from "react";
import SingleChat from "./../components/SingleChat";
import ChatFriendCard from "../components/ChatFriends";

const Message = () => {
  const [friends, setFriends] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const { API } = useAppContext();

  const fetchFriendsToChat = async () => {
    try {
      const response = await API.get("/api/user/get/chat-friends");
      if (response.data.success) {
        setFriends(response.data.friends);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchFriendsToChat();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="max-w-lg bg-white p-4 rounded-lg mx-auto mt-4 shadow-sm">
        {!singleUser && (
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Chats with friends
          </h2>
        )}
        {!singleUser && <div className="h-px bg-gray-200 mb-4"></div>}
        {singleUser && (
          <SingleChat singleUser={singleUser} setSingleUser={setSingleUser} />
        )}
        {!singleUser && (
          <div className="space-y-2">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <ChatFriendCard
                  key={friend._id}
                  friend={friend}
                  setSingleUser={setSingleUser}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 text-xl">
                No friends to chat with yet.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
