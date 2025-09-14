import React from "react";
import Navbar from "../components/Navbar";
import PostDisplay from "../components/PostDisplay";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <PostDisplay />
    </>
  );
};

export default Home;
