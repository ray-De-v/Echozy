import React, { useState, useRef } from "react";
import { AiOutlineClose, AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import { useAppContext } from "../Context/Context";
import { useAuth } from "../Context/authContext";
import toast from "react-hot-toast";

const EditProfile = ({ setDisplayEdit, fetchPosts }) => {
  const { normalApi, API, navigateTo } = useAppContext();
  const { user } = useAuth();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [loader, setLoader] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [website, setWebsite] = useState(user?.website || "");

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleImageClick = (ref) => {
    ref.current?.click();
  };

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (firstName) formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);
    if (bio) formData.append("bio", bio);
    if (location) formData.append("location", location);
    if (website) formData.append("website", website);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    if (coverPhoto) formData.append("coverPhoto", coverPhoto);

    try {
      setLoader(true);
      const response = await API.put("/api/user/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!", {
          style: {
            borderRadius: "12px",
            background: "#10B981",
            color: "#fff",
          },
        });
        setDisplayEdit(false);
        fetchPosts();
        navigateTo("/profile");
        // Consider using a context update instead of full reload
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoader(false);
    }
  };

  const profilePhotoUrl = profilePhoto
    ? URL.createObjectURL(profilePhoto)
    : user?.profilePhoto?.startsWith("https://res.cloudinary")
    ? user.profilePhoto
    : `${normalApi}${user?.profilePhoto || "/public/default_profile.jpeg"}`;

  const coverPhotoUrl = coverPhoto
    ? URL.createObjectURL(coverPhoto)
    : user?.coverPhoto?.startsWith("https://res.cloudinary")
    ? user.coverPhoto
    : `${normalApi}${user?.coverPhoto || "/public/default_cover.png"}`;

  return (
    <>
      {loader && (
        <div className="fixed inset-0 bg-black/50 h-[calc(100vh-2rem)]  z-5000 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-3"></div>
            <p className="text-white font-medium">Updating profile...</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={() => setDisplayEdit(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <AiOutlineClose size={24} className="text-gray-600" />
            </button>
          </div>

          <form
            onSubmit={onSumbitHandler}
            className="max-h-[80vh] overflow-y-auto"
          >
            {/* Cover Photo */}
            <div className="relative">
              <div
                className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer"
                onClick={() => handleImageClick(coverInputRef)}
              >
                {coverPhotoUrl && (
                  <img
                    src={coverPhotoUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white flex flex-col items-center">
                    <AiOutlineCamera size={24} />
                    <span className="text-sm mt-1">Change cover photo</span>
                  </div>
                </div>
              </div>
              <input
                ref={coverInputRef}
                onChange={(e) => setCoverPhoto(e.target.files[0])}
                type="file"
                accept="image/*"
                hidden
              />

              {/* Profile Photo */}
              <div className="absolute -bottom-12 left-6">
                <div
                  className="w-24 h-24 rounded-full border-4 border-white bg-white cursor-pointer shadow-lg relative"
                  onClick={() => handleImageClick(profileInputRef)}
                >
                  <img
                    src={profilePhotoUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <AiOutlineCamera size={20} className="text-white" />
                  </div>
                </div>
                <input
                  ref={profileInputRef}
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-16 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <AiOutlineUser size={18} />
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setDisplayEdit(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
