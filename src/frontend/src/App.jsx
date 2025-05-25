import Header from "./components/header";
import Hero from "./components/Hero";
import ImageSlider from "./components/ImageSlider";
import { useState, Suspense } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import CollectionSlider from './components/CollectionSlider';
import HomeWrapper from "./components/HomeWrapper";
import HowItWorks from "./components/HowItWorks";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const generateImages = (prefix, count) =>
    Array.from({ length: count }, (_, i) => ({
      src: `/images/${prefix}_${i + 1}.png`,
      alt: `Slide ${i + 1}`,
    }));

  const slider2Images = generateImages('slider2', 9);

  console.log('Slider 2 Images:', slider2Images);

  return (
    <main>
      {/* Gradient image */}
      <img
        className="absolute top-0 right-0 opacity-60 -z-10"
        src="/gradient.png"
        alt="Gradient-img"
      />
      {/* Blur effect */}
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#6464dc] -rotate-[30deg] -z-10"></div>

      <Header />
      <Hero />
      <section className="max-w-[1200px] w-[90vw] mx-auto py-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6"
          style={{
          color: '#6464dc',
          }}
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          Trending NFT
        </h2>
        <ImageSlider
          images={slider2Images}
          width="300px"
          height="300px"
          quantity={9}
          reverse={true}
          aosAnimation="fade-up"
          className="mt-8"
        />
      </section>
      <HomeWrapper/>
      
      <HowItWorks/>
        
      <CollectionSlider/>
    </main>
  );
}
