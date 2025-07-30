import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);

        // Fetch related blogs by category (optional)
        const related = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs?category=${data.category}`,
          { withCredentials: true }
        );
        // Exclude current blog
        setRelatedBlogs(
          related.data.filter((b) => b._id !== id).slice(0, 3)
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {blogs && (
        <section className="container mx-auto p-4">
          {/* Category */}
          <div className="text-blue-500 uppercase text-xs font-bold mb-4">
            {blogs?.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>

          {/* Author Info */}
          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-semibold">{blogs?.adminName}</p>
          </div>

          {/* Blog Image + Description */}
          <div className="flex flex-col md:flex-row">
            {blogs?.blogImage && (
              <img
                src={blogs?.blogImage?.url}
                alt="mainblogsImg"
                className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-6">
              <p className="whitespace-pre-wrap text-lg mb-6">{blogs?.about}</p>

              {/* Blog Ratings */}
              {blogs?.rating && (
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 text-xl ${
                        index < blogs.rating ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {blogs.rating}/5
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                  >
                    <img
                      src={blog.blogImage?.url}
                      alt={blog.title}
                      className="h-40 w-full object-cover rounded mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {blog.about}
                    </p>
                    <a
                      href={`/blog/${blog._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      पढ़ें →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Detail;
