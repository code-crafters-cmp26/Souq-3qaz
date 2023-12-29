// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);
  const categories = ["Electronics", "Health", "Cosmetics", "Fashion"];

  // Check local storage on component mount
  useEffect(() => {
    let storedIsLoggedIn = false;
    let storedUserType = "";
    let storedUserData = {};
    if (localStorage.getItem("token")) {
      storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      storedUserType = localStorage.getItem("userType");
      storedUserData = localStorage.getItem("userData");
    }

    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      setUserType(JSON.parse(storedUserType));
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = () => {
    // Perform login logics
    const storedUserData = localStorage.getItem("userData");
    const storedUserType = localStorage.getItem("userType");
    setUserType(JSON.parse(storedUserType));
    setIsLoggedIn(true);
    setUserData(JSON.parse(storedUserData));

    // Store in local storage
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);

    setUserType("");
    setUserData(null);
    // Clear from local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userType,
        setUserType,
        userData,
        setUserData,
        categories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
