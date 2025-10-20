"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const cards = [
  {
    title: "Marrakech Merzouga",
    desc: "Explore the vast golden dunes and experience camel rides in the Moroccan Sahara desert.",
    image:
      "https://ik.imagekit.io/msmrd69gi/ej7a7rpmqjtwwu7a0ovzcxqhcxg2j7r1.webp?updatedAt=1754396963971",
  },
  {
    title: "Yosemite National",
    desc: "Majestic cliffs, giant sequoias, and endless hiking adventures in California's wilderness.",
    image:
      "https://ik.imagekit.io/msmrd69gi/nchbh9ejz77mm0k9yyb3qi2gwds4v8i7.webp?updatedAt=1754396964126",
  },
  {
    title: "Los Lances Beach",
    desc: "A paradise for kitesurfing and beach lovers, located in sunny Tarifa, Spain.",
    image:
      "https://ik.imagekit.io/msmrd69gi/rv7lfanov5rouyyuc7fumitcunzjyb1l.webp?updatedAt=1754392734745",
  },
  {
    title: "Göreme Valley",
    desc: "Famous for hot air balloon rides and unique rock formations in Cappadocia, Turkey.",
    image:
      "https://ik.imagekit.io/msmrd69gi/rduao1hfutdct9q998ro6fbhjdgiz9co.webp?updatedAt=1754392734281",
  },
];

export default function Slider() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const textRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const animateTextAndSide = () => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 }
    );
  };

  const changeSlide = (targetIndex: number, sourceElement?: HTMLElement | null) => {
    if (isAnimating || !bgRef.current) return;
    if (targetIndex === active) return;

    setIsAnimating(true);
    const bgEl = bgRef.current;
    const destRect = bgEl.getBoundingClientRect();

    const temp = document.createElement("div");
    Object.assign(temp.style, {
      position: "absolute",
      overflow: "hidden",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "inset 0 0 40px rgba(0,0,0,0.25)",
      willChange: "left, top, width, height, opacity, borderRadius",
    });

    temp.style.backgroundImage = `url(${cards[targetIndex].image})`;

    let srcRect: DOMRect;
    let borderRadius = "16px";

    if (sourceElement) {
      const imgEl =
        sourceElement.querySelector &&
        (sourceElement.querySelector("img") as HTMLImageElement | null);
      if (imgEl) {
        srcRect = imgEl.getBoundingClientRect();
        const comp = window.getComputedStyle(imgEl);
        borderRadius = comp.borderRadius || borderRadius;
      } else {
        srcRect = sourceElement.getBoundingClientRect();
        const comp = window.getComputedStyle(sourceElement);
        borderRadius = comp.borderRadius || borderRadius;
      }
    } else {
      const fallbackW = Math.min(420, window.innerWidth * 0.45);
      const fallbackH = fallbackW * 0.6;
      srcRect = new DOMRect(
        window.innerWidth / 2 - fallbackW / 2,
        window.innerHeight / 2 - fallbackH / 2,
        fallbackW,
        fallbackH
      );
      borderRadius = "12px";
    }

    const left = srcRect.left - destRect.left;
    const top = srcRect.top - destRect.top;

    Object.assign(temp.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${srcRect.width}px`,
      height: `${srcRect.height}px`,
      borderRadius,
      opacity: "1",
      zIndex: "1",
    });

    bgEl.appendChild(temp);

    gsap.to(bgEl, {
      duration: 0.6,
      filter: "blur(6px)",
      opacity: 0.98,
      ease: "power2.out",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(temp, {
      duration: 0.9,
      left: "0px",
      top: "0px",
      width: `${destRect.width}px`,
      height: `${destRect.height}px`,
      borderRadius: "0px",
    });

    tl.add(() => {
      bgEl.style.backgroundImage = `url(${cards[targetIndex].image})`;
    }, "+=0.04");

    tl.to(
      temp,
      {
        duration: 0.35,
        opacity: 0,
        onStart: () => {
          setActive(targetIndex);
          requestAnimationFrame(() => animateTextAndSide());
        },
        onComplete: () => {
          temp.remove();
          setTimeout(() => setIsAnimating(false), 60);
        },
      },
      "-=0.15"
    );

    tl.to(
      bgEl,
      {
        duration: 0.6,
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        ease: "power3.out",
      },
      "-=0.2"
    );
  };

  const goNext = () => {
    if (isAnimating) return;
    changeSlide((active + 1) % cards.length, null);
  };

  const goPrev = () => {
    if (isAnimating) return;
    changeSlide((active - 1 + cards.length) % cards.length, null);
  };

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, cards.length);
    buttonsRef.current = buttonsRef.current.slice(0, 2);
    animateTextAndSide();
  }, []);

  return (
    <section className="relative flex items-center justify-between px-10 py-20 h-screen text-white overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${cards[active]?.image})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Text Section */}
      <div ref={textRef} className="max-w-lg relative z-10">
        <h2 className="text-5xl font-bold mb-6">{cards[active]?.title}</h2>
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          {cards[active]?.desc}
        </p>
        <button
          className="discover-btn p-4 bg-white/20 rounded-full cursor-pointer backdrop-blur-sm border border-white/30"
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.05, duration: 0.18 })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.18 })
          }
        >
          Discover Location
        </button>
      </div>

      {/* Cards + Navigation */}
      <div className="relative flex items-center gap-6 z-10">
        {cards.map((card, i) => {
          if (i === active) return null;
          return (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="card relative w-48 h-72 rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-2 border-white/10 backdrop-blur-sm"
              onClick={(e) =>
                !isAnimating && changeSlide(i, e.currentTarget as HTMLElement)
              }
            >
              <Image
                src={card.image}
                alt={card.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                <h3 className="font-semibold text-sm">{card.title}</h3>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            ref={(el) => {
              buttonsRef.current[0] = el;
            }}
            onClick={() => goPrev()}
            className="nav-button p-4 bg-white/20 rounded-full cursor-pointer backdrop-blur-sm border border-white/30"
            disabled={isAnimating}
          >
            <FaArrowLeft />
          </button>

          <button
            ref={(el) => {
              buttonsRef.current[1] = el;
            }}
            onClick={() => goNext()}
            className="nav-button p-4 bg-white/20 rounded-full cursor-pointer backdrop-blur-sm border border-white/30"
            disabled={isAnimating}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
