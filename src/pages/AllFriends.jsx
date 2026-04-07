import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FriendCard from "../components/FriendCard";
import { useAppContext } from "../Context/Context";
import FriendsRequest from "../components/FriendsRequest";

const AllFriends = () => {
  const { normalApi, API, friends, nonFriends, frdRequests } = useAppContext();
  
  // Loading states based on context data availability
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [nonFriendsLoading, setNonFriendsLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    if (friends !== undefined) setFriendsLoading(false);
    if (nonFriends !== undefined) setNonFriendsLoading(false);
    if (frdRequests !== undefined) setRequestsLoading(false);
  }, [friends, nonFriends, frdRequests]);

  // Skeleton card component (matches FriendCard shape)
  const SkeletonCard = () => (
    <div className="w-40 sm:w-48 bg-gray-100 rounded-xl p-3 animate-pulse">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded mt-3 w-3/4 mx-auto"></div>
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/2 mx-auto"></div>
    </div>
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Your original container - unchanged */}
      <div className="flex items-center flex-col justify-center p-5 mt-20 max-w-2xl gap-10 rounded mx-auto flex-wrap bg-white shadow">
        
        {/* Your Friends Section */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-center">Your Friends</h2>
          <div className="flex gap-5 flex-wrap justify-center mt-4">
            {friendsLoading ? (
              // Show skeleton cards while loading
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : friends && friends.length > 0 ? (
              friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No friends found</p>
            )}
          </div>
        </div>

        <div className="h-[1.5px] w-full bg-gray-200 my-2"></div>

        {/* People You May Know Section */}
        <div className="w-full">
          <h1 className="text-xl font-semibold text-center mt-10">People You May Know</h1>
          <div className="flex gap-5 flex-wrap justify-center mt-4">
            {nonFriendsLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : nonFriends && nonFriends.length > 0 ? (
              nonFriends.map((person) => (
                <FriendCard key={person._id} nonFriend={person} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No suggestions found</p>
            )}
          </div>
        </div>

        <div className="h-[1.5px] w-full bg-gray-200 my-2 mt-4"></div>

        {/* Friend Requests Section */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-center">Friends requests</h2>
          <div className="flex gap-4 justify-center flex-wrap items-center mt-4">
            {requestsLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : frdRequests.length > 0 ? (
              frdRequests.map((request, index) => (
                <FriendsRequest key={request._id || index} request={request} />
              ))
            ) : (
              <p className="text-center text-gray-600 w-full">
                No friend requests yet. Invite friends to connect!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFriends;
