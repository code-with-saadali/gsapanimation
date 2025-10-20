import React from "react";


const Example2 = () => {
  return (
    <div className="grid h-screen place-content-center bg-black">
      <BubbleText />
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300">
      {"SAAD ALI".split("").map((child, idx) => (
        <span
          key={idx}
          className="hoverText transition-[font-weight,color] duration-300 ease-in-out"
        >
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Example2;
