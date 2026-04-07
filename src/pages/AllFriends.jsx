import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FriendCard from "../components/FriendCard";
import { useAppContext } from "../Context/Context";
import FriendsRequest from "../components/FriendsRequest";

const AllFriends = () => {
  const { normalApi, API, friends, nonFriends, frdRequests } = useAppContext();

  // Local loading states based on context data availability
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading until context data is ready
    if (friends !== undefined) setFriendsLoading(false);
    if (nonFriends !== undefined) setSuggestionsLoading(false);
    if (frdRequests !== undefined) setRequestsLoading(false);
  }, [friends, nonFriends, frdRequests]);

  // Skeleton card component
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
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            
            {/* Your Friends Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-user-group text-blue-500 text-xl"></i>
                <h2 className="text-xl font-bold text-gray-800">Your Friends</h2>
                {!friendsLoading && friends?.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {friends.length}
                  </span>
                )}
              </div>
              
              {friendsLoading ? (
                <div className="flex gap-4 flex-wrap justify-center">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : friends && friends.length > 0 ? (
                <div className="flex gap-5 flex-wrap justify-center">
                  {friends.map((friend) => (
                    <FriendCard key={friend._id} friend={friend} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fa-regular fa-face-smile text-5xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">No friends yet</p>
                  <p className="text-sm text-gray-400">Start connecting with people!</p>
                </div>
              )}
            </div>

            {/* People You May Know Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-lightbulb text-yellow-500 text-xl"></i>
                <h1 className="text-xl font-bold text-gray-800">People You May Know</h1>
                {!suggestionsLoading && nonFriends?.length > 0 && (
                  <span className="ml-2 bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                    {nonFriends.length}
                  </span>
                )}
              </div>
              
              {suggestionsLoading ? (
                <div className="flex gap-4 flex-wrap justify-center">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : nonFriends && nonFriends.length > 0 ? (
                <div className="flex gap-5 flex-wrap justify-center">
                  {nonFriends.map((person) => (
                    <FriendCard key={person._id} nonFriend={person} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fa-regular fa-compass text-5xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">No suggestions found</p>
                  <p className="text-sm text-gray-400">Check back later for new recommendations!</p>
                </div>
              )}
            </div>

            {/* Friend Requests Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-hand-peace text-purple-500 text-xl"></i>
                <h2 className="text-xl font-bold text-gray-800">Friend Requests</h2>
                {!requestsLoading && frdRequests?.length > 0 && (
                  <span className="ml-2 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                    {frdRequests.length}
                  </span>
                )}
              </div>
              
              {requestsLoading ? (
                <div className="flex gap-4 flex-wrap justify-center">
                  {[...Array(2)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : frdRequests && frdRequests.length > 0 ? (
                <div className="flex gap-4 justify-center flex-wrap items-center">
                  {frdRequests.map((request, index) => (
                    <FriendsRequest key={request._id || index} request={request} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fa-regular fa-bell-slash text-5xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">No friend requests yet</p>
                  <p className="text-sm text-gray-400">Invite friends to connect!</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AllFriends;
