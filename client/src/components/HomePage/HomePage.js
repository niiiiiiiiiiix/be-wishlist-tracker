import React from "react";
import HeroSection from "./HeroSection";
import { HomeObjOne, HomeObjTwo } from "./HomeObjData";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-vertical-space">
      <HeroSection {...HomeObjOne} />
      <HeroSection {...HomeObjTwo} />
    </div>
  );
};

export default HomePage;
