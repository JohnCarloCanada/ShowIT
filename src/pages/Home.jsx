import React, { use } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../context/CrudContext";

const Home = () => {
  const { user, logout } = useAuth();
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
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-white text-2xl">Hello, {user?.displayName}!</div>
        <button onClick={handleLogout} className="cursor-pointer border-2  px-2 text-amber-50 border-amber-50">
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
