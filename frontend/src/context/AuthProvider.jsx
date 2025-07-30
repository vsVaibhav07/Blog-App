import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");

  // Set Authorization header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch profile only if token is present
  const fetchProfile = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthenticated(false);
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/my-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Failed to fetch profile", error);
      }
      setIsAuthenticated(false);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update-profile`,
        updatedData
      );
      setProfile(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Failed to update profile", error);
      return {
        success: false,
        error: error.response?.data?.message || "Update failed",
      };
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/all-blogs`
      );
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setProfile(null);
  };

  // 🔐 Fetch profile only on initial load if token exists
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false); // avoid infinite loading screen
    }
  }, []);

  // 📚 Fetch blogs only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchProfile,
        updateProfile,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
