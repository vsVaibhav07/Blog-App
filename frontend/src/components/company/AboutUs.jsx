import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">About Me</h1>
        
        <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
          <p>
            Hello! I'm <strong>Vaibhav Shukla</strong>, a passionate web developer with a strong interest in building modern, scalable, and user-friendly web applications. I enjoy creating projects that solve real-world problems.
          </p>

          <p>
            My tech stack includes <strong>React.js</strong>, <strong>Tailwind CSS</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>. I also have experience with authentication, REST APIs, state management tools like Redux, and responsive design principles.
          </p>

          <p>
            I am always eager to learn new technologies and improve my skills. Whether it's frontend design or backend logic, I strive for clean code and great user experience.
          </p>

         
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for visiting! Let's build something amazing together 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
