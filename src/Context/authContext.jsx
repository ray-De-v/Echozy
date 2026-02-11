import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./Context";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

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
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
