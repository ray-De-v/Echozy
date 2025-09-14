import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import ProfileImage from './ProfileImage';
import { FiImage } from "react-icons/fi";

const Photos = () => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { API } = useAppContext();

  const getAllPhotos = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("api/user/get-photose");
      if (response.data.success) {
        setAllPhotos(response.data.profilePhotose);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching photos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FiImage className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <FiImage className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
        <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full ml-2">
          {allPhotos.length}
        </span>
      </div>

      {/* Photos Grid */}
      {allPhotos.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {allPhotos.map((photo, index) => (
            <ProfileImage key={index} photo={photo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiImage className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 text-sm">No photos yet</p>
          <p className="text-gray-400 text-xs mt-1">Upload your first photo to get started</p>
        </div>
      )}
    </div>
  );
};

export default Photos;