import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImageSlider from "./components/ImageSlider";
import { useState, Suspense, useEffect } from "react";
import CollectionSlider from "./components/CollectionSlider";
import HomeWrapper from "./components/HomeWrapper";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import ProtocolStats from "./components/ProtocolStats";
import GovernanceTokenomics from "./components/GovernanceTokenomics";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.6,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const blurVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -30,
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
};

export default function App() {
  const generateImages = (prefix, count) =>
    Array.from({ length: count }, (_, i) => ({
      src: `/images/${prefix}_${i + 1}.png`,
      alt: `Slide ${i + 1}`,
    }));

  const slider2Images = generateImages("slider2", 9);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  console.log("Slider 2 Images:", slider2Images);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence>
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Gradient image with animation */}
          <motion.img
            className="absolute top-0 right-0 opacity-60 -z-10"
            src="/gradient.png"
            alt="Gradient-img"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Blur effect with animation */}
          <motion.div
            className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#6464dc] -rotate-[30deg] -z-10"
            variants={blurVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Header with fade-in */}
          <motion.div variants={sectionVariants}>
            <Header />
          </motion.div>

          {/* Hero with slide-up */}
          <motion.div variants={sectionVariants}>
            <Hero />
          </motion.div>

          {/* Trending NFT Section with viewport trigger */}
          <motion.section
            ref={sectionRef}
            className="max-w-[1200px] w-[95vw] mx-auto py-8"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6"
              style={{ color: "#FFFFFF" }}
              variants={sectionVariants}
            >
              Trending NFT
            </motion.h2>
            <motion.div
              variants={sectionVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              transition={{ duration: 0.3 }}
            >
              <ImageSlider
                images={slider2Images}
                width="300px"
                height="300px"
                quantity={9}
                reverse={true}
                className="mt-8"
              />
            </motion.div>
          </motion.section>

          {/* Other Sections with Viewport Animations */}
          {[
            HomeWrapper,
            HowItWorks,
            Features,
            Testimonials,
            ProtocolStats,
            GovernanceTokenomics,
            CollectionSlider,
          ].map((Component, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, amount: 0.2 });
            return (
              <motion.div
                key={index}
                ref={ref}
                variants={sectionVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <Component />
              </motion.div>
            );
          })}

          {/* Call to Action with Hover and Tap Animation */}
          <motion.div
            variants={sectionVariants}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <CallToAction />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Footer />
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </Suspense>
  );
}
