// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Simulated logic to check if user is logged in
  useEffect(() => {
    // Check if user is logged in (e.g., check local storage or token)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to set the current user
  const loginUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Function to log out the current user
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Value object to be passed to consumers
  const value = {
    currentUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
