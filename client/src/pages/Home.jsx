import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";

function Home() {
  return (
    <div className="text-white">
      <Navbar />
      <Hero />
      <CategorySection />
    </div>
  );
}

export default Home;
