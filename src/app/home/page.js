import React from "react";
import  Navbar  from "../../components/NavBar/Navbar";
import LandingSection from "@/components/HomeLandingSection/LandingSection";

const HomePage = () => {
  return (
    <>
     <div className='bg-[url("/homePageImages/banner_bg.png")] bg-cover bg-center h-screen w-full'>
      <Navbar />
      <LandingSection />
      </div>
    </>
  );
};

export default HomePage;
