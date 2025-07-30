import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaUser } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Contact Me</h1>

        <div className="space-y-5 text-gray-800 text-[17px]">
          <div className="flex items-center gap-3">
            <FaUser className="text-indigo-500" />
            <span><strong>Name:</strong> Vaibhav Shukla</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-indigo-500" />
            <span>
              <strong>Email:</strong>{" "}
              <a href="mailto:vsvaibhav0704@gmail.com" className="text-indigo-600 hover:underline">
                vsvaibhav0704@gmail.com
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-indigo-500" />
            <span><strong>Phone:</strong> +91-8957709185</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-indigo-500" />
            <span><strong>Location:</strong> Lucknow, Uttar Pradesh, India</span>
          </div>

          <div className="flex items-center gap-3">
            <FaLinkedin className="text-indigo-500" />
            <span>
              <strong>LinkedIn:</strong>{" "}
              <a href="https://linkedin.com/in/vs-vaibhav-" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                /vs-vaibhav-
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaGithub className="text-indigo-500" />
            <span>
              <strong>GitHub:</strong>{" "}
              <a href="https://github.com/vsVaibhav07" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                @vsVaibhav07
              </a>
            </span>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-700">
          <p>Feel free to reach out or just say hello 👋</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
