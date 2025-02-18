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
    map(arg0: (meal: RecipeType) => import("react").JSX.Element): import("react").ReactNode
    strMeal: string,
    idMeal: string,
    strMealThumb: string,
    strArea?: string,
    strInstructions?: string,
    [key: string]: string | null
}

export type CategoryType = {
    map(arg0: (category: CategoryType) => import("react").JSX.Element): import("react").ReactNode
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}