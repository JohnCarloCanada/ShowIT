import React from "react";
import { FaArrowUp, FaComment } from "react-icons/fa";
import { Pill } from "./utils";

const ProjectCard = () => {
  return (
    <article className="w-full max-w-75 flex flex-col p-3 items-center justify-center bg-[#28303d] rounded-2xl">
      <img
        className="rounded-2xl"
        src={`https://s.wordpress.com/mshots/v1/https://jccan.netlify.app/?w=800`}
        alt="Project"
      />
      <h3 className="font-inter text-amber-50 self-start pt-1 font-normal">The Grid Explorer</h3>
      <div className="flex gap-2 items-center justify-center self-start pt-1">
        <Pill />
      </div>
      <div className="w-full flex items-center justify-between pt-3">
        <button className="cursor-pointer flex items-center gap-2 px-4  rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 active:bg-purple-800 transition-colors">
          <FaArrowUp />
          <p>245</p>
        </button>
        <button className="cursor-pointer flex items-center gap-2 text-gray-400">
          <FaComment />
          <p>15</p>
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
