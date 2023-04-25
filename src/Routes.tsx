import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./modules/auth/Login";
import Home from "./modules/Pages/Home";
import SignUp from "./modules/auth/signup/SignUp";
import Detail from "./modules/Pages/Detail/Details";
import Profile from "./modules/Pages/Profile";
const Routess = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </>
  );
};

export default Routess;
