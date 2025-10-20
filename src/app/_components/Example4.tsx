"use client";
import React from "react";

interface CutoutTextLoaderProps {
  height: string;
  background: string;
  imgUrl: string;
}

const Example4 = () => {
  return (
    <div>
      <CutoutTextLoader
        height="450px"
        background="white"
        imgUrl="https://ik.imagekit.io/msmrd69gi/nchbh9ejz77mm0k9yyb3qi2gwds4v8i7.webp?updatedAt=1754396964126"
      />
    </div>
  );
};

const CutoutTextLoader: React.FC<CutoutTextLoaderProps> = ({
  height,
  background,
  imgUrl,
}) => {
  return (
    <div className="relative" style={{ height }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div
        style={{ background }}
        className="absolute inset-0 z-10 animate-pulse"
      />

      <span
        className="absolute inset-0 z-20 text-center font-black bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default Example4;
