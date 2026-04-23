import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Menu } from ".";
import { SearchBar, SubmitBtn } from "./utils";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { user } = useAuth();

  const handleNav = () => {
    setNav((curr) => !curr);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-20 flex justify-between items-center px-5 py-2">
        <span className="text-white text-2xl font-bold font-inter">ShowIT</span>
        <div className="hidden md:flex w-full items-center justify-between px-5">
          <SearchBar />
          <section className="flex gap-3 items-center justify-center">
            <h2 className="text-white font-bold font-inter">Hello, {user.displayName}!</h2>
            <SubmitBtn />
          </section>
        </div>
        {nav ? (
          <button onClick={handleNav} className="md:hidden z-10 right-0 cursor-pointer">
            <IoCloseSharp size={24} />
          </button>
        ) : (
          <button onClick={handleNav} className="md:hidden flex z-10 right-0 cursor-pointer">
            <GiHamburgerMenu size={24} />
          </button>
        )}
      </nav>
      <Menu nav={nav} />
    </>
  );
};

export default Header;
