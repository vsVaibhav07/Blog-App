import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Categories
          </h2>
          <ul className="space-y-2 flex flex-col text-sm">
            <Link to="/blogs?category=Devotion" className="hover:text-white">
              Devotion
            </Link>
            <Link
              to="/blogs?category=Entertainment"
              className="hover:text-white"
            >
              Entertainment
            </Link>
            <Link to="/blogs?category=Sports" className="hover:text-white">
              Sports
            </Link>
            <Link to="/blogs?category=Coding" className="hover:text-white">
              Coding
            </Link>
            <Link to="/blogs?category=Technology" className="hover:text-white">
              Technology
            </Link>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
            target="_blank"
              href="https://github.com/vsVaibhav07"
              className="hover:text-white"
            >
              <FaGithub size={20} />
            </a>

            <a
            target="_blank"
              href="https://www.linkedin.com/in/vs-vaibhav-/"
              className="hover:text-white"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Stay connected with us on social media
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        <p>Vaibhav Shukla</p>
      </div>
    </footer>
  );
};

export default Footer;
