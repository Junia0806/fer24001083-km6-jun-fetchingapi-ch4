/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Component/navbar";
import Footer from "../Component/footer";

function HomeRecipe() {
  const [searchAlphabet, setSearchAlphabet] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Fungsi untuk mencari resep berdasarkan huruf awal nama resep
  async function searchByLetter(letter) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      setSearchAlphabet(response.data.meals || []);
      setErrorMessage(response.data.meals ? "" : "Meals data is not available");
    } catch (error) {
      console.error("Error searching recipes by letter:", error);
      setErrorMessage("Terjadi kesalahan dalam mengambil data makanan");
    }
  }

  // Fungsi untuk membuat tombol A-Z
  function AlphabetButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return (
      <div className="flex flex-wrap justify-center space-x-2 mt-4">
        {alphabet.map((letter, index) => (
          <span
            key={index}
            onClick={() => {
              searchByLetter(letter);
              setSelectedLetter(letter);
            }}
            className={`text-black cursor-pointer flex items-center justify-center hover:font-bold focus:outline-none text-xl ${
              selectedLetter === letter ? "font-bold" : ""
            }`}
          >
            {letter.toUpperCase()}
          </span>
        ))}
      </div>
    );
  }

  // Panggil searchByLetter dengan huruf 'a' saat komponen dimuat
  useEffect(() => {
    searchByLetter("a");
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-landing">
        <div className="mb-8">
          <h1 className="text-black font-bold text-6xl text-center judul">
            Welcome to MyRecipe
          </h1>
        </div>
        <div className="flex">
          <Link
            to="/search"
            className="bg-gray-400 py-2 px-4 rounded text-black font-semibold hover:bg-gray-900 hover:text-white mr-3 mb-3 sm:mb-0"
          >
            Search Now
          </Link>
          <Link
            to="/random"
            className="bg-gray-900 py-2 px-4 rounded text-white font-semibold hover:bg-gray-400 hover:text-black mr-3 mb-3 sm:mb-0"
          >
            Get Random
          </Link>
        </div>
      </div>

      <div className="bg-white p-8">
        {/* Tombol A-Z */}
        <div>
          <p className="text-black flex items-center justify-center font-bold text-2xl">
            Search By Letter
          </p>
          <AlphabetButtons />
        </div>

        {/* Menampilkan hasil pencarian atau pesan error */}
        {errorMessage ? (
          <p className="text-red-500 text-center mt-4 font-semibold text-xl">
            {errorMessage}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchAlphabet.map((meals) => (
              <div
                key={meals.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
              >
                <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    {meals.strCategory}
                  </p>
                </div>
                <img
                  src={meals.strMealThumb}
                  alt={meals.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-2 text-black">
                    {meals.strMeal}
                  </p>
                  <Link
                    to={`/detail/${meals.idMeal}`}
                    className="block text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-400 hover:text-black focus:outline-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomeRecipe;
