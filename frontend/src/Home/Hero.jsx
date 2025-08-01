import React from "react";
import Slider from "react-slick";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

function Hero() {
  const { blogs } = useAuth();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    arrows:true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto my-10 px-4">
      {blogs && blogs.length > 0 ? (
        <Slider {...settings}>
          {blogs.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="p-2"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="relative group">
                  <img
                    src={element.blogImage.url}
                    alt={element.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-all" />
                  <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors">
                    {element.title}
                  </h2>
                </div>
                <div className="p-4 flex items-center">
                  <img
                    src={element.adminPhoto}
                    alt={element.adminName}
                    className="w-12 h-12 rounded-full border-2 border-yellow-500"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element.adminName}
                    </p>
                    <p className="text-sm text-gray-500">New</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center items-center h-60 text-xl">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Hero;
