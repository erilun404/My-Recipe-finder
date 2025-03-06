"use client";
import { SetStateAction, useState } from "react";
import { registeredUsers } from "@/utils/users";
import { UserContextType, UserType } from "@/utils/types";
import { useUserContext } from "@/utils/contexts";

const LogIn = () => {
  const [userInput, setUserInput] = useState<string | null>(null);
  const { user, setUser } = useUserContext() as UserContextType;

  const handleChange = (e: {
    target: { value: SetStateAction<string | null> };
  }) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    const loggedInUser: UserType[] = registeredUsers.filter(
      (user: UserType) => user.name === userInput
    );
    if (loggedInUser) {
      console.log(localStorage.getItem(loggedInUser[0].name));
      const userFrom = localStorage.getItem(loggedInUser[0].name);
      if (userFrom) {
        setUser(JSON.parse(userFrom));
      } else {
        setUser(loggedInUser[0]);
      }
    }
  };
  console.log("Try my app, log in as: John, Jimmy or Ringo");
  return (
    <div className="flex justify-center items-center w-[350] min-h-[80hv] pt-20">
      <div className="flex justify-center flex-col items-center shadow-[#fbcad1] border-2 border-[#fbcad1] w-80 bg-[#fbc4cc] rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          To log in please use your user name
        </h2>
        <label className="text-sm font-medium" htmlFor="user-input">
          Enter user name
        </label>

        <input
          className="max-w-[200px] border-[1px] rounded-sm border-black p-1"
          id="user-input"
          onChange={handleChange}
          placeholder="User name"
        ></input>

        <div className="flex flex-col pb-1 justify-center items-center">
          <button
            className="bg-[#fccf4f] px-8 py-1 m-1 w-full rounded-sm"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
