"use client";
import { useEffect } from "react";
import gsap from "gsap";

type MarqueeProps = {
  text: string;
  duration: number;
  bg?: string;
  rotate?: string;
  textColor?: string;
  accentColor?: string;
};

const Marquee = ({
  text,
  duration,
  bg = "bg-green-400",
  rotate = "-rotate-2 scale-110",
  textColor = "text-black",
  accentColor = "text-black/60 font-caveat",
}: MarqueeProps) => {
  useEffect(() => {
    const ticker = document.querySelector(`.${bg.split(" ")[0]}`);
    if (!ticker) return;

    const inner = ticker.querySelector(".ticker-wrap");
    const content = inner?.querySelector(".ticker-text");

    if (inner && content) {
      const clone = content.cloneNode(true);
      inner.appendChild(clone);

      const elements = inner.querySelectorAll(".ticker-text");
      const animations: gsap.core.Tween[] = [];

      elements.forEach((el) => {
        const anim = gsap.to(el, {
          x: "-100%",
          repeat: -1,
          duration: duration,
          ease: "linear",
        });
        animations.push(anim);
      });

      ticker.addEventListener("mouseenter", () => {
        animations.forEach((a) => a.pause());
      });
      ticker.addEventListener("mouseleave", () => {
        animations.forEach((a) => a.play());
      });
    }
  }, [duration, bg]);

  return (
    <div className={`ticker ${bg} ${rotate} py-4 overflow-hidden`}>
      <div className="ticker-wrap flex gap-8 whitespace-nowrap">
        <div
          className={`ticker-text ${textColor} text-[clamp(40px,4.375vw,70px)] font-semibold tracking-[-0.02em]`}
        >
          {text.split(" ").map((word, i) =>
            word.startsWith("@") || word.includes("@") || word.includes("•") ? (
              <span
                key={i}
                className={`${accentColor} inline-block px-1 font-medium text-lg`}
              >
                {word}{" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </div>
      </div>
    </div>
  );
};

const InfiniteMarquee = () => {
  return (
    <section className="flex flex-col justify-center gap-12 min-h-screen font-oswald">
      <Marquee
        text="Let's collaborate • Drop me a line at hello@studio.com • Available for freelance projects • Ready to create something amazing •"
        duration={20}
        bg="bg-green-400"
        rotate="-rotate-2 scale-110"
        textColor="text-black"
        accentColor="text-black/60 font-caveat"
      />
      <Marquee
        text="Connect with me @yourhandle • Open to new opportunities • Let's build something incredible together •"
        duration={10}
        bg="bg-neutral-900"
        rotate="rotate-2 scale-110"
        textColor="text-white"
        accentColor="text-green-400 font-caveat"
      />
    </section>
  );
};

export default InfiniteMarquee;
