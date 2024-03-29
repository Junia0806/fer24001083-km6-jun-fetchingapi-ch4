// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Component/navbar";
import Footer from "../Component/footer";
import { RingLoader } from "react-spinners";

export default function Meal() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
        setLoading(false); // Set loading to false once data is fetched
        console.log("", response.data.categories);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white mx-auto px-4 py-20">
        <h1 className="text-black font-bold text-3xl text-center mb-4">
          Meal Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <Link to={`/category/${category.strCategory}`}>
                <div
                  className="bg-cover bg-center rounded-full shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${category.strCategoryThumb})`,
                    height: "150px", // Change height as needed
                    width: "150px", // Change width as needed
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-0 text-white hover:text-black">
                    <p className="font-bold text-lg">{category.strCategory}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
