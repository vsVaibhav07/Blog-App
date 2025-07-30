import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../src/components/Footer";
import Home from "../src/components/Home";
import Navbar from "../src/components/Navbar";
import Blogs from "../src/pages/Blogs";
import Profile from "./pages/Profile.jsx";

import { Toaster } from "react-hot-toast";
import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import { useAuth } from "./context/AuthProvider";
import UpdateBlog from "./dashboard/UpdateBlog";
import Creators from "./pages/Creators";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Contact from "./components/company/Contact.jsx";
import AboutUs from "./components/company/AboutUs.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {

   useEffect(async() => {
    await axios.get('http://localhost:5000/health')
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((err) => {
        setStatus('Server not responding');
      });
  }, []);

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); 

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/profile" element={<Profile />} />
       
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

         <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/about" element={<AboutUs/>} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
