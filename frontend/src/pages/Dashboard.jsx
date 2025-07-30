import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";
import Profile from "./Profile";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-white shadow-md">
        <Sidebar component={component} setComponent={setComponent} />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[80vh] transition-all">
          {
          component === "My Profile" ? (
            <Profile/>
          ) : 
          component === "Create Blog" ? (
            <CreateBlog />
          ) : component === "Update Blog" ? (
            <UpdateBlog />
          ) : (
            <MyBlogs />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
