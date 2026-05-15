import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const CommentCard = ({ comment }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  return (
    <div className="w-full border-l-2 border-[#323943] pl-4 py-3">
      <div className="flex items-start gap-3">
        <img
          src={comment.userImage}
          alt={comment.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-50 text-sm">{comment.userName}</span>
            <span className="text-gray-500 text-xs">{comment.timestamp}</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isUpvoted
                  ? "text-purple-500 font-semibold"
                  : "text-gray-500 hover:text-purple-400"
              }`}
            >
              <FaArrowUp size={12} />
              <span>{upvoteCount}</span>
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
