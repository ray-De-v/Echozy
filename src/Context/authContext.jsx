import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./Context";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // wait until checkAuth finishes

  const { API } = useAppContext();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/user/check-auth");
        if (res.data.authenticated) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setAuthChecked(true); // prevent blocking render forever
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
