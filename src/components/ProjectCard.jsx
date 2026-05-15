import React, { useState } from "react";
import { FaArrowUp, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../context/CrudContext";
import { useAuth } from "../context/AuthContext";
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

const ProjectCard = ({ projectTitle, projectUrl, techStack, postId, userId, likeCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toggleUpvote, checkIfUserLiked } = useCrud();
  const { user } = useAuth();

  const isUserLiked = checkIfUserLiked(postId);

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/post/${postId}`);
  };

  const handleUpvote = async (e) => {
    e.stopPropagation();
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }
    await toggleUpvote(postId, user.uid);
  };

  return (
    <article
      onClick={handleCardClick}
      className="w-full max-w-75 flex flex-col p-3 items-center justify-center bg-[#28303d] rounded-2xl relative cursor-pointer hover:bg-[#323943] transition-colors"
    >
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors text-2xl z-10"
      >
        ⋮
      </button>
      <img className="rounded-2xl" src={`https://s.wordpress.com/mshots/v1/${projectUrl}/?w=800`} alt="Project" />
      <h3 className="font-inter text-amber-50 self-start pt-1 font-normal">{projectTitle}</h3>
      <TechStackDisplay techStack={techStack} />
      <div className="w-full flex items-center justify-between pt-3">
        <button
          onClick={handleUpvote}
          className={`cursor-pointer flex items-center gap-2 px-4 rounded-full font-medium transition-colors ${
            isUserLiked ? "bg-purple-600 text-white" : "bg-[#323943] text-gray-300 hover:bg-[#3d474f]"
          }`}
        >
          <FaArrowUp />
          <p>{likeCount || 0}</p>
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
