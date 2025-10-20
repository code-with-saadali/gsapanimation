'use client';

import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

interface Item {
  id: number;
  title: string;
  Icon: React.ComponentType;
  imgSrc: string;
  description: string;
}

interface PanelProps {
  open: number;
  setOpen: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  Icon: React.ComponentType;
  title: string;
  imgSrc: string;
  description: string;
}

const Example8 = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="p-4 bg-indigo-600">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden rounded-lg">
        {items.map((item) => (
          <Panel
            key={item.id}
            open={open}
            setOpen={setOpen}
            id={item.id}
            Icon={item.Icon}
            title={item.title}
            imgSrc={item.imgSrc}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

const Panel = ({
  open,
  setOpen,
  id,
  Icon,
  title,
  imgSrc,
  description,
}: PanelProps) => {
  const [width, setWidth] = useState(0);
  const isOpen = open === id;

  // screen width handler
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* tab button */}
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        {/* vertical title for desktop */}
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>

        {/* horizontal title for mobile */}
        <span className="block lg:hidden text-xl font-light">{title}</span>

        {/* icon */}
        <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
          <Icon />
        </div>

        {/* little arrow indicator */}
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      {/* animated panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-6 py-4 bg-black/50 backdrop-blur-sm text-white w-full"
            >
              <p className="text-lg font-medium">{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Example8;

const panelVariants: Variants = {
  open: { width: "100%", height: "100%" },
  closed: { width: "0%", height: "100%" },
};

const panelVariantsSm: Variants = {
  open: { width: "100%", height: "220px" },
  closed: { width: "100%", height: "0px" },
};

const descriptionVariants: Variants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.15,
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1], 
    },
  },
  closed: { opacity: 0, y: "100%" },
};

// content items
const items: Item[] = [
  {
    id: 1,
    title: "Earn more",
    Icon: FiDollarSign,
    imgSrc:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    description:
      "Boost your income with smart tools and proven strategies tailored to your business needs.",
  },
  {
    id: 2,
    title: "Play more",
    Icon: FiPlay,
    imgSrc:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
    description:
      "Find balance with more time for hobbies, creativity, and fun activities that inspire you.",
  },
  {
    id: 3,
    title: "Keep track",
    Icon: FiBell,
    imgSrc:
      "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
    description:
      "Stay organized with real-time tracking and reminders that keep you ahead of schedule.",
  },
  {
    id: 4,
    title: "Grow faster",
    Icon: FiBarChart,
    imgSrc:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    description:
      "Accelerate your growth with data-driven insights and powerful scaling opportunities.",
  },
];
