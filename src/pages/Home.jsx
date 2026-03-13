import React , {useEffect} from "react";
import Navbar from "../components/Navbar";
import PostDisplay from "../components/PostDisplay";
import Sidebar from "../components/Sidebar";

const Home = () => {

   useEffect(() => {
    document.title = "Echozy – Social Media Platform";
  }, []);
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <PostDisplay />
    </>
  );
};

export default Home;
