/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/navbar";
import Footer from "../Component/footer";
import { RingLoader } from "react-spinners";

function Area() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [meals, setMeals] = useState([]);
  const [areaMealThumbs, setAreaMealThumbs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (areas.length > 0) {
      fetchAreaMealThumbs();
    }
  }, [areas]);

  const fetchAreas = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((data) => {
        setAreas(data.meals);
        setLoading(false); // Set loading to false once areas are fetched
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  };

  const fetchAreaMealThumbs = async () => {
    try {
      for (const area of areas) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.strArea}`
        );
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          const mealThumb = data.meals[0].strMealThumb;
          setAreaMealThumbs((prevThumbs) => ({
            ...prevThumbs,
            [area.strArea]: mealThumb,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching meal thumbnails:", error);
    }
  };

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => {
        console.error(`Error fetching meals for ${area}:`, error);
      });
  };

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
          Search By Area
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <div
              key={area.strArea}
              onClick={() => handleAreaClick(area.strArea)}
              className="relative overflow-hidden rounded-md cursor-pointer"
              style={{
                backgroundImage: `url(${areaMealThumbs[area.strArea]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-0 text-white hover:text-black flex items-center justify-center">
                <p className=" font-bold text-lg">{area.strArea}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedArea && (
          <div className="pt-5">
            <h2
              className="font-bold text-4xl text-center mb-8 text-gray-200"
              style={{ textShadow: "0 0 5px black" }}
            >
              Meals from {selectedArea}
            </h2>
            <div
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              style={{ border: "2px dashed black" }}
            >
              {meals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                >
                  <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                    <p className="text-center text-sm font-semibold">
                      {selectedArea}
                    </p>
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Area;
