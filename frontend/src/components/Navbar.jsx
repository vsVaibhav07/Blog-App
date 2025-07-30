import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, loading } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-md px-4 py-3 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          Blog<span className="text-blue-600">App</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/blogs" className="hover:text-blue-500 transition">
            Blogs
          </Link>
          <Link to="/creators" className="hover:text-blue-500 transition">
            Creators
          </Link>
          <Link to="/profile" className="hover:text-blue-500 transition">
            Profile
          </Link>
          {!loading && isAuthenticated && profile?.role === "admin" && (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
          )}
          {!isAuthenticated && !loading ? (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Login
            </Link>
          ) : (
            !loading && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg py-4 px-6">
          <ul className="flex flex-col space-y-4 text-gray-700 text-lg font-medium">
            <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500">
              Blogs
            </Link>
            <Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-500">
              Creators
            </Link>
            <Link to="/profile" onClick={() => setShow(false)} className="hover:text-blue-500">
              Profile
            </Link>
            {!loading && isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={() => setShow(false)}
                className="hover:text-blue-500"
              >
                Dashboard
              </Link>
            )}
            {!isAuthenticated && !loading ? (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Login
              </Link>
            ) : (
              !loading && (
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShow(false);
                  }}
                  className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
