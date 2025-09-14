import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const [create, setCreate] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [frdRequests, setFrdRequests] = useState([]);

  const API = axios.create({
    baseURL:
      import.meta.env.VITE_API_URL || "https://client-side-peach.vercel.app",
    withCredentials: true, // send cookies
  });


  const fetchAllPosts = async () => {
    try {
      const response = await API.get("/api/user/getAllPosts");

      if (response.data.success) {
        setPosts(response.data.posts);
        return;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return [];
    }
  };

  const fetchAllFriends = async () => {
    try {
      const response = await API.get("/api/friend/categoryFriends");
      if (response.data.success) {
        setFriends(response.data.friendsList);
        setNonFriends(response.data.nonFriendsList);
        return;
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllFriendsRequest = async () => {
    try {
      const response = await API.get("/api/friend/friendsRequests");
      if (response.data.success) {
        setFrdRequests(response.data.friendsRequests);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    fetchAllFriends();
    fetchAllFriendsRequest();
  }, []);

  const value = {
    navigateTo,
    create,
    setCreate,
    sidebar,
    setSideBar,
    API,
    posts,
    friends,
    nonFriends,
    frdRequests,
    fetchAllFriends,
    fetchAllFriendsRequest,
    fetchAllPosts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
