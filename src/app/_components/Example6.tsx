"use client";
import React, { useRef, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import Image from "next/image";

export const Example6: React.FC = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8">
      <div>
        <LinkBox
          heading="About"
          subheading="Learn what we do here"
          imgSrc="https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp?updatedAt=1754392735269"
          href="#"
        />
        <LinkBox
          heading="Clients"
          subheading="We work with great people"
          imgSrc="https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp?updatedAt=1754392735269"
          href="#"
        />
        <LinkBox
          heading="Portfolio"
          subheading="Our work speaks for itself"
          imgSrc="https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp?updatedAt=1754392735269"
          href="#"
        />
        <LinkBox
          heading="Careers"
          subheading="We want cool people"
          imgSrc="https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp?updatedAt=1754392735269"
          href="#"
        />
        <LinkBox
          heading="Fun"
          subheading="Incase you're bored"
          imgSrc="https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp?updatedAt=1754392735269"
          href="#"
        />
      </div>
    </section>
  );
};

interface LinkBoxProps {
  heading: string;
  subheading: string;
  imgSrc: string;
  href: string;
}

const LinkBox: React.FC<LinkBoxProps> = ({ heading, imgSrc, subheading, href }) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const link = linkRef.current;
    const img = imgRef.current;
    const arrow = arrowRef.current;
    const letters = lettersRef.current;

    // ✅ Stop if any ref is missing
    if (!link || !img || !arrow) return;

    const handleEnter = () => {
      gsap.to(letters, {
        x: 16,
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.4,
      });

      gsap.to(arrow, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        img,
        { scale: 0, rotate: -12.5, opacity: 0 },
        { scale: 1, rotate: 12.5, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    };

    const handleLeave = () => {
      gsap.to(letters, { x: 0, stagger: 0.05, ease: "power3.inOut" });
      gsap.to(arrow, { x: "25%", opacity: 0, duration: 0.3 });
      gsap.to(img, { scale: 0, rotate: -12.5, opacity: 0, duration: 0.4 });
    };

    const handleMove = (e: MouseEvent) => {
      if (!link || !img) return;
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(img, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    link.addEventListener("mouseenter", handleEnter);
    link.addEventListener("mouseleave", handleLeave);
    link.addEventListener("mousemove", handleMove);

    return () => {
      link.removeEventListener("mouseenter", handleEnter);
      link.removeEventListener("mouseleave", handleLeave);
      link.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 md:py-8 cursor-pointer"
    >
      <div>
        <span className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl">
          {heading.split("").map((l, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className="inline-block"
            >
              {l}
            </span>
          ))}
        </span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <Image
        ref={imgRef}
        src={imgSrc}
        width={500}
        height={500}
        alt={`Image for ${heading}`}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 pointer-events-none"
        style={{
          top: "50%",
          left: "65%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />

      <div
        ref={arrowRef}
        className="relative z-10 p-4"
        style={{ transform: "translateX(25%)", opacity: 0 }}
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </div>
    </a>
  );
};
