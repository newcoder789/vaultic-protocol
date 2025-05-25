import React from 'react';

const HowItWorks = () => {
  // Array of video URLs and thumbnail paths for each section
  const videoData = [
    {
      url: 'https://www.youtube.com/watch?v=your-video-id-1',
      thumbnail: '/public/img/Nfts/video-thumbnail-1.jpg',
    },
    {
      url: 'https://www.youtube.com/watch?v=your-video-id-2',
      thumbnail: '/public/img/Nfts/video-thumbnail-2.jpg',
    },
    {
      url: 'https://www.youtube.com/watch?v=your-video-id-3',
      thumbnail: '/public/img/Nfts/video-thumbnail-3.jpg',
    },
    {
      url: 'https://www.youtube.com/watch?v=your-video-id-4',
      thumbnail: '/public/img/Nfts/video-thumbnail-4.jpg',
    },
  ];

  return (
    <div className="w-full py-16 px-6 bg-gradient-to-r from-black via-[#1a0a2a] to-black flex flex-col items-center">
      {/* Heading (Outside the Box) */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        How Does It Work
      </h2>

      {/* Container for the Sections */}
      <div className="max-w-6xl w-full space-y-8">
        {/* First Section: Connect Your Wallet */}
        <div className="bg-[#2a1a3a] bg-opacity-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="text-white space-y-6 mb-10 md:mb-0 md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-semibold">
                1. Connect Your Wallet
              </h3>
              <p className="text-purple-400 text-lg flex items-center">
                Securely connect your preferred crypto wallet to get started.
                <span className="ml-2">→</span>
              </p>
            </div>

            {/* Video Thumbnail Section */}
            <div className="relative md:w-1/2 flex justify-center">
              <a href={videoData[0].url} target="_blank" rel="noopener noreferrer">
                <div className="relative w-[400px] h-[225px] rounded-xl overflow-hidden shadow-lg cursor-pointer group">
                  <img
                    src={videoData[0].thumbnail}
                    alt="Video Thumbnail 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Two-Column Section with Separate Boxes */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Left Column: List Your NFT */}
          <div className="flex-1 bg-[#2a1a3a] bg-opacity-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              2. List Your NFT
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Easily list your NFT for lending and set your desired terms.
            </p>
            <p className="text-purple-400 text-lg flex items-center justify-center">
              Find out more at our Shop
              <span className="ml-2">→</span>
            </p>
            <div className="mt-6">
              <a href={videoData[1].url} target="_blank" rel="noopener noreferrer">
                <div className="relative w-[300px] h-[169px] rounded-xl overflow-hidden shadow-lg cursor-pointer group mx-auto">
                  <img
                    src={videoData[1].thumbnail}
                    alt="Video Thumbnail 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Accept a Loan Offer */}
          <div className="flex-1 bg-[#2a1a3a] bg-opacity-50 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              3. Accept a Loan Offer
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Review and accept loan offers that best suit your needs
            </p>
            <p className="text-purple-400 text-lg flex items-center justify-center">
              Find out more at our Shop
              <span className="ml-2">→</span>
            </p>
            <div className="mt-6">
              <a href={videoData[2].url} target="_blank" rel="noopener noreferrer">
                <div className="relative w-[300px] h-[169px] rounded-xl overflow-hidden shadow-lg cursor-pointer group mx-auto">
                  <img
                    src={videoData[2].thumbnail}
                    alt="Video Thumbnail 3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Fourth Section: Repay the Loan */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#2a1a3a] bg-opacity-50 rounded-2xl p-8 md:p-12">
          {/* Text Section */}
          <div className="text-white space-y-6 mb-10 md:mb-0 md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-semibold">
              4. Repay the Loan
            </h3>
            <p className="text-purple-400 text-lg flex items-center">
              Complete the transaction by repaying the loan and retrieving your NFT.
              <span className="ml-2">→</span>
            </p>
          </div>
          {/* Video Thumbnail Section */}
          <div className="relative md:w-1/2 flex justify-center">
            <a href={videoData[3].url} target="_blank" rel="noopener noreferrer">
              <div className="relative w-[400px] h-[225px] rounded-xl overflow-hidden shadow-lg cursor-pointer group">
                <img
                  src={videoData[3].thumbnail}
                  alt="Video Thumbnail 4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;