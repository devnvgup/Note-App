import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
