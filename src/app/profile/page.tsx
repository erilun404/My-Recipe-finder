"use client";

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import Link from "next/link";

const profile = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const { user } =
    useUserContext() as UserContextType;
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user?.savedRecipes.length) {
        try {
          const fetchedRecipes = await Promise.all(
            user.savedRecipes.map(async (recipeId) => {
              const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
              );
              const data = await response.json();
              return data.meals[0];
            })
          );
          setFavoriteRecipes(fetchedRecipes);
        } catch (error) {
          console.error("Error", error);
        }
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <>
      <div className="flex flex-col p-7">
        <h2 className="text-center font-bold">Profile page</h2>
        <div className="bg-[#feedf0] w-fit h-fit p-5 rounded-md shadow-md-pink">
          <p>Name: {user?.name}</p>
          <p>Your favorite category: {user?.category}</p>
          <p>These are your favorite recipes </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {favoriteRecipes &&
            favoriteRecipes.map((item, index) => (
              <div
                className="w-80 bg-[#fbc4c6] rounded-md shadow-md py-5"
                key={index}
              >
                <Link href={`/recipe/${item.idMeal}`}>
                  <div className="flex flex-col items-center">
                    <img
                      className="rounded-lg"
                      height="auto"
                      width="200"
                      src={item.strMealThumb}
                    ></img>
                    <p className="pt-2">{item.strMeal}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default profile;
