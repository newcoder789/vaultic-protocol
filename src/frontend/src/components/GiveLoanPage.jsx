import { useEffect, useState } from "react";
import Header from "./Header2";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaListUl, FaThLarge } from "react-icons/fa";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const floatUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const GiveLoanPage = () => {
  const [availableLoans, setAvailableLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("new-loan");
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [offersSent, setOffersSent] = useState([]);

  useEffect(() => {
    const mockLoans = [
      {
        id: "loan001",
        borrower: "0xf5bb52",
        amount: "Any",
        rate: "5",
        duration: "30",
        currency: "ICP",
        type: "Fixed",
        principle: "10",
        asset: {
          name: "Impostors Genesis",
          display: "Impostors...",
          image: "/images/nfts/impostors.png",
        },
      },
      {
        id: "loan002",
        borrower: "0xced9f8",
        amount: "Any",
        rate: "7",
        duration: "60",
        currency: "ICP",
        type: "Flexible",
        principle: "20",
        asset: {
          name: "Nakamigos #8087",
          display: "Nakamigos #8087",
          image: "/images/nfts/nakamigos.png",
        },
      },
    ];
    setAvailableLoans(mockLoans);

    const mockOffers = [
      {
        id: "offer001",
        asset: {
          name: "Cool Cat #1234",
          image: "/images/nfts/coolcat.png",
        },
        borrower: "0xabc123",
        amount: "5",
        currency: "ICP",
        duration: "30 days",
        status: "Pending",
      },
      {
        id: "offer002",
        asset: {
          name: "Mutant Ape #9988",
          image: "/images/nfts/mutantape.png",
        },
        borrower: "0xdef456",
        amount: "8",
        currency: "ICP",
        duration: "60 days",
        status: "Accepted",
      },
    ];
    setOffersSent(mockOffers);
  }, []);

  const handleOfferLoan = (loanId) => {
    alert(`Offer made on ${loanId}!`);
  };

  return (
    <>
      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="particle bg-purple-400 opacity-20"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  Math.random() * 18 + 10
                }s infinite ease-in-out`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Header />

          {/* Tabs */}
          <div className="border-b border-gray-600 pb-3 text-white text-lg font-medium">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mt-4">
              <div className="flex items-center space-x-12">
                {["new-loan", "my-loans", "offers"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative ${
                      activeTab === tab
                        ? "text-white font-bold"
                        : "text-gray-300"
                    } transition duration-200`}
                  >
                    {tab === "new-loan"
                      ? "Give a new loan"
                      : tab === "my-loans"
                      ? "Loan given"
                      : "Offers sent"}
                    {activeTab === tab && (
                      <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 min-h-[80vh]">
            {/* Give a Loan Section */}
            {activeTab === "new-loan" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
              >
                <motion.h1
                  className="text-5xl font-bold mb-8 text-center"
                  variants={sectionVariants}
                >
                  Give a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)]">
                    Loan
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto"
                  variants={sectionVariants}
                >
                  Browse available loan requests. Choose any NFT, decide terms,
                  and make your loan offer securely on Vaultic Protocol.
                </motion.p>

                {/* Filter and View Mode */}
                <div className="flex justify-between items-center mb-8 px-2">
                  <div className="text-sm">
                    <label
                      htmlFor="durationFilter"
                      className="mr-2 text-gray-400"
                    >
                      Filter by Duration:
                    </label>
                    <select
                      id="durationFilter"
                      className="bg-gray-800 border border-purple-600 px-2 py-1 rounded text-white"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="short">≤ 30 days</option>
                      <option value="medium">31-60 days</option>
                      <option value="long">60 days</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className={`p-2 rounded-full ${
                        viewMode === "grid" ? "bg-purple-600" : "bg-gray-800"
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      className={`p-2 rounded-full ${
                        viewMode === "list" ? "bg-purple-600" : "bg-gray-800"
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <FaListUl />
                    </button>
                  </div>
                </div>

                {/* Cards */}
                {viewMode === "grid" ? (
                  <motion.div
                    className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
                    variants={sectionVariants}
                  >
                    {availableLoans
                      .filter((loan) => {
                        const days = parseInt(loan.duration);
                        if (filter === "all") return true;
                        if (filter === "short") return days <= 30;
                        if (filter === "medium") return days > 30 && days <= 60;
                        if (filter === "long") return days > 60;
                      })
                      .map((loan) => (
                        <motion.div
                          key={loan.id}
                          className="bg-[#1e1e3f] p-6 rounded-2xl border border-purple-700/40 shadow-md hover:bg-[#2a2244] transition"
                          variants={sectionVariants}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              src={loan.asset.image}
                              alt={loan.asset.name}
                              className="w-10 h-10 rounded"
                            />
                            <div>
                              <div className="text-xl font-bold text-white">
                                {loan.asset.display}
                              </div>
                              <div className="text-xs text-gray-400">
                                Loan ID: {loan.id}
                              </div>
                            </div>
                          </div>

                          <ul className="text-sm text-gray-300 space-y-1 mb-4">
                            <li>
                              <span className="text-purple-300 font-medium">
                                Borrower:
                              </span>{" "}
                              {loan.borrower}
                            </li>
                            <li>
                              <span className="text-pink-300 font-medium">
                                Principle:
                              </span>{" "}
                              {loan.principle}
                            </li>
                            <li>
                              <span className="text-indigo-300 font-medium">
                                Rate:
                              </span>{" "}
                              {loan.rate}
                            </li>
                            <li>
                              <span className="text-purple-300 font-medium">
                                Duration:
                              </span>{" "}
                              {loan.duration}
                            </li>
                            <li>
                              <span className="text-pink-300 font-medium">
                                Currency:
                              </span>{" "}
                              {loan.currency}
                            </li>
                          </ul>

                          <button
                            onClick={() => handleOfferLoan(loan.id)}
                            className="w-full py-2 px-4 mt-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:brightness-110 transition"
                          >
                            Offer Loan
                          </button>
                        </motion.div>
                      ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex flex-col gap-6 max-w-6xl mx-auto"
                    variants={sectionVariants}
                  >
                    {availableLoans
                      .filter((loan) => {
                        const days = parseInt(loan.duration);
                        if (filter === "all") return true;
                        if (filter === "short") return days <= 30;
                        if (filter === "medium") return days > 30 && days <= 60;
                        if (filter === "long") return days > 60;
                      })
                      .map((loan) => (
                        <motion.div
                          key={loan.id}
                          className="flex items-center bg-[#1e1e3f] p-6 rounded-2xl border border-purple-700/40 shadow-md hover:bg-[#2a2244] transition"
                          variants={sectionVariants}
                        >
                          <img
                            src={loan.asset.image}
                            alt={loan.asset.name}
                            className="w-24 h-24 rounded-lg mr-6"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-xl font-semibold">
                                {loan.asset.display}
                              </h3>
                              <span className="text-xs text-gray-400">
                                ID: {loan.id}
                              </span>
                            </div>
                            <div className="text-sm text-gray-300 grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-pink-300 font-medium">
                                  Borrower:
                                </span>{" "}
                                {loan.borrower}
                              </div>
                              <div>
                                <span className="text-indigo-300 font-medium">
                                  Principle:
                                </span>{" "}
                                {loan.principle}
                              </div>
                              <div>
                                <span className="text-purple-300 font-medium">
                                  Rate:
                                </span>{" "}
                                {loan.rate}
                              </div>
                              <div>
                                <span className="text-purple-300 font-medium">
                                  Duration:
                                </span>{" "}
                                {loan.duration}
                              </div>
                              <div>
                                <span className="text-pink-300 font-medium">
                                  Currency:
                                </span>{" "}
                                {loan.currency}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleOfferLoan(loan.id)}
                            className="ml-6 py-3 px-6 rounded-full font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:brightness-110 transition"
                          >
                            Offer Loan
                          </button>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Loan Given Section */}
            {activeTab === "my-loans" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              >
                <motion.div variants={floatUpVariant} className="mb-10">
                  <h2 className="text-2xl font-semibold mb-3">Active Loans</h2>
                  <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300">
                    You don’t have any active loans.
                  </div>
                </motion.div>

                <motion.div variants={floatUpVariant}>
                  <h2 className="text-2xl font-semibold mb-3">Past Loans</h2>
                  <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300 space-y-4">
                    {[
                      {
                        id: "Loan #001",
                        name: "Bored Ape #5678",
                        amount: "10 ICP",
                        duration: "3 months",
                        status: "Repaid",
                        statusColor: "text-green-400",
                      },
                      {
                        id: "Loan #002",
                        name: "Cool Cat #9012",
                        amount: "8 ICP",
                        duration: "2 months",
                        status: "Liquidated",
                        statusColor: "text-red-400",
                      },
                    ].map((loan) => (
                      <motion.div
                        key={loan.id}
                        variants={floatUpVariant}
                        className="flex justify-between items-center border-b border-gray-700 pb-3"
                      >
                        <div>
                          <div className="text-white font-medium">
                            {loan.id}
                          </div>
                          <div className="text-sm text-gray-400">
                            {loan.name} • {loan.amount} • {loan.duration}
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${loan.statusColor}`}
                        >
                          {loan.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Offers Sent Section */}
            {activeTab === "offers" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                className="grid md:grid-cols-2 gap-6"
              >
                {offersSent.map((offer) => (
                  <motion.div
                    key={offer.id}
                    variants={floatUpVariant}
                    className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={offer.asset.image}
                        className="w-8 h-8 rounded"
                      />
                      <div>
                        <div className="font-bold">{offer.asset.name}</div>
                        <div className="text-sm text-gray-400">
                          Offer ID: {offer.id}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Amount: {offer.amount} {offer.currency} • Duration:{" "}
                      {offer.duration}
                    </div>
                    <div className="text-gray-300 text-sm">
                      Borrower:{" "}
                      <span className="text-purple-400 hover:underline cursor-pointer">
                        {offer.borrower}
                      </span>
                    </div>
                    <div
                      className={`mt-4 text-sm font-semibold ${
                        offer.status === "Accepted"
                          ? "text-green-400"
                          : offer.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      Status: {offer.status}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default GiveLoanPage;
