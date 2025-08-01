import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  if (!blogs) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-lg animate-pulse">Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-lg">No trending blogs available.</p>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🔥 Trending Blogs</h2>

      <div className="relative pb-8"> {/* Space for dots below carousel */}
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          transitionDuration={1000}
          showDots={true}
          arrows={true}
          pauseOnHover
          swipeable
          draggable
          dotListClass="!absolute bottom-0 w-full flex justify-center mt-2"
        >
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden mx-2 hover:shadow-xl transition duration-300"
            >
              <Link to={`/blog/${blog._id}`}>
                <div className="relative">
                  <img
                    src={blog.blogImage?.url || "/fallback.jpg"}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                    {blog.category || "General"}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 h-36 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center mt-3">
                    <img
                      src={blog.adminPhoto || "/user.png"}
                      alt={blog.adminName}
                      className="w-8 h-8 rounded-full border"
                    />
                    <p className="ml-2 text-gray-500 text-sm">{blog.adminName}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;
