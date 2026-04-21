import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative">
      <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search projects..."
        className="w-full bg-[#2a2a2c] border border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-gray-500"
      />
    </div>
  );
};

export default Searchbar;
