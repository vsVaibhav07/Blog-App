import { useAuth } from "../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");

  const filteredBlogs = categoryFilter
    ? blogs?.filter((blog) => blog?.category === categoryFilter)
    : blogs;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {categoryFilter ? `Category: ${categoryFilter}` : "Explore Latest Blogs"}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {categoryFilter
              ? `Showing blogs in ${categoryFilter} category.`
              : "Dive into thoughts, stories, and ideas from our vibrant community of writers."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {blog?.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {blog?.description || "Read more about this topic..."}
                  </p>
                  <span className="inline-block mt-4 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    {blog?.category}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              {categoryFilter ? "No blogs found in this category." : "No blogs available at the moment."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
