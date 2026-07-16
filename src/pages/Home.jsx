import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProjectCard, SubmitModalCard } from "../components";
import { useCrud } from "../context/CrudContext";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { loading, visiblePosts, isFetchingMore, hasMorePosts } = useCrud();

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="w-full max-w-75 flex flex-col p-3 items-center justify-center bg-[#242932] rounded-2xl animate-pulse"
    >
      <div className="w-full h-40 rounded-2xl bg-[#1f252d]" />
      <div className="w-3/4 h-5 mt-4 rounded-full bg-[#1f252d]" />
      <div className="w-full h-3 mt-3 rounded-full bg-[#1f252d]" />
      <div className="w-full h-3 mt-2 rounded-full bg-[#1f252d]" />
      <div className="w-full h-9 mt-6 rounded-full bg-[#1f252d]" />
    </div>
  ));

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="w-full bg-[#1b1b1f] overflow-y-auto grid gap-1 min-h-[calc(100vh-65px)] grid-cols-1 sm:grid-cols-3 md:grid-cols-5 grid-rows-3 justify-items-center pt-2 px-5">
        {loading
          ? skeletonCards
          : visiblePosts.map((post) => {
              return (
                <ProjectCard
                  key={post.id}
                  projectTitle={post.projectTitle}
                  projectUrl={post.projectURL}
                  techStack={post.techStack}
                  postId={post.id}
                  userId={post.userId}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                />
              );
            })}
      </section>
      {isFetchingMore && (
        <div className="w-full flex justify-center py-4  bg-[#1b1b1f]">
          <div className="h-12 w-12 rounded-full border-4 border-t-amber-400 border-gray-700 animate-spin" />
        </div>
      )}
      {!loading && !hasMorePosts && visiblePosts.length > 0 && (
        <div className="w-full text-center text-gray-400 bg-[#1b1b1f] py-4">No more posts</div>
      )}
      <SubmitModalCard />
    </>
  );
};

export default Home;
