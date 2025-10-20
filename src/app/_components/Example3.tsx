"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FiMousePointer } from "react-icons/fi";

// Type definition for MouseImageTrail props
interface MouseImageTrailProps {
  children: React.ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}

export const Example3 = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://ik.imagekit.io/msmrd69gi/rduao1hfutdct9q998ro6fbhjdgiz9co.webp",
        "https://ik.imagekit.io/msmrd69gi/uc8mvtzasxl4wt4x3lo830e9hp6iq34c.webp",
        "https://ik.imagekit.io/msmrd69gi/g9llsn23se4dw8smxmb9x6htnsyii1hr.webp",
        "https://ik.imagekit.io/msmrd69gi/40ef34bjno8fte1wcnq8vv9udbdgi7m3.webp",
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-white">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <FiMousePointer />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

// Main component with proper prop types
const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    const dx = clientX - lastRenderPosition.current.x;
    const dy = clientY - lastRenderPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current = { x: clientX, y: clientY };
      renderNextImage(clientX, clientY);
    }
  };

  const renderNextImage = (x: number, y: number) => {
    const imageIndex = imageRenderCount.current % images.length;
    const el = document.querySelector(
      `[data-mouse-move-index="${imageIndex}"]`
    ) as HTMLElement | null;

    if (!el) return;

    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    const rotate = imageIndex % 6 ? rotation : -rotation;

    // GSAP animation
    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.2,
        xPercent: -50,
        yPercent: -25,
        rotate: rotate,
      },
      {
        opacity: 1,
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        rotate: -rotate,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    gsap.to(el, {
      opacity: 0,
      duration: 0.2,
      delay: 5,
      ease: "linear",
    });

    imageRenderCount.current++;
  };

  return (
    <div className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      {children}

      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          width={180}
          height={180}
          alt={`Trail ${index}`}
          data-mouse-move-index={index}
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
        />
      ))}
    </div>
  );
};



// With framer-motion

// 'use client'
// import { useAnimate } from "framer-motion";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { FiMousePointer } from "react-icons/fi";

// export const Example3 = () => {
//   return (
//     <MouseImageTrail
//       renderImageBuffer={50}
//       rotationRange={25}
//       images={[
//         "https://ik.imagekit.io/msmrd69gi/rduao1hfutdct9q998ro6fbhjdgiz9co.webp?updatedAt=1754392734281",
//         "https://ik.imagekit.io/msmrd69gi/uc8mvtzasxl4wt4x3lo830e9hp6iq34c.webp?updatedAt=1754392733962",
//         "https://ik.imagekit.io/msmrd69gi/ug0zux7vol9efnrq3jl2mid7wh8wy8gd.webp?updatedAt=1754392733518",
//         "https://ik.imagekit.io/msmrd69gi/ug0zux7vol9efnrq3jl2mid7wh8wy8gd.webp?updatedAt=1754392733518",
//         "https://ik.imagekit.io/msmrd69gi/p7w783j8kv3xvc7aw5sel89sukzt57u4.webp?updatedAt=1754396964900",
//         "https://ik.imagekit.io/msmrd69gi/g9llsn23se4dw8smxmb9x6htnsyii1hr.webp?updatedAt=1754392732265",
//         "https://ik.imagekit.io/msmrd69gi/bzuqt1qcimljtgzpfko5pceem1v6appe.webp?updatedAt=1754392729016",
//         "https://ik.imagekit.io/msmrd69gi/eslc3cvkyh7vprwgfopudjpu638r6fv7.webp?updatedAt=1754392727892",
//         "https://ik.imagekit.io/msmrd69gi/0sj2q5fa1t7s79jxflwq189q2hfz16do.webp?updatedAt=1754392727939",
//         "https://ik.imagekit.io/msmrd69gi/dev5du5wbfl1vpzxmsts3t20seei22of.webp?updatedAt=1754392727765",
//         "https://ik.imagekit.io/msmrd69gi/6gqdtl1c3dbns6k4yux18xq1cs1a2ftn.webp?updatedAt=1754392727682",
//         "https://ik.imagekit.io/msmrd69gi/1k94den5j94hgr6q9562p5zfwam0yrlq.webp?updatedAt=1754392727599",
//         "https://ik.imagekit.io/msmrd69gi/40ef34bjno8fte1wcnq8vv9udbdgi7m3.webp?updatedAt=1754392727432",
//         "https://ik.imagekit.io/msmrd69gi/5642mf66mppb97k9e7n6du5fjdgs6sn4.webp?updatedAt=1754384631853",
//         "https://ik.imagekit.io/msmrd69gi/5yikbkgqxrw4unekugyslknomoful7ob.webp?updatedAt=1754384631407",
//         "https://ik.imagekit.io/msmrd69gi/857195-hd_1280_720_25fps.mp4?updatedAt=1750944425157",
//       ]}
//     >
//       <section className="grid h-screen w-full place-content-center bg-white">
//         <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
//           <FiMousePointer />
//           <span>Hover me</span>
//         </p>
//       </section>
//     </MouseImageTrail>
//   );
// };

