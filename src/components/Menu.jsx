import React, { useState } from "react";

import { SearchBar, SubmitBtn } from "./utils";

const Menu = ({ nav }) => {
  return (
    <section
      className={
        nav
          ? "fixed overflow-hidden w-[50%] h-[50%] right-0 bg-[#3a3a3c] flex items-center justify-between flex-col py-10 px-4 gap-4 md:hidden duration-300 ease-out"
          : "fixed overflow-hidden w-[50%] h-[0%] right-0 bg-[#3a3a3c] flex items-center justify-between flex-col gap-4 md:hidden duration-300 ease-out"
      }
    >
      <SearchBar />
      <section className="flex-1 flex items-center flex-col justify-center gap-2">
        <h2 className="text-white font-bold font-inter">Hello, John!</h2>
        <SubmitBtn />
      </section>
    </section>
  );
};

export default Menu;
