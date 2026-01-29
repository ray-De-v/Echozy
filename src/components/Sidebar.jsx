import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/Context";
import { MdInfo, MdHome } from "react-icons/md";
import { FaUsers, FaTimes } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { useAuth } from "../Context/authContext";

const Sidebar = () => {
  const { navigateTo, sidebar, setSideBar, normalApi } = useAppContext();
  const { user } = useAuth();

  return (
    <div
      className={`lg:w-fit h-screen fixed bottom-0 transition z-50  lg:left-0 lg:opacity-100 lg:right-auto
        ${
          sidebar
            ? "left-0 opacity-100 w-80 bg-white shadow-2xl"
            : "left-[-100%] opacity-0 w-0"
        }
      `}
    >
      {/* Mobile Header with Close Button */}
      {sidebar && (
        <div className="lg:hidden flex items-center justify-between p-5 border-b border-gray-200 bg-white mt-3">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={() => setSideBar(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes size={20} className="text-gray-600" />
          </button>
        </div>
      )}

      <div className="flex flex-col p-6 lg:p-5 lg:mt-10 w-full">
        {/* User Profile */}
        <div
          onClick={() => {
            navigateTo("/profile");
            setSideBar(false);
          }}
          className="flex items-center gap-3 p-4 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors mb-4 border border-gray-100"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-0.5">
            <img
              src={
                user?.profilePhoto
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">View your profile</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          <div
            onClick={() => {
              navigateTo("/home");
              setSideBar(false);
            }}
            className="flex items-center gap-4 p-4 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <MdHome size={20} className="text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Home</span>
          </div>

          <div
            onClick={() => {
              navigateTo("/all-friends");
              setSideBar(false);
            }}
            className="flex items-center gap-4 p-4 hover:bg-green-50 rounded-xl cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <FaUsers size={18} className="text-green-600" />
            </div>
            <span className="font-medium text-gray-900">Friends</span>
          </div>

          <div
            onClick={() => {
              navigateTo("/echo-ai");
              setSideBar(false);
            }}
            className="flex items-center gap-4 p-4 hover:bg-purple-50 rounded-xl cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <RiRobot2Line size={18} className="text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">Echo AI</span>
          </div>

          <div
            onClick={() => {
              navigateTo("/about-us");
              setSideBar(false);
            }}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <MdInfo size={18} className="text-gray-600" />
            </div>
            <span className="font-medium text-gray-900">About Us</span>
          </div>
        </div>

        {/* App Info Footer - Mobile Only */}
        <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">ConnectFolio App</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
