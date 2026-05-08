import React, { useState } from "react";
import { FaArrowUp, FaComment } from "react-icons/fa";
import { Pill } from "./utils";
import PostOptionsModal from "./PostOptionsModal";

const TechStackDisplay = ({ techStack }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const displayedStack = techStack.slice(0, 3);
  const remainingStack = techStack.slice(3);
  const hasMore = remainingStack.length > 0;

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleClickOutside = () => {
    setShowTooltip(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center self-start pt-1 relative" onClick={handleClickOutside}>
      {displayedStack.map((stack) => (
        <Pill key={stack} stack={stack} />
      ))}

      {hasMore && (
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer rounded-lg bg-[#323943] px-2 text-amber-50 font-light hover:bg-[#3d474f] transition-colors"
            aria-label={`${remainingStack.length} more technologies: ${remainingStack.join(", ")}`}
            aria-describedby="tech-tooltip"
            title={`${remainingStack.length} more: ${remainingStack.join(", ")}`}
            onClick={handleClick}
          >
            +{remainingStack.length}
          </button>

          {showTooltip && (
            <div
              id="tech-tooltip"
              className="absolute bottom-full left-0 mb-2 bg-[#28303d] text-amber-50 text-sm rounded-lg py-2 px-3 shadow-lg z-50 border border-[#323943]"
              role="tooltip"
            >
              <div className="flex flex-wrap gap-1 max-w-xs">
                {remainingStack.map((stack) => (
                  <span key={stack} className="inline-block rounded-lg bg-[#323943] px-2 text-amber-50 font-light">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ projectTitle, projectUrl, techStack, postId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="w-full max-w-75 flex flex-col p-3 items-center justify-center bg-[#28303d] rounded-2xl relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors text-2xl"
      >
        ⋮
      </button>
      <img className="rounded-2xl" src={`https://s.wordpress.com/mshots/v1/${projectUrl}/?w=800`} alt="Project" />
      <h3 className="font-inter text-amber-50 self-start pt-1 font-normal">{projectTitle}</h3>
      <TechStackDisplay techStack={techStack} />
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

      <PostOptionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} postId={postId} userId={userId} />
    </article>
  );
};

export default ProjectCard;
