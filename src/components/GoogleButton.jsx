import React, { useEffect } from "react";
import googleIcon from "../assets/google-icon.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const { googleSignin, user, createUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignin = async () => {
    try {
      await googleSignin();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <button
      onClick={handleGoogleSignin}
      className="cursor-pointer flex items-center justify-center bg-white border border-gray-300 rounded-lg px-6 py-3 gap-3 hover:bg-gray-50 transition font-inter text-base font-medium text-gray-700"
    >
      <img className="w-5 h-5" src={googleIcon} alt="Google Icon" />
      <p>Sign in with Google</p>
    </button>
  );
};

export default GoogleButton;
