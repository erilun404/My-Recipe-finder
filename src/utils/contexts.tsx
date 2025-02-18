"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContextType, UserType } from "./types";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const saveRecipe = (recipe: string) => {
    if (user) {
      setUser({
        ...user,
        savedRecipes: [...user.savedRecipes, recipe],
      });
    }
  };

  const removeRecipe = (recipe: string) => {
    if (user) {
      const updatedSavedRecipes = user.savedRecipes.filter(
        (savedRecipe) => savedRecipe !== recipe
      );
      setUser({
        ...user,
        savedRecipes: updatedSavedRecipes,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, saveRecipe, removeRecipe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
  //return useContext(UserContext)
};
