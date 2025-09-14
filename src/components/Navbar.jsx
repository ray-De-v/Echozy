import React from "react";
import { assets } from "../assets/assets";
import { FiLogOut, FiUser, FiMessageSquare, FiMenu } from "react-icons/fi";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import { useAuth } from "../Context/authContext";

const Navbar = () => {
  const { navigateTo, API, setSideBar } = useAppContext();
  const { user } = useAuth();

  const handleLogOut = async () => {
    try {
      const response = await API.post("api/user/logout");
      if (response.data.success) {
        toast.success("Logged out successfully! 👋", {
          style: {
            borderRadius: '12px',
            background: '#10B981',
            color: '#fff',
          },
        });
        navigateTo("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {/* Glassmorphism Navbar */}
      <nav className="flex bg-white/80 backdrop-blur-md justify-between items-center px-6 h-12 fixed top-0 left-0 right-0 border-b border-white/20 z-50">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-6">
          <FiMenu
            onClick={() => setSideBar(true)}
            size={22}
            className="lg:hidden cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          />
          <img
            onClick={() => navigateTo("/home")}
            src={assets.app_logo}
            alt="ConnectFolio"
            className="w-40 h-15.5 cursor-pointer object-contain hover:opacity-90 transition-opacity hidden lg:block"
          />
        </div>

        {/* Right Section - Navigation Icons */}
        <div className="flex items-center gap-5">
          {/* Messages */}
          <button
            onClick={() => navigateTo("/messages")}
            className="p-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-100/50 rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Messages"
          >
            <FiMessageSquare size={19} />
          </button>

          {/* Profile */}
          <button
            onClick={() => navigateTo("/profile")}
            className="p-2.5 text-gray-700 hover:text-green-700 hover:bg-green-100/50 rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Profile"
          >
            <FiUser size={19} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogOut}
            className="p-2.5 text-gray-700 hover:text-red-700 hover:bg-red-100/50 rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Logout"
          >
            <FiLogOut size={19} />
          </button>
        </div>
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;