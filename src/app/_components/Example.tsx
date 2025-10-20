"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Example = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll(".card");

    const totalWidth = (sections.length * 490) - window.innerWidth; 

    gsap.to(sections, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: `+=${totalWidth}`, 
      },
    });
  }, []);

  return (
    <section className="relative h-[100vh] bg-neutral-900" ref={containerRef}>
      <div className="flex h-screen items-center gap-4 px-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card relative h-[450px] w-[450px] flex-shrink-0 overflow-hidden bg-neutral-200"
          >
            <div
              style={{
                backgroundImage: `url(${card.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 z-0 transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 z-10 grid place-content-center">
              <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Example;

const cards = [
  { url: "https://ik.imagekit.io/msmrd69gi/nchbh9ejz77mm0k9yyb3qi2gwds4v8i7.webp", title: "Title 1", id: 1 },
  { url: "https://ik.imagekit.io/msmrd69gi/ej7a7rpmqjtwwu7a0ovzcxqhcxg2j7r1.webp", title: "Title 2", id: 2 },
  { url: "https://ik.imagekit.io/msmrd69gi/xar3q5hp70iq5ugy5icvpoeh3yxm64hd.webp", title: "Title 3", id: 3 },
  { url: "https://ik.imagekit.io/msmrd69gi/uc8mvtzasxl4wt4x3lo830e9hp6iq34c.webp", title: "Title 4", id: 4 },
  { url: "https://ik.imagekit.io/msmrd69gi/rduao1hfutdct9q998ro6fbhjdgiz9co.webp", title: "Title 5", id: 5 },
  { url: "https://ik.imagekit.io/msmrd69gi/ia5dckhuxz6gs033g4bnfcb70rdsdere.webp", title: "Title 6", id: 6 },
  { url: "https://ik.imagekit.io/msmrd69gi/g9llsn23se4dw8smxmb9x6htnsyii1hr.webp", title: "Title 7", id: 7 },
];
