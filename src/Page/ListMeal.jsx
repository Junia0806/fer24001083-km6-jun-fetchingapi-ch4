/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Component/navbar";
import Footer from "../Component/footer";
import { RingLoader } from "react-spinners";

function MealList() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setMeals(response.data.meals);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
    fetchData();
  }, [category]);

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
      <div className="mx-auto px-4 mt-4 py-10 bg-white">
        {/* <h1 className="font-bold text-3xl text-center">
      </h1> */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                <p className="text-center text-sm font-semibold">{category}</p>
              </div>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-center text-xl mb-2 text-black">
                  {meal.strMeal}
                </p>
                <Link
                  to={`/detail/${meal.idMeal}`}
                  className="block text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-400 hover:text-black focus:outline-none"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MealList;
