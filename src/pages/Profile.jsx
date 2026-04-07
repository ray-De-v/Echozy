// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { useAppContext } from "../Context/Context";
// import Create from "../components/Create";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../Context/authContext";
// import EditProfile from "../components/EditProfile";
// import ProfileCard from "../components/profileCard";
// import toast from "react-hot-toast";
// import Row from "../components/Row";
// import Friends from "../components/Friends";
// import Photos from "../components/Photos";

// const Profile = () => {
//   const [displayEdit, setDisplayEdit] = useState(false);
//   const [activeTab, setActiveTab] = useState("posts");
//   const [posts, setAllPosts] = useState([]);
//   const { navigateTo, create, setCreate, normalApi, API } = useAppContext();
//   const { user } = useAuth();

//   const fetchPosts = async () => {
//     const response = await API.get("api/user/get-posts");
//     if (response.data.success) {
//       setAllPosts(response.data.posts);
//     } else {
//       toast.error(response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <>
//       {create && <Create />}
//       {displayEdit && (
//         <EditProfile fetchPosts={fetchPosts} setDisplayEdit={setDisplayEdit} />
//       )}
//       <Navbar />
//       <Sidebar />
      
//       {/* Main Container */}
//       <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-0 pb-10">
//         {/* Cover & Profile Section */}
//         <div className="relative mt-6 mb-16">
//           {/* Cover Photo */}
//           <div className="rounded-lg overflow-hidden shadow-sm">
//             <img
//               src={
//                 user?.coverPhoto?.startsWith("https://res.cloudinary")
//                   ? user.coverPhoto
//                   : `${normalApi}${
//                       user?.coverPhoto || "/public/default_cover.png"
//                     }`
//               }
//               alt="Cover"
//               className="w-full h-48 object-cover"
//             />
//           </div>
          
//           {/* Profile Picture - Responsive Positioning */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
//             <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-lg">
//               <img
//                 src={
//                   user?.profilePhoto?.startsWith("https://res.cloudinary")
//                     ? user.profilePhoto
//                     : `${normalApi}${
//                         user?.profilePhoto || "/public/default_profile.jpeg"
//                       }`
//                 }
//                 alt="Profile"
//                 className="w-full h-full rounded-full object-cover border-4 border-white"
//               />
//             </div>
//           </div>
//         </div>

//         {/* User Name - Responsive Positioning */}
//         <div className="text-center mb-6 mt-14">
//           <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//             {user.firstName + " " + user.lastName}
//           </h1>
//         </div>

//         {/* Action Buttons - Responsive */}
//         <div className="flex gap-3 justify-center items-center mb-6 flex-wrap">
//           <button
//             onClick={() => navigateTo("/all-friends")}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base shadow-md"
//           >
//             <i className="fa-solid fa-user-group"></i>
//             Add Friends
//           </button>
          
//           <button
//             onClick={() => setDisplayEdit(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm md:text-base border border-gray-300"
//           >
//             <i className="fa-solid fa-pencil"></i>
//             Edit Profile
//           </button>
//         </div>

//         {/* Create Post Card - Responsive */}
//         <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200">
//           <div className="flex items-center gap-3">
//             <img
//               src={
//                 user?.profilePhoto
//               }
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
//             />
//             <div
//               onClick={() => setCreate(true)}
//               className="flex-1 bg-gray-100 cursor-pointer rounded-full px-4 py-2.5 hover:bg-gray-200 transition-colors"
//             >
//               <p className="text-gray-500 text-sm">
//                 What's on your mind, {user.firstName}?
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="mb-4">
//           <Row activeTab={activeTab} setActiveTab={setActiveTab} />
//         </div>

//         {/* Content Section */}
//         <div>
//           {activeTab === "posts" &&
//             (posts.length > 0 ? (
//               <div className="space-y-4">
//                 {posts.map((post) => (
//                   <ProfileCard key={post._id} post={post} fetchPosts={fetchPosts} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 bg-white rounded-xl shadow-sm">
//                 <p className="text-gray-500">No posts available</p>
//               </div>
//             ))}
          
//           {activeTab === "friends" && <Friends />}
//           {activeTab === "photos" && <Photos />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../Context/Context";
import Create from "../components/Create";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/authContext";
import EditProfile from "../components/EditProfile";
import ProfileCard from "../components/profileCard";
import toast from "react-hot-toast";
import Row from "../components/Row";
import Friends from "../components/Friends";
import Photos from "../components/Photos";

const Profile = () => {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setAllPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true); // ✅ Added loading state for posts
  const { navigateTo, create, setCreate, normalApi, API } = useAppContext();
  const { user } = useAuth();

  const fetchPosts = async () => {
    setPostsLoading(true); // ✅ Show skeleton while fetching
    try {
      const response = await API.get("api/user/get-posts");
      if (response.data.success) {
        setAllPosts(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setPostsLoading(false); // ✅ Hide skeleton
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Skeleton loader component
  const PostSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded w-full mt-2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {create && <Create />}
      {displayEdit && (
        <EditProfile fetchPosts={fetchPosts} setDisplayEdit={setDisplayEdit} />
      )}
      <Navbar />
      <Sidebar />

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-0 pb-10">
        {/* Cover & Profile Section */}
        <div className="relative mt-6 mb-16">
          {/* Cover Photo with hover effect */}
          <div className="rounded-xl overflow-hidden shadow-md group">
            <img
              src={
                user?.coverPhoto?.startsWith("https://res.cloudinary")
                  ? user.coverPhoto
                  : `${normalApi}${
                      user?.coverPhoto || "/public/default_cover.png"
                    }`
              }
              alt="Cover"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Profile Picture - with scale on hover */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 transition-transform duration-200 hover:scale-105">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-lg">
              <img
                src={
                  user?.profilePhoto?.startsWith("https://res.cloudinary")
                    ? user.profilePhoto
                    : `${normalApi}${
                        user?.profilePhoto || "/public/default_profile.jpeg"
                      }`
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* User Name */}
        <div className="text-center mb-6 mt-14">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {user.firstName + " " + user.lastName}
          </h1>
        </div>

        {/* Action Buttons - improved styling */}
        <div className="flex gap-3 justify-center items-center mb-6 flex-wrap">
          <button
            onClick={() => navigateTo("/all-friends")}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg active:scale-95 text-sm md:text-base"
          >
            <i className="fa-solid fa-user-group"></i>
            Add Friends
          </button>

          <button
            onClick={() => setDisplayEdit(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all hover:shadow-md active:scale-95 text-sm md:text-base border border-gray-300"
          >
            <i className="fa-solid fa-pencil"></i>
            Edit Profile
          </button>
        </div>

        {/* Create Post Card - improved design */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePhoto}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div
              onClick={() => setCreate(true)}
              className="flex-1 bg-gray-100 cursor-pointer rounded-full px-4 py-2.5 hover:bg-gray-200 transition-colors"
            >
              <p className="text-gray-500 text-sm">
                What's on your mind, {user.firstName}?
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <Row activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content Section */}
        <div>
          {activeTab === "posts" && (
            <>
              {postsLoading ? (
                // Show skeleton loaders while fetching
                <div className="space-y-4">
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <ProfileCard key={post._id} post={post} fetchPosts={fetchPosts} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                  <i className="fa-regular fa-newspaper text-5xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">No posts available</p>
                  <button
                    onClick={() => setCreate(true)}
                    className="mt-3 text-blue-500 hover:underline text-sm"
                  >
                    Create your first post →
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "friends" && <Friends />}
          {activeTab === "photos" && <Photos />}
        </div>
      </div>
    </>
  );
};

export default Profile;



