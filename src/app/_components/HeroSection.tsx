"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">

      <div className="absolute inset-0 flex justify-around">
        <div className="w-[0.3px] h-full bg-white/20" />
        <div className="w-[0.3px] h-full bg-white/20" />
        <div className="w-[0.3px] h-full bg-white/20" />
        <div className="w-[0.3px] h-full bg-white/20" />
      </div>


      <div className="absolute inset-0 flex flex-col justify-around">
        <div className="h-[0.3px] w-full bg-white/20" />
        <div className="h-[0.3px] w-full bg-white/20" />
        <div className="h-[0.3px] w-full bg-white/20" />
        <div className="h-[0.3px] w-full bg-white/20" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full text-white text-4xl font-semibold">
        <h1>Minimal Grid Hero</h1>
      </div>
    </section>
  );
};

export default HeroSection;
