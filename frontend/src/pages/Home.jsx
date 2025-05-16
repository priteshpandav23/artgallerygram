import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-16 px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Virtual Art Gallery</h1>
      <p className="text-gray-600 mb-6">
        Explore masterpieces, learn about artists, and build your own collection from the Harvard Art Museums.
      </p>
      <Link
        to="/gallery"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Gallery
      </Link>
    </div>
  );
};

export default Home;
