"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useUserContext } from "@/utils/contexts";
import { CategoryType } from "@/utils/types";

const category = () => {
  const { user, setUser } = useUserContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const handleClick = (userSelectedCategory: string) => {
    if (user && setUser) {
      setUser({ ...user, category: userSelectedCategory });
    }
  };

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
      <div className="flex flex-col p-7">
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
                <div className="flex justify-center">
                  <button
                    className="bg-[#fccf4f] px-20 py-1 m-1 rounded-sm"
                    onClick={() => handleClick(category.strCategory)}
                  >
                    Save as category
                  </button>
                </div>
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
