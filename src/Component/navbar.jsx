/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-2xl">
              MyRecipe
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={`/meal`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-l font-medium"
              >
                Category
              </Link>
              <Link
                to={`/area`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-l font-medium"
              >
                Area
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
