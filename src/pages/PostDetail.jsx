import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowUp, FaComment, FaArrowLeft } from "react-icons/fa";
import { useCrud } from "../context/CrudContext";
import { useAuth } from "../context/AuthContext";

import CommentCard from "../components/CommentCard";
import { Pill } from "../components/utils";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, toggleUpvote, checkIfUserLiked } = useCrud();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const post = posts.find((p) => p.id === postId);
  const isUserLiked = post && checkIfUserLiked(postId);

  if (!post) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1b1b1f]">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Post not found</p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaArrowLeft /> Back to Posts
          </button>
        </div>
      </div>
    );
  }

  const handleUpvote = async () => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }
    await toggleUpvote(postId, user.uid);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: `c${Date.now()}`,
        userName: "You",
        userImage: "https://i.pravatar.cc/150?img=0",
        content: commentText,
        timestamp: "just now",
        upvotes: 0,
        replies: [],
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-65px)] bg-[#1b1b1f] overflow-y-auto py-6">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <FaArrowLeft /> Back to Posts
        </button>

        {/* Post Card */}
        <article className="bg-[#28303d] rounded-2xl overflow-hidden mb-8">
          {/* Post Image */}
          <img
            className="w-full h-96 object-cover"
            src={`https://s.wordpress.com/mshots/v1/${post.projectURL}/?w=1200`}
            alt={post.projectTitle}
          />

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-amber-50 mb-3">{post.projectTitle}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#323943]">
              <img
                src={`https://i.pravatar.cc/150?u=${post.userId}`}
                alt={post.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-amber-50 font-medium text-sm">{post.userName}</p>
                <p className="text-gray-500 text-xs">
                  {post.createdAt?.toDate?.()?.toLocaleDateString?.() || "Recently"}
                </p>
              </div>
            </div>

            {/* Brief Description */}
            {post.briefDescription && <p className="text-gray-300 mb-4 leading-relaxed">{post.briefDescription}</p>}

            {/* Tech Stack */}
            {post.techStack && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.techStack.map((tech) => (
                  <Pill key={tech} stack={tech} />
                ))}
              </div>
            )}

            {/* Project Link */}
            <div className="mb-6">
              <a
                href={`${post.projectURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Visit Project →
              </a>
            </div>

            {/* Upvotes and Comments Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#323943]">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  isUserLiked ? "bg-purple-600 text-white" : "bg-[#323943] text-gray-300 hover:bg-[#3d474f]"
                }`}
              >
                <FaArrowUp />
                <span>{post.likeCount || 0} Upvotes</span>
              </button>
              <div className="flex items-center gap-2 text-gray-300">
                <FaComment />
                <span>0 Comments</span>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-[#28303d] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-amber-50 mb-6">Comments</h2>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mb-6 pb-6 border-b border-[#323943]">
            <div className="flex gap-4">
              <img
                src="https://i.pravatar.cc/150?img=0"
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-[#1b1b1f] text-gray-300 placeholder-gray-600 rounded-lg p-3 border border-[#323943] focus:outline-none focus:border-purple-500 resize-none"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
