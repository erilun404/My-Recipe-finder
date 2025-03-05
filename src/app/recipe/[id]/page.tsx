"use client";

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import React from "react";
import { FaHeart } from "react-icons/fa";

const recipePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const { user, saveRecipe, removeRecipe } = useUserContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (id) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await response.json();
          console.log(data);
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [id]);

  const handleSaveRecipe = () => {
    if (user) {
      if (recipe && !user.savedRecipes.includes(recipe.idMeal)) {
        saveRecipe(recipe.idMeal);
      } else {
        console.log(
          recipe?.idMeal +
            " finns redan, här är hela listan på users recept: " +
            user.savedRecipes
        );
      }
    }
  };

  const handleRemoveRecipe = () => {
    if (user) {
      if (recipe && user.savedRecipes.includes(recipe.idMeal)) {
        removeRecipe(recipe.idMeal);
      } else {
        console.log(
          recipe?.idMeal +
            " finns redan, här är hela listan på users recept: " +
            user.savedRecipes
        );
      }
    }
  };

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient,
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  useEffect(() => {
    console.log(localStorage);
    console.log("update saved recipes:", user?.savedRecipes);
    console.log(
      "värdet i user, name:" + user?.name + "category:" + user?.category
    );
    user && localStorage.setItem(user.name, JSON.stringify(user));
  }, [user?.savedRecipes]);

  if (!recipe) {
    return (
      <p>Loading recipe</p>
    )
  }

  return (
    <div className="flex flex-col bg-[#fbc4c6] rounded-md shadow-md py-5 md:max-w-2xl mx-auto mt-10">
      <h2 className="flex items-center justify-center">Recipe page</h2>

      {recipe && (
        <div className="p-10">
          <div className="flex justify-center flex-col items-center">
            <img
              className="rounded-lg"
              height="auto"
              width="200"
              src={recipe.strMealThumb}
            ></img>
            <h2 className="font-bold">{recipe.strMeal}</h2>
          </div>

          {user?.savedRecipes.includes(recipe.idMeal) ? (
            <button onClick={handleRemoveRecipe}>
              <FaHeart className="text-red-700 text-2xl" />
            </button>
          ) : (
            <button onClick={handleSaveRecipe}>
              <FaHeart className=" text-gray-900 text-2xl" />
            </button>
          )}

          <h2>Ingredients:</h2>
          <ul className="list-disc">
            {getIngredients().map((item, index) => (
              <li key={index} className="font-medium">
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
          <div className="mt-5 ">
            <h2>Instructions:</h2>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default recipePage;
