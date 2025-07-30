import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/admins`,
        {
          withCredentials: true,
        }
      );
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);
  return (
    <div className=" container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="sm:grid flex flex-col justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div  key={element._id}>
                <div className="flex flex-col items-center w-56 h-56 sm:w-auto sm:h-auto bg-white/60 p-4 rounded-lg shadow-md">
                  <img
                    src={element.photo.url}
                    alt="blog"
                    className="w-32 h-32 md:w-56 md:h-56 object-cover border border-black rounded-full items-center "
                  />
                  <div className="text-center w-full ">
                    <p className=" flex justify-center items-center text-center">{element.name}</p>
                    <p className="text-gray-600 text-xs">{element.role}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Creator;
