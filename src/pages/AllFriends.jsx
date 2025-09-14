import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FriendCard from "../components/FriendCard";
import { useAppContext } from "../Context/Context";
import FriendsRequest from "../components/FriendsRequest";

const AllFriends = () => {
  const { normalApi, API, friends, nonFriends, frdRequests } = useAppContext();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex items-center flex-col justify-center p-5 mt-20 max-w-2xl gap-10  rounded mx-auto flex-wrap bg-white shadow">
        <h2 className="text-xl font-semibold">Your Friends</h2>
        <div className="flex gap-5 flex-wrap justify-center">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))
          ) : (
            <p>No friends found</p>
          )}
        </div>
        <div className="h-[1.5px] w-full bg-gray-200 my-2"></div>
        <h1 className="text-xl font-semibold mt-10">People You May Know</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {nonFriends && nonFriends.length > 0 ? (
            nonFriends.map((person) => (
              <FriendCard key={person._id} nonFriend={person} />
            ))
          ) : (
            <p>No suggestions found</p>
          )}
        </div>
        <div className="h-[1.5px] w-full bg-gray-200 my-2 mt-4"></div>
        <h2 className="text-xl font-semibold">Friends requests</h2>
        <div className="flex gap-4 justify-center flex-wrap items-center">
          {frdRequests.length > 0 ? (
            frdRequests.map((request, index) => {
              return <FriendsRequest key={index} request={request} />;
            })
          ) : (
            <p className="text-center text-gray-600">No friend requests yet. Invite friends to connect!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllFriends;
