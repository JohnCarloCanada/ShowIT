import React, { use } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProjectCard, SubmitModalCard } from "../components";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
        <ProjectCard />
      </section>
      <SubmitModalCard />
    </>
  );
};

export default Home;
