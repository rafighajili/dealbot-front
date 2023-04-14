import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  });

  const { accessToken, refreshToken } = auth;

  useEffect(() => {
    accessToken && localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  useEffect(() => {
    refreshToken && localStorage.setItem("refreshToken", refreshToken);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
