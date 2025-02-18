"use client";
import Image from "next/image";
import { useUserContext } from "@/utils/contexts";
import { UserContextType, UserType } from "@/utils/types";
import RecipeImg from "../../img/logo2.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex-shrink-0">
        <Image
          src={RecipeImg}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            opacity: "0.8",
          }}
          alt="headerLogo"
        />
      </div>
      <div className="flex-grow text-center text-lg font-bold">
        <h1 className="font-extrabold">My recipe finder</h1>
      </div>
    </header>
  );
};

export default Header;
