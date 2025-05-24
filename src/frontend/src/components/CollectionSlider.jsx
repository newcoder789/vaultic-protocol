import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const collections = [
  {
    title: "World of Women",
    image: "/img/world.webp",
    avgLoan: "10,999 USD",
    volume: "10.87m USD",
    count: 988,
    apr: "33%"
  },
  {
    title: "Moonbirds",
    image: "/img/moonbird.jpeg",
    avgLoan: "14,856 USD",
    volume: "6.21m USD",
    count: 418,
    apr: "48%"
  },
  {
    title: "CloneX",
    image: "/img/cloneX.jpeg",
    avgLoan: "12,536 USD",
    volume: "12.07m USD",
    count: 963,
    apr: "51%"
  }
];

const CollectionSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Collections</h2>
      <Slider {...settings}>
        {collections.map((item, index) => (
          <div key={index} className="px-4">
            <div className="bg-[#1a1a2e] rounded-2xl p-4 text-center shadow-lg">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-semibold text-pink-500">{item.title}</h3>
              <div className="mt-4 text-sm">
                <p>Avg. loan size: {item.avgLoan}</p>
                <p>Loan volume: {item.volume}</p>
                <p>Loan count: {item.count}</p>
                <p>APR: {item.apr}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CollectionSlider;
