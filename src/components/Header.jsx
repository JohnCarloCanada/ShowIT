import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Menu } from ".";
import { SearchBar, SubmitBtn } from "./utils";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menu, setMenu] = useState(true);
  const { user } = useAuth();
  return (
    <>
      <nav className="fixed top-0 w-full  flex justify-between items-center px-5 py-2">
        <span className="text-white text-2xl font-bold font-inter">ShowIT</span>
        <div className="hidden md:flex w-full items-center justify-between px-5">
          <SearchBar />
          <section className="flex gap-3 items-center justify-center">
            <h2 className="text-white font-bold font-inter">Hello, {user?.displayName}!</h2>
            <SubmitBtn />
          </section>
        </div>
        {menu ? (
          <div className="md:hidden">
            <GiHamburgerMenu />
          </div>
        ) : (
          <div className="md:hidden">
            <IoCloseSharp />
          </div>
        )}
      </nav>
      <Menu />
    </>
  );
};

export default Header;
