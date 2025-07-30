import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  if (!blogs) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 text-xl">Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 text-xl">No trending blogs available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000} // Delay between slides
        transitionDuration={2000} // Smooth transition time
        showDots={true}
        arrows={true}
        pauseOnHover={true}
        swipeable={true}
        draggable={true}
        dotListClass="custom-dot-list-style"
      >
        {blogs.map((element) => (
          <div
            key={element._id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md mx-2"
          >
            <Link to={`/blog/${element._id}`}>
              <div className="relative">
                <img
                  src={element.blogImage?.url || "/fallback.jpg"}
                  alt="blog"
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  {element.category || "General"}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-b-lg h-32 flex flex-col justify-between">
                <h1 className="text-md font-semibold mb-1 truncate">
                  {element.title}
                </h1>
                <div className="flex items-center mt-auto">
                  <img
                    src={element.adminPhoto || "/user.png"}
                    alt="author"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-2 text-gray-500 text-sm">
                    {element.adminName}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Trending;
