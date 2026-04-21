import React, { useState } from "react";

import { SearchBar, SubmitBtn } from "./utils";

const Menu = () => {
  return (
    <section className="absolute w-[50%] h-screen right-0 bg-[#3a3a3c] flex items-center justify-between flex-col py-10 gap-4 md:hidden">
      <SearchBar />
      <section className="flex-1 flex items-center flex-col justify-center gap-2">
        <h2 className="text-white font-bold font-inter">Hello, John!</h2>
        <SubmitBtn />
      </section>
    </section>
  );
};

export default Menu;
