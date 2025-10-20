"use client";
import React, { useRef } from "react";
import {
  SiAdobe,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
} from "react-icons/si";
import gsap from "gsap";

export const Example5: React.FC = () => {
  return (
    <div className="bg-neutral-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks: React.FC = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <div className="grid grid-cols-2 divide-x divide-neutral-900">
        <LinkBox Icon={SiGoogle} href="#" />
        <LinkBox Icon={SiShopify} href="#" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-neutral-900">
        <LinkBox Icon={SiApple} href="#" />
        <LinkBox Icon={SiSoundcloud} href="#" />
        <LinkBox Icon={SiAdobe} href="#" />
        <LinkBox Icon={SiFacebook} href="#" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-neutral-900">
        <LinkBox Icon={SiTiktok} href="#" />
        <LinkBox Icon={SiSpotify} href="#" />
        <LinkBox Icon={SiLinkedin} href="#" />
      </div>
    </div>
  );
};

// ---------- Animation Setup ----------
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: Record<string, [string, string]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<string, [string, string]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

// ---------- LinkBox Component ----------
interface LinkBoxProps {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const LinkBox: React.FC<LinkBoxProps> = ({ Icon, href }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const distances = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" },
      { proximity: Math.abs(box.right - e.clientX), side: "right" },
      { proximity: Math.abs(box.top - e.clientY), side: "top" },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" },
    ];
    return distances.sort((a, b) => a.proximity - b.proximity)[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const side = getNearestSide(e);
    gsap.fromTo(
      overlayRef.current,
      { clipPath: ENTRANCE_KEYFRAMES[side][0] },
      {
        clipPath: ENTRANCE_KEYFRAMES[side][1],
        duration: 0.4,
        ease: "power3.out",
      }
    );
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const side = getNearestSide(e);
    gsap.to(overlayRef.current, {
      clipPath: EXIT_KEYFRAMES[side][1],
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />

      <div
        ref={overlayRef}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};
