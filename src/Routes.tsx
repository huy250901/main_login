import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./modules/auth/Login";
import Home from "./modules/Pages/Home";
import SignUp from "./modules/auth/signup/SignUp";
import DetailPage from "./modules/Pages/DetailPage";
const Routess = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/profile" element={<DetailPage />} />
      </Routes>
    </>
  );
};

export default Routess;
