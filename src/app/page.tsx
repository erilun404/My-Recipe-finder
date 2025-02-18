"use client";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { RecipeType } from "@/utils/types";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext();
  const [recipes, setRecipes] = useState<RecipeType | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`
          );
          const data = await response.json();

          const topFiveRecipes = data.meals.slice(0, 5);
          setRecipes(topFiveRecipes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      {user && (
        <div className="flex flex-col items-center">
          <h2 className="font-bold p-5">Welcome {user.name}</h2>
          <h2>Your favorite category of food is {user.category}</h2>

          <div className="flex flex-wrap gap-6 justify-center mt-10 ">
            {recipes &&
              recipes.map((meal: RecipeType) => (
                <div
                  className="w-80 bg-[#fbc4c6] rounded-md shadow-md py-5"
                  key={meal.idMeal}
                >
                  <Link href={`/recipe/${meal.idMeal}`}>
                    <div className="flex flex-col items-center">
                      <img
                        src={meal.strMealThumb}
                        height="auto"
                        width="200px"
                      />
                      {meal.strMeal}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
