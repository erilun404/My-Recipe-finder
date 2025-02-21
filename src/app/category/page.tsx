"use client";
import LogIn from "@/components/Login";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { UserType } from "@/utils/types";
import { createConnection } from "net";
import { RecipeType } from "@/utils/types";
import { CategoryType } from "@/utils/types";
import Link from "next/link";

const category = () => {
  const { user } = useUserContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/categories.php`
          );
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h2 className="font-bold text-center p-5">Category page</h2>
        <p>Your favorite category: {user?.category}</p>
        <div className="flex flex-wrap gap-6 justify-center mt-10 ">
          {categories.length > 0 ? (
            categories.map((category: CategoryType) => (
              <div
                className="w-80 bg-[#fbc4c6] rounded-md shadow-md py-5"
                key={category.idCategory}
              >
                {" "}
                {/* Add a unique key */}
                <Link href={`/category/${category.strCategory}`}>
                  <div className="flex flex-col items-center">
                    <img
                      src={category.strCategoryThumb}
                      height="auto"
                      width="200px"
                    />
                    <p>{category.strCategory}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </>
  );
};
export default category;