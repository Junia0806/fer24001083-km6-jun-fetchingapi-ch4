import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Meal from "./Page/ListCategory";
import MealList from "./Page/ListMeal";
import RecipeSearch from "./Page/SearchMeal";
import MealDetail from "./Page/DetailMeal";
import HomeRecipe from "./Page/MealHome";
import Area from "./Page/ListArea";
import App from "./Page/RandomMeal";


//mengisiasi object router 
const router = createBrowserRouter([
  {
    path: "/", //menentukan url
    element: <HomeRecipe/>, //komponen yang akan ditampilkan
  },
  {
    path: "/meal",
    element: <Meal/>,
  },
  {
    path: "/category/:category",
    element: <MealList/>,
  },
  {
    path: "/detail/:idMeal",
    element: <MealDetail/>,
  },
  {
    path: "/search",
    element: <RecipeSearch/>,
  },
  {
    path: "/area",
    element: <Area/>,
  },
  {
    path: "/random",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
