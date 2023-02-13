import { useContext, createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext: any = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const logoutUser = () => {
  window.localStorage.setItem("user", JSON.stringify(null));
};

export const updateUserToken = (userData: any) => {
  window.localStorage.setItem("user", JSON.stringify(userData));
};
