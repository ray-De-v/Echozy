// import React, { useState } from "react";
// import Navbar from "./../components/Navbar";
// import Sidebar from "./../components/Sidebar";
// import { useAppContext } from "../Context/Context";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import SingleChat from "./../components/SingleChat";
// import ChatFriendCard from "../components/ChatFriends";

// const Message = () => {
//   const [friends, setFriends] = useState([]);
//   const [singleUser, setSingleUser] = useState(null);

//   const { API } = useAppContext();

//   const fetchFriendsToChat = async () => {
//     try {
//       const response = await API.get("/api/user/get/chat-friends");
//       if (response.data.success) {
//         setFriends(response.data.friends);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchFriendsToChat();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Sidebar />
//       <div className="max-w-lg bg-white p-4 rounded-lg mx-auto mt-4 shadow-sm">
//         {!singleUser && (
//           <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
//             Chats with friends
//           </h2>
//         )}
//         {!singleUser && <div className="h-px bg-gray-200 mb-4"></div>}
//         {singleUser && (
//           <SingleChat singleUser={singleUser} setSingleUser={setSingleUser} />
//         )}
//         {!singleUser && (
//           <div className="space-y-2">
//             {friends.length > 0 ? (
//               friends.map((friend) => (
//                 <ChatFriendCard
//                   key={friend._id}
//                   friend={friend}
//                   setSingleUser={setSingleUser}
//                 />
//               ))
//             ) : (
//               <div className="text-center text-gray-500 text-xl">
//                 No friends to chat with yet.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Message;



import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import SingleChat from "./../components/SingleChat";
import ChatFriendCard from "../components/ChatFriends";

const Message = () => {
  const [friends, setFriends] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const { API } = useAppContext();

  const fetchFriendsToChat = async () => {
    setLoading(true);
    try {
      const response = await API.get("/api/user/get/chat-friends");
      if (response.data.success) {
        setFriends(response.data.friends);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendsToChat();
  }, []);

  // Skeleton loader component (matches ChatFriendCard layout)
  const ChatSkeleton = () => (
    <div className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="max-w-lg bg-white rounded-2xl mx-auto mt-6 shadow-lg overflow-hidden border border-gray-100">
        {/* Header (only when no chat is open) */}
        {!singleUser && (
          <div className="p-4 pb-0">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Chats with friends
            </h2>
            <div className="h-px bg-gray-200 mt-4"></div>
          </div>
        )}

        {/* Main content */}
        <div className="p-4">
          {singleUser ? (
            <SingleChat singleUser={singleUser} setSingleUser={setSingleUser} />
          ) : loading ? (
            // Show skeleton loaders while fetching
            <div className="space-y-2">
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
              <ChatSkeleton />
            </div>
          ) : friends.length > 0 ? (
            <div className="space-y-2">
              {friends.map((friend) => (
                <ChatFriendCard
                  key={friend._id}
                  friend={friend}
                  setSingleUser={setSingleUser}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fa-regular fa-comment-dots text-2xl text-gray-400"></i>
              </div>
              <p className="text-gray-500 text-lg">No friends to chat with yet.</p>
              <p className="text-sm text-gray-400 mt-1">Start connecting with people!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
