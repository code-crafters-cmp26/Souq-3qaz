// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  // Check local storage on component mount
  useEffect(() => {
    let storedIsLoggedIn = false;
    let storedUserType = false;
    if (localStorage.getItem("token")) {
      storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      storedUserType = localStorage.getItem("userType");
    }

    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }

    if (storedUserType) {
      setUserType(JSON.parse(storedUserType));
    }
  }, []);

  const login = () => {
    // Perform login logic
    setIsLoggedIn(true);

    // Store in local storage
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("userType", JSON.stringify(userType));
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);

    // Clear from local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userType, setUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
