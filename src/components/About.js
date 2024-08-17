import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import lummi from "../assets/lummi.jpg";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8 },
      });
    }
  }, [controls, inView]);

  return (
    <div className="bg-zinc-950 p-6 relative">
      <div className="border-white border justify-items-center  top-0 left-0 w-full">
        <h1 className="text-white text-center text-3xl m-4 underline underline-offset-4">
          About
        </h1>
      </div>

      <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          ref={ref}
          initial={{ x: -200, opacity: 0 }}
          animate={controls}
          className="flex justify-center"
        >
          <img
            className="rounded-full"
            src={lummi}
            alt="portfolio photo"
            style={{ width: 250 }}
          />
          <div className="h-65 w-1  bg-white mx-auto"></div>
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={controls}
          className="text-white text-lg text-center md:text-left"
        >
          <p>
            As a dedicated wildlife photographer, I have spent the past three
            years capturing the raw beauty of nature. Equipped with a Nikon Z-7
            and a Nikkor 500mm lens, I immerse myself in the wilds, from dense
            forests to open plains, to document the incredible diversity of
            life. My portfolio ranges from the delicate grace of birds in flight
            to the majestic presence of bison roaming freely. Every shot I take
            is a testament to my passion for the natural world and my commitment
            to showcasing its splendor through my lens.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
