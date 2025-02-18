"use client";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const categoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user, saveRecipe, removeRecipe } = useUserContext();
  const [recipes, setRecipes] = useState<RecipeType | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (id) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
          );
          const data = await response.json();
          setRecipes(data.meals);
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
        <div className="">
          <p>Your favorite category is {user.category}</p>

          <div className="flex flex-wrap gap-6 justify-center mt-10">
            {recipes &&
              recipes.map((meal: RecipeType) => (
                <div
                  className="w-80 bg-[#fbc4c6] rounded-md shadow-md py-5"
                  key={meal.idMeal}
                >
                  <Link href={`/recipe/${meal.idMeal}`}>
                    <div className="flex flex-col items-center">
                      <img
                        className="rounded-lg"
                        src={meal.strMealThumb}
                        height="auto"
                        width="200px"
                      />
                      <p className="pt-2">{meal.strMeal}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default categoryPage;
