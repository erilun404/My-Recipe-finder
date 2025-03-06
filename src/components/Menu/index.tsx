"use client";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import Link from "next/link";

const Menu = () => {
  const { user, setUser } =
    useUserContext() as UserContextType;
  return (
    <>
      <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline transition duration-200">
            Home
          </Link>
          <Link
            href="/profile"
            className="hover:underline transition duration-200"
          >
            Profile
          </Link>
          <Link
            href="/category"
            className="hover:underline transition duration-200"
          >
            Category
          </Link>
        </div>
        {user ? (
          <button
            onClick={() => setUser(null)}
            className="bg-[#fccf4f] hover:bg-[#fcbe4f] text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        ) : null}
      </nav>
    </>
  );
};

export default Menu;
