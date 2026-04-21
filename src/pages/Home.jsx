import React, { use } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      <section className="h-screen flex flex-col items-center justify-center gap-2 text-amber-50 font-bold">
        Home
      </section>
    </>
  );
};

export default Home;
