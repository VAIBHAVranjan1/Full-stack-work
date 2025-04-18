import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      inputs,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setCurrentUser(response.data);
    return response;
  };

  const logout = async (inputs) => {
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      inputs,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    return response;
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <userContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
