import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={handleClick}>Profile</button>
    </div>
  );
};

export default Home;
