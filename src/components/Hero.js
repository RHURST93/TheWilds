import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { SiSpacex } from 'react-icons/si';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import cardinal from '../assets/cardinal.jpg';
import hawk from '../assets/hawk.jpg';
import herron from '../assets/herron.jpg';
import paintedbunting from '../assets/paintedbunting.jpg';
import scissortail from '../assets/scissortail.jpg';
const SmoothScrollHero = () => {
  useEffect(() => {
    // Using `new` keyword to instantiate Lenis
    const lenis = new Lenis({
      lerp: 0.05,
      // other options if needed
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-zinc-950">
        
      <Hero />
      <ParallaxImages />
    </div>
  );
};



const SECTION_HEIGHT = 1000;

const Hero = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 200], [0, 0]);
  const clip2 = useTransform(scrollY, [0, 200], [105, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['155%', '250%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <>
    <div className='relative w-100'>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black z-50 text-4xl font-bold mt-24 text-center">
        Photos from the wilds to your wall
      </h1>
      </div>
    
        

    
    
    <motion.div
      className="sticky top-0 h-screen  w-screen "
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          `url(${paintedbunting})`,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
      }}
      
      
    />
    
    </>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={hawk}
        alt="An example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src={scissortail}
        alt="An example of a space launch"
        start={500}
        end={-750}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={cardinal}
        alt="Orbiting satellite"
        start={-200}
        end={10}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={herron}
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};



const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

export default SmoothScrollHero;