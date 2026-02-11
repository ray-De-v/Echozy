import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./Context";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    API,
    fetchAllPosts,
    fetchAllFriends,
    fetchAllFriendsRequest,
  } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/user/check-auth");
        if (res.data.authenticated && res.data.user) {
          setUser(res.data.user);
          await fetchAllPosts();
          await fetchAllFriends();
          await fetchAllFriendsRequest();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};