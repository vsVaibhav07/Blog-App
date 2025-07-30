import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Profile() {
  const { profile, setProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    about: "",
    email: "",
  });

  // 🔁 Fetch profile from API if not already available
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/my-profile`,
          { withCredentials: true }
        );
        setProfile(data.user);
      } catch (err) {
        console.error("Error fetching profile", err);
        toast.error("Failed to load profile");
      }
    };

    if (!profile || !profile.email) {
      fetchProfile();
    }
  }, [profile, setProfile]);

  // 📝 Update formData when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        about: profile.about || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update-profile`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully");
      setProfile(data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          👤 Profile Information
        </h2>

        <div className="flex items-center space-x-4">
          <img
            src={profile?.photo?.url || "/defaultDp.webp"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-gray-300 object-cover"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-xl font-semibold text-gray-700 border px-2 py-1 rounded"
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-700">
                {profile?.name}
              </h3>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-800 border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-800">{profile?.email}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Joined On</p>
            <p className="text-gray-800">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Bio</p>
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
              />
            ) : (
              <p className="text-gray-700">
                {profile?.about || "No bio available."}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
