import React, { useState } from 'react';

const HomeWrapper = () => {
  // Define the positions for the images
  const positions = [
    { name: 'left', style: 'top-0 left-[-50px] rotate-[-10deg] z-10' }, // Left position
    { name: 'top', style: 'top-0 left-[80px] z-20' }, // Top (middle) position
    { name: 'right', style: 'top-0 left-[210px] rotate-[10deg] z-10' }, // Right position
  ];

  // State to track the current position index for each image
  const [imagePositions, setImagePositions] = useState([
    { id: 'left-img', posIndex: 0 }, // Initially in 'left' position
    { id: 'top-img', posIndex: 1 },  // Initially in 'top' position
    { id: 'right-img', posIndex: 2 }, // Initially in 'right' position
  ]);

  // Handle click to swap positions
  const handleImageClick = () => {
    setImagePositions((prevPositions) =>
      prevPositions.map((img) => ({
        ...img,
        posIndex: (img.posIndex + 1) % 3, // Cycle through positions: 0 -> 1 -> 2 -> 0
      }))
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-black via-[#1a0a2a] to-black flex items-center justify-center px-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
        {/* Text section */}
        <div className="text-white space-y-4 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Decentralized NFT Lending
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Made <span className="text-purple-400">Seamless</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            That People <span className="text-purple-500">Love</span>.
          </h1>
        </div>

        {/* NFT image wrapper */}
        <div className="relative w-[520px] h-[280px]">
          {imagePositions.map((img, index) => (
            <div
              key={img.id}
              className={`absolute w-[320px] h-[280px] rounded-xl shadow-xl border border-green-400 overflow-hidden bg-black cursor-pointer transition-all duration-500 ease-in-out ${
                positions[img.posIndex].style
              }`}
              onClick={handleImageClick}
            >
              <img
                src={`/public/img/Nfts/${
                  index === 0 ? '1.webp' : index === 1 ? '3.png' : '2.webp'
                }`}
                alt={`NFT ${positions[img.posIndex].name}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWrapper;