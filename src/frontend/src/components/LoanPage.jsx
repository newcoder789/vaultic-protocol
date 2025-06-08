// src/components/LoanPage.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Animation variants for the page
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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 30px rgba(147, 51, 234, 0.8)", // Stronger purple glow on hover
    background: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect on hover
  },
  tap: { scale: 0.95 },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  focus: {
    scale: 1.02,
    borderColor: "rgba(147, 51, 234, 0.8)",
    boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)",
  },
};

const LoanPage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate] = useState("5"); // Example fixed interest rate
  const [userNFTs, setUserNFTs] = useState([]); // State for user's NFTs
  const [selectedNFT, setSelectedNFT] = useState(""); // State for selected NFT

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for loan submission logic
    alert(
      `Loan Request Submitted!\nAmount: ${loanAmount} ICP\nDuration: ${duration} months\nInterest Rate: ${interestRate}%\nCollateral NFT: ${selectedNFT}`
    );
  };

  // Simulate fetching user's NFTs (mock data)
  useEffect(() => {
    // Mock NFT data - replace with actual API or smart contract call
    const mockNFTs = [
      { id: "1", name: "CryptoPunk #1234" },
      { id: "2", name: "Bored Ape #5678" },
      { id: "3", name: "Cool Cat #9012" },
    ];
    setUserNFTs(mockNFTs);
    if (mockNFTs.length > 0) {
      setSelectedNFT(mockNFTs[0].id); // Default to first NFT
    }
  }, []);

  return (
    <>
      {/* Embed CSS directly in the component */}
      <style>
        {`
          .particle {
            position: absolute;
            border-radius: 50%;
          }

          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0.2;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(-100vh) translateX(${Math.random() * 20 - 10}px);
              opacity: 0;
            }
          }
        `}
      </style>

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white relative overflow-hidden">
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        {/* Particle Effects */}
        <div className="particles absolute inset-0 z-1 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="particle absolute rounded-full bg-purple-400 opacity-20"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <Header />

        {/* Navigation Bar Layout */}
        <div className="border-b border-gray-600 pb-3 text-white text-lg font-medium">
          <div className="max-w-7xl mx-auto px-0 flex items-center justify-between mt-4">
            {/* Left Side Navigation */}
            <div className="flex items-center space-x-12">
              <button className="relative">
                <span className="text-white font-bold">Get a new loan</span>
                <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-white" />
              </button>
              <button className="text-gray-300 hover:text-white transition duration-200">My Loans</button>
              <button className="text-gray-300 hover:text-white transition duration-200">Offers received</button>
            </div>

            {/* Right Side Action */}
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200 cursor-pointer">
              <img src="/icons/multiple-nfts-icon.svg" alt="icon" className="w-4 h-4" />
              <span>Get a loan on multiple NFTs</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.main
          className="flex-1 container mx-auto py-20 px-4 flex flex-col items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 text-center"
            variants={sectionVariants}
          >
            Request a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)]">
              Loan
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl tracking-wide text-gray-200 max-w-[28rem] mt-4 text-center mb-12"
            variants={sectionVariants}
          >
            Securely borrow assets on-chain with VAULTIC PROTOCOL.
          </motion.p>

          {/* Loan Request Form */}
          <motion.form
            className="w-full max-w-md bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-8 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            variants={containerVariants}
            onSubmit={handleSubmit}
          >
            {/* Loan Amount */}
            <motion.div className="mb-6" variants={sectionVariants}>
              <label
                htmlFor="loanAmount"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Loan Amount (ICP)
              </label>
              <motion.input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4 focus:outline-none"
                placeholder="Enter amount in ICP"
                required
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
              />
            </motion.div>

            {/* Duration */}
            <motion.div className="mb-6" variants={sectionVariants}>
              <label
                htmlFor="duration"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Duration (Months)
              </label>
              <motion.input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4 focus:outline-none"
                placeholder="Enter duration in months"
                required
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
              />
            </motion.div>

            {/* Select Collateral NFT */}
            <motion.div className="mb-6" variants={sectionVariants}>
              <label
                htmlFor="collateralNFT"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Select Collateral NFT
              </label>
              <motion.select
                id="collateralNFT"
                value={selectedNFT}
                onChange={(e) => setSelectedNFT(e.target.value)}
                className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4 focus:outline-none"
                required
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
              >
                {userNFTs.length === 0 ? (
                  <option value="">No NFTs available</option>
                ) : (
                  userNFTs.map((nft) => (
                    <option key={nft.id} value={nft.id}>
                      {nft.name}
                    </option>
                  ))
                )}
              </motion.select>
            </motion.div>

            {/* Interest Rate (Display Only) */}
            <motion.div className="mb-8" variants={sectionVariants}>
              <label
                htmlFor="interestRate"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Interest Rate (%)
              </label>
              <motion.input
                type="text"
                id="interestRate"
                value={interestRate}
                readOnly
                className="w-full bg-gray-900 text-gray-400 border-2 border-purple-300/50 rounded-lg py-3 px-4"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div className="flex justify-center" variants={sectionVariants}>
              <motion.button
                type="submit"
                className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-10 rounded-full border-2 border-purple-300/50 font-medium text-lg backdrop-blur-sm bg-opacity-30 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                Submit Loan Request
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LoanPage;