// 'use client'
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { FiArrowUpRight } from "react-icons/fi";

// export const Example9 = () => {
//   return (
//     <div className="bg-white">
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Collaborate"
//         heading="Built for all of us."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Quality"
//         heading="Never compromise."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Modern"
//         heading="Dress for the best."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//     </div>
//   );
// };

// const IMG_PADDING = 12;

// const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
//   return (
//     <div
//       style={{
//         paddingLeft: IMG_PADDING,
//         paddingRight: IMG_PADDING,
//       }}
//     >
//       <div className="relative h-[150vh]">
//         <StickyImage imgUrl={imgUrl} />
//         <OverlayCopy heading={heading} subheading={subheading} />
//       </div>
//       {children}
//     </div>
//   );
// };

// const StickyImage = ({ imgUrl }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["end end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   return (
//     <motion.div
//       style={{
//         backgroundImage: `url(${imgUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
//         top: IMG_PADDING,
//         scale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0 bg-neutral-950/70"
//         style={{
//           opacity,
//         }}
//       />
//     </motion.div>
//   );
// };

// const OverlayCopy = ({ subheading, heading }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
//         {subheading}
//       </p>
//       <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
//     </motion.div>
//   );
// };

// const ExampleContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
//       Additional content explaining the above card here
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
//         blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
//         maiores voluptate est ut saepe accusantium maxime doloremque nulla
//         consectetur possimus.
//       </p>
//       <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
//         reiciendis blanditiis aliquam aut fugit sint.
//       </p>
//       <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
//         Learn more <FiArrowUpRight className="inline" />
//       </button>
//     </div>
//   </div>
// );





"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export const Example9 = () => {
  return (
    <div className="bg-white">
      <TextParallaxContentGSAP
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent />
      </TextParallaxContentGSAP>

      <TextParallaxContentGSAP
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContentGSAP>

      <TextParallaxContentGSAP
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent />
      </TextParallaxContentGSAP>
    </div>
  );
};

const IMG_PADDING = 12;

interface TextParallaxContentGSAPProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}

const TextParallaxContentGSAP = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentGSAPProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      // Image scale + fade on scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.85,
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Overlay text parallax
      gsap.fromTo(
        overlayRef.current,
        { y: 250, opacity: 0 },
        {
          y: -250,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
    >
      <div className="relative h-[150vh]">
        {/* Sticky Image */}
        <div
          ref={imageRef}
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: `calc(100vh - ${IMG_PADDING * 2}px)`,
            top: IMG_PADDING,
          }}
          className="sticky z-0 overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>

        {/* Overlay Text */}
        <div
          ref={overlayRef}
          className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
          <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
            {subheading}
          </p>
          <p className="text-center text-4xl font-bold md:text-7xl">
            {heading}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
        maiores voluptate est ut saepe accusantium maxime doloremque nulla
        consectetur possimus.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
