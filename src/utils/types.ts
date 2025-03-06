export type UserType = {
    name:string,
    category: string,
    savedRecipes: string[]
}

export type UserContextType = {
    user: UserType | null,
    setUser: (user:UserType | null) => void; 
    saveRecipe: (recipe: string) => void;
    removeRecipe: (recipe: string) => void;
}

export type RecipeType = {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
    strArea?: string;
    strInstructions?: string;
    [key: string]: string | null | undefined; 
};

export type CategoryType = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}
