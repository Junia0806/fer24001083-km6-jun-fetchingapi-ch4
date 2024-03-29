/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";

function MealDetail() {
  const detail = useParams();
  console.log("isi dari id meal  adalah", detail);
  console.log("isi dari id meal.idmeal  adalah", detail.idMeal);
  const [mealDetail, setMealDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealDetail() {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detail.idMeal}`
        );
        console.log("response.data meals", response.data.meals[0]);
        setMealDetail(response.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal detail:", error);
        setLoading(false);
      }
    }
    fetchMealDetail();
  }, [detail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${mealDetail.strMealThumb})`,
      }}
      className="bg-cover h-screen "
    >
      <div className="backdrop-blur-3xl text-black py-5">
        <h1
          className="font-bold text-5xl text-center mb-8 text-white"
          style={{ textShadow: "0 0 5px black" }}
        >
          Detail Meal
        </h1>
        <div className="bg-white rounded-lg custom-shadow md:grid md:grid-cols-2 grid-cols-1 p-4 lg:w-10/12 w-11/12 mx-auto">
          {mealDetail && (
            <>
              <div className="p-4">
                <img
                  src={mealDetail.strMealThumb}
                  alt={`${mealDetail.strMeal} thumbnail`}
                  className="  w-100% h-315 rounded-lg mb-10"
                />
                <h3 className="font-bold text-2xl mb-2">Instructions: </h3>
                {mealDetail.strInstructions ? (
                  <p className="mb-4 text-justify">
                    {mealDetail.strInstructions}
                  </p>
                ) : (
                  <p className="mb-4 text-justify">Make and enjoy</p>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-bold text-4xl mb-4 mt-5 underline italic">
                  {mealDetail.strMeal}
                </h2>
                <h3 className=" font-semibold text-xl mb-2">
                  Category Meal is {mealDetail.strCategory}
                </h3>
                <h3 className="font-semibold text-xl mb-2">
                  Area in {mealDetail.strArea}
                </h3>
                <h3 className="font-bold text-2xl mb-2">
                  Ingredients and measurements:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {/* Menampilkan bahan dan takaran */}
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                    const ingredient = mealDetail[`strIngredient${index}`];
                    const measure = mealDetail[`strMeasure${index}`];
                    if (ingredient && measure) {
                      return (
                        <li
                          key={index}
                          className="mb-1"
                          style={{ listStyleType: "disc", color: "black" }}
                        >
                          {measure} {ingredient}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>

                {/* Menampilkan video YouTube */}
                {mealDetail.strYoutube ? (
                  <div className="mt-4">
                    <iframe
                      title="YouTube Video"
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${mealDetail.strYoutube.slice(
                        -11
                      )}`}
                      allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                ) : (
                  <div className="mt-4">
                    <iframe
                      title="Default YouTube Video"
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/44x8s3_kWU4?si=O-w3vONu1BN_cjnd"
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
  );
}

export default MealDetail;