// const MouseImageTrail = ({
//   children,
//   // List of image sources
//   images,
//   // Will render a new image every X pixels between mouse moves
//   renderImageBuffer,
//   // images will be rotated at a random number between zero and rotationRange,
//   // alternating between a positive and negative rotation
//   rotationRange,
// }) => {
//   const [scope, animate] = useAnimate();

//   const lastRenderPosition = useRef({ x: 0, y: 0 });
//   const imageRenderCount = useRef(0);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;

//     const distance = calculateDistance(
//       clientX,
//       clientY,
//       lastRenderPosition.current.x,
//       lastRenderPosition.current.y
//     );

//     if (distance >= renderImageBuffer) {
//       lastRenderPosition.current.x = clientX;
//       lastRenderPosition.current.y = clientY;

//       renderNextImage();
//     }
//   };

//   const calculateDistance = (x1, y1, x2, y2) => {
//     const deltaX = x2 - x1;
//     const deltaY = y2 - y1;

//     // Using the Pythagorean theorem to calculate the distance
//     const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     return distance;
//   };

//   const renderNextImage = () => {
//     const imageIndex = imageRenderCount.current % images.length;
//     const selector = `[data-mouse-move-index="${imageIndex}"]`;

//     const el = document.querySelector(selector);

//     el.style.top = `${lastRenderPosition.current.y}px`;
//     el.style.left = `${lastRenderPosition.current.x}px`;
//     el.style.zIndex = imageRenderCount.current.toString();

//     const rotation = Math.random() * rotationRange;

//     animate(
//       selector,
//       {
//         opacity: [0, 1],
//         transform: [
//           `translate(-50%, -25%) scale(0.5) ${
//             imageIndex % 2
//               ? `rotate(${rotation}deg)`
//               : `rotate(-${rotation}deg)`
//           }`,
//           `translate(-50%, -50%) scale(1) ${
//             imageIndex % 2
//               ? `rotate(-${rotation}deg)`
//               : `rotate(${rotation}deg)`
//           }`,
//         ],
//       },
//       { type: "spring", damping: 15, stiffness: 200 }
//     );

//     animate(
//       selector,
//       {
//         opacity: [1, 0],
//       },
//       { ease: "linear", duration: 0.5, delay: 5 }
//     );

//     imageRenderCount.current = imageRenderCount.current + 1;
//   };

//   return (
//     <div
//       ref={scope}
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {children}

//       {images.map((img, index) => (
//         <Image
//           className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
//           src={img}
//           width={48}
//           height={48}
//           alt={`Mouse move image ${index}`}
//           key={index}
//           data-mouse-move-index={index}
//         />
//       ))}
//     </div>
//   );
// };