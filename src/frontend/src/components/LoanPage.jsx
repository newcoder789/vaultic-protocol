// src/components/LoanPage.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "./Header2";
import Footer from "./Footer";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.1,
  },
  tap: { scale: 0.95 },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LoanPage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate] = useState("5");
  const [userNFTs, setUserNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState("");
  const [activeTab, setActiveTab] = useState("new-loan");
    // Chat system
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [chatInput, setChatInput] = useState("");

  const toggleChat = (offerId) => {
    setChatOpen(chatOpen === offerId ? null : offerId);
    setChatInput("");
  };

  const sendMessage = (offerId) => {
    if (!chatInput.trim()) return;
    const messages = chatMessages[offerId] || [];
    const newMessages = [...messages, { sender: "You", text: chatInput }];
    setChatMessages((prev) => ({ ...prev, [offerId]: newMessages }));
    setChatInput("");
  };

  useEffect(() => {
    const mockNFTs = [
      { id: "1", name: "CryptoPunk #1234" },
      { id: "2", name: "Bored Ape #5678" },
      { id: "3", name: "Cool Cat #9012" },
    ];
    setUserNFTs(mockNFTs);
    if (mockNFTs.length > 0) setSelectedNFT(mockNFTs[0].id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Loan Submitted!\nAmount: ${loanAmount} ICP\nDuration: ${duration} months\nInterest: ${interestRate}%\nNFT: ${selectedNFT}`);
  };

  return (
    <>
      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        {/* Particles */}
        <div className="particles absolute inset-0 z-1 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="particle bg-purple-400 opacity-20"
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

        <Header />

        {/* Tabs */}
        <div className="border-b border-gray-600 pb-3 text-white text-lg font-medium z-10 relative">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mt-4">
            <div className="flex items-center space-x-12">
              {["new-loan", "my-loans", "offers"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative ${activeTab === tab ? "text-white font-bold" : "text-gray-300"} transition duration-200`}
                >
                  <span>
                    {tab === "new-loan"
                      ? "Get a new loan"
                      : tab === "my-loans"
                      ? "My Loans"
                      : "Offers received"}
                  </span>
                  {activeTab === tab && (
                    <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-white" />
                  )}
                </button>
              ))}
            </div>

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
          {activeTab === "new-loan" && (
            <>
              <motion.h1 className="text-5xl font-bold mb-8 text-center" variants={sectionVariants}>
                Request a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)]">
                  Loan
                </span>
              </motion.h1>

              <motion.p className="text-xl text-gray-200 mb-12 text-center max-w-xl" variants={sectionVariants}>
                Securely borrow assets on-chain with VAULTIC PROTOCOL.
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-8 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                variants={containerVariants}
              >
                {/* Amount */}
                <motion.div className="mb-6" variants={sectionVariants}>
                  <label htmlFor="loanAmount" className="block text-sm mb-2">Loan Amount (ICP)</label>
                  <motion.input
                    type="number"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4 focus:outline-none"
                    placeholder="Enter amount"
                    required
                  />
                </motion.div>

                {/* Duration */}
                <motion.div className="mb-6" variants={sectionVariants}>
                  <label htmlFor="duration" className="block text-sm mb-2">Duration (months)</label>
                  <motion.input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4 focus:outline-none"
                    placeholder="Enter duration"
                    required
                  />
                </motion.div>

                {/* NFT Selection */}
                <motion.div className="mb-6" variants={sectionVariants}>
                  <label htmlFor="collateralNFT" className="block text-sm mb-2">Collateral NFT</label>
                  <motion.select
                    id="collateralNFT"
                    value={selectedNFT}
                    onChange={(e) => setSelectedNFT(e.target.value)}
                    className="w-full bg-gray-900 text-white border-2 border-purple-300/50 rounded-lg py-3 px-4"
                    required
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

                {/* Interest Rate */}
                <motion.div className="mb-8" variants={sectionVariants}>
                  <label htmlFor="interestRate" className="block text-sm mb-2">Interest Rate (%)</label>
                  <motion.input
                    type="text"
                    id="interestRate"
                    value={interestRate}
                    readOnly
                    className="w-full bg-gray-900 text-gray-400 border-2 border-purple-300/50 rounded-lg py-3 px-4"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div className="flex justify-center" variants={sectionVariants}>
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-10 rounded-full font-medium text-lg shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Submit Loan Request
                  </motion.button>
                </motion.div>
              </motion.form>
            </>
          )}

          {/* My Loans */}
          {activeTab === "my-loans" && (
            <motion.div className="w-full max-w-3xl mt-10 space-y-10 min-h-[80vh]" variants={sectionVariants}>
              {/* Active Loans */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Active Loans</h2>
                <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300">
                  You don’t have any active loans.
                </div>
              </div>

              {/* Past Loans */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Past Loans</h2>
                <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300 space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <div className="text-white font-medium">Loan #001</div>
                      <div className="text-sm text-gray-400">Bored Ape #5678 • 10 ICP • 3 months</div>
                    </div>
                    <div className="text-sm text-green-400">Repaid</div>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <div className="text-white font-medium">Loan #002</div>
                      <div className="text-sm text-gray-400">Cool Cat #9012 • 8 ICP • 2 months</div>
                    </div>
                    <div className="text-sm text-red-400">Liquidated</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Offers Received */}
          {activeTab === "offers" && (
            <motion.div className="w-full max-w-3xl mt-10 space-y-6 min-h-[80vh]" variants={sectionVariants}>
              <h2 className="text-2xl font-semibold">Offers Received</h2>
              <div className="space-y-4">
                {[1, 2].map((offerId) => (
                  <motion.div
                    key={offerId}
                    className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300 flex flex-col gap-4"
                    variants={sectionVariants}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white font-medium">Offer #{offerId}</div>
                        <div className="text-sm text-gray-400">CryptoPunk #1234 • 12 ICP • 4 months</div>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => alert(`Offer #${offerId} accepted!`)}
                        >
                          Accept
                        </motion.button>
                        <motion.button
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => alert(`Offer #${offerId} rejected.`)}
                        >
                          Reject
                        </motion.button>
                        <button
                          className="text-blue-400 underline"
                          onClick={() => toggleChat(offerId)}
                        >
                          Chat 💬
                        </button>
                      </div>
                    </div>

                    {/* Chat Box */}
                    {chatOpen === offerId && (
                      <div className="bg-gray-800 rounded-lg p-4 mt-4">
                        <div className="h-40 overflow-y-auto space-y-2 mb-4">
                          {(chatMessages[offerId] || []).map((msg, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-semibold">{msg.sender}:</span> {msg.text}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded"
                          />
                          <button
                            onClick={() => sendMessage(offerId)}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
        </motion.main>

        <Footer />
      </div>
    </>
  );
};

export default LoanPage;
