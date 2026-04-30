import React from "react";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={() => handleLogout()}
      className="bg-red-700 rounded-[5px] px-2 py-1 cursor-pointer text-amber-50 font-bold hover:bg-red-600 active:bg-red-600 transition-colors"
      aria-label="Logout button"
    >
      Logout
    </button>
  );
};

export default Logout;
