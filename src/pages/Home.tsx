import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaTimes } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            OneBrain
          </h1>
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/signin"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Organize Your Mind with OneBrain
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-xl sm:max-w-2xl mx-auto">
            A sleek bookmarking tool to save, categorize, and access your ideas effortlessly.
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-semibold transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Connect Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleModal}
          className="p-2 sm:p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-sm sm:text-base transition duration-300"
        >
          Connect
        </button>
      </div>

      {/* Modal for Social Links */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg relative w-11/12 max-w-xs sm:max-w-sm">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <FaTimes size={16} className="sm:h-5 sm:w-5" />
            </button>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Connect with Us</h3>
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <a
                href="https://github.com/Raja6284"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaGithub size={24} className="sm:h-8 sm:w-8" />
              </a>
              <a
                href="https://x.com/_raja_berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaTwitter size={24} className="sm:h-8 sm:w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/raja-kumar-b1453826a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaLinkedin size={24} className="sm:h-8 sm:w-8" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;