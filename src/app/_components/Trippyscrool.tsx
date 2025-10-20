"use client";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

const TrippyScroll = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"]);

  return (
    <div ref={targetRef} className="relative z-0 h-[800vh] bg-neutral-200">
      <div className="sticky top-0 h-screen bg-white">
        <Trippy rotate={rotate} />
      </div>
    </div>
  );
};


const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const generateSections = (
  count: number,
  color: string,
  rotate: MotionValue<string>
): React.ReactElement => {
  if (count === NUM_SECTIONS) return <></>;

  const nextColor = color === "black" ? "white" : "black";

  return (
    <Section rotate={rotate} background={color}>
      {generateSections(count + 1, nextColor, rotate)}
    </Section>
  );
};

interface TrippyProps {
  rotate: MotionValue<string>;
}

const Trippy = ({ rotate }: TrippyProps) => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-black">
      {generateSections(0, "black", rotate)}
    </motion.div>
  );
};


interface SectionProps {
  background: string;
  children: ReactNode;
  rotate: MotionValue<string>;
}

const Section = ({ background, children, rotate }: SectionProps) => {
  return (
    <motion.div
      className="relative h-full w-full origin-center"
      style={{
        background,
        rotate,
        padding: PADDING,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TrippyScroll;
