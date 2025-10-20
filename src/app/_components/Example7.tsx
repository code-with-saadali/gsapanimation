'use client'
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

gsap.registerPlugin(Draggable);

export const Example7 = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
        ASTRO<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    let highestZ = 10;

    cards.forEach((card) => {
      if (!card) return;

      Draggable.create(card, {
        bounds: container!,
        inertia: false,
        onPress() {
          highestZ++;
          gsap.set(card, { zIndex: highestZ });
        },
        onDrag() {
          gsap.to(card, { scale: 1.05, duration: 0.2, ease: "power2.out" });
        },
        onRelease() {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        },
      });
    });
  }, []);

  const cardData = [
    {
      src: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop",
      top: "20%",
      left: "25%",
      rotate: "6deg",
      className: "w-36 md:w-56",
    },
    {
      src: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop",
      top: "45%",
      left: "60%",
      rotate: "12deg",
      className: "w-24 md:w-48",
    },
    {
      src: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop",
      top: "20%",
      left: "40%",
      rotate: "-6deg",
      className: "w-52 md:w-80",
    },
    {
      src: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop",
      top: "50%",
      left: "40%",
      rotate: "8deg",
      className: "w-48 md:w-72",
    },
    {
      src: "https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop",
      top: "20%",
      left: "65%",
      rotate: "18deg",
      className: "w-40 md:w-64",
    },
    {
      src: "https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop",
      top: "35%",
      left: "55%",
      rotate: "-3deg",
      className: "w-24 md:w-48",
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 z-10">
      {cardData.map((card, i) => (
        <Image
          key={i}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          src={card.src}
          alt="card"
          width={500}
          height={500}
          className={`absolute bg-neutral-200 p-1 pb-4 ${card.className}`}
          style={{
            top: card.top,
            left: card.left,
            rotate: card.rotate,
            cursor: "grab",
          }}
        />
      ))}
    </div>
  );
};