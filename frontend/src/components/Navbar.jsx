import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <span role="img" aria-label="palette">🎨</span>
        <span>Virtual Art Gallery</span>
      </Link>
      <div className="space-x-6">
        <Link to="/gallery" className="text-gray-700 hover:text-blue-600 font-medium">Gallery</Link>
        <Link to="/collection" className="text-gray-700 hover:text-blue-600 font-medium">My Collection</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
