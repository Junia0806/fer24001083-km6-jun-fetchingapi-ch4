/* eslint-disable no-unused-vars */
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">MyRecipe</p>
          <div>
            <p className="text-l ">Follow Junia:</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-white hover:text-gray-300 text-xl ">
              <i className="fa-brands fa-instagram y-300"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-xl">
              <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
