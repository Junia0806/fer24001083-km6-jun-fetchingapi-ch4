/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { RingLoader } from "react-spinners";

function App() {
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomMeal = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        setRandomMeal(data.meals[0]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching random meal:", error));
  };

  useEffect(() => {
    fetchRandomMeal();
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
      {randomMeal && (
        <div>
          <Confetti />
          <div
            style={{
              backgroundImage: `url(${randomMeal.strMealThumb})`,
            }}
            className="bg-cover h-screen "
          >
            <div className="backdrop-blur-3xl text-black py-5">
              <h1
                className="font-bold text-5xl text-center mb-8 text-white"
                style={{ textShadow: "0 0 5px black" }}
              >
                Random Meal For You
              </h1>
              <div className="bg-white rounded-lg custom-shadow md:grid md:grid-cols-2 grid-cols-1 p-4 lg:w-10/12 w-11/12 mx-auto">
                {randomMeal && (
                  <>
                    <div className="p-4">
                      <img
                        src={randomMeal.strMealThumb}
                        alt={`${randomMeal.strMeal} thumbnail`}
                        className="  w-100% h-315 rounded-lg mb-10"
                      />
                      <h3 className="font-bold text-2xl mb-2">
                        Instructions:{" "}
                      </h3>
                      <p className="mb-4 text-justify">
                        {randomMeal.strInstructions}
                      </p>
                    </div>
                    <div className="p-5">
                      <h2 className={`font-bold text-4xl mb-4 mt-5 italic`}>
                        {randomMeal.strMeal} 🌟
                      </h2>
                      <h3 className=" font-semibold text-xl mb-2">
                        Category Meal is {randomMeal.strCategory}
                      </h3>
                      <h3 className="font-semibold text-xl mb-2">
                        Area in {randomMeal.strArea}
                      </h3>
                      <h3 className="font-bold text-2xl mb-2">
                        Ingredients and measurements:
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (index) => {
                            const ingredient =
                              randomMeal[`strIngredient${index}`];
                            const measure = randomMeal[`strMeasure${index}`];
                            if (ingredient && measure) {
                              return (
                                <li
                                  key={index}
                                  className="mb-1"
                                  style={{
                                    listStyleType: "disc",
                                    color: "black",
                                  }}
                                >
                                  {measure} {ingredient}
                                </li>
                              );
                            }
                            return null;
                          }
                        )}
                      </ul>

                      {randomMeal.strYoutube && (
                        <div className="mt-4">
                          <iframe
                            title="YouTube Video"
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${randomMeal.strYoutube.slice(
                              -11
                            )}`}
                            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
