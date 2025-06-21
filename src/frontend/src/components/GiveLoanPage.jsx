import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaListUl, FaThLarge } from "react-icons/fa";

const GiveLoanPage = () => {
  const [availableLoans, setAvailableLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("new-loan");
  const [viewMode, setViewMode] = useState("list");
  const [offersSent, setOffersSent] = useState([]);

  useEffect(() => {
    const mockLoans = [
      {
        id: "loan001",
        borrower: "0xf5bb52",
        amount: "Any",
        rate: "Any",
        duration: "Any",
        currency: "Any",
        type: "Any",
        principle: "Any",
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
        rate: "Any",
        duration: "Any",
        currency: "Any",
        type: "Any",
        principle: "Any",
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white">
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
                  activeTab === tab ? "text-white font-bold" : "text-gray-300"
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

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-12 px-4">
        {activeTab === "new-loan" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white">
                <option>Filter by All Projects</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-purple-600" : "bg-gray-700"}`}
                >
                  <FaListUl />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded ${viewMode === "card" ? "bg-purple-600" : "bg-gray-700"}`}
                >
                  <FaThLarge />
                </button>
              </div>
            </div>

            {viewMode === "list" && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4">Asset</th>
                      <th className="py-3 px-4">Desired Principle</th>
                      <th className="py-3 px-4">Loan Type</th>
                      <th className="py-3 px-4">APR</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Currency</th>
                      <th className="py-3 px-4">Borrower</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableLoans.map((loan) => (
                      <tr key={loan.id} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={loan.asset.image} alt="NFT" className="w-6 h-6 rounded" />
                          <span className="whitespace-nowrap">{loan.asset.display}</span>
                        </td>
                        <td className="py-3 px-4">{loan.principle}</td>
                        <td className="py-3 px-4">{loan.type}</td>
                        <td className="py-3 px-4">{loan.rate}</td>
                        <td className="py-3 px-4">{loan.duration}</td>
                        <td className="py-3 px-4">{loan.currency}</td>
                        <td className="py-3 px-4 text-purple-400 hover:underline cursor-pointer">
                          {loan.borrower}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === "card" && (
              <div className="grid md:grid-cols-2 gap-6">
                {availableLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img src={loan.asset.image} className="w-8 h-8 rounded" />
                      <div>
                        <div className="font-bold">{loan.asset.display}</div>
                        <div className="text-sm text-gray-400">Loan ID: {loan.id}</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Principle: {loan.principle} • Rate: {loan.rate} • Duration: {loan.duration}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Currency: {loan.currency} • Borrower:{" "}
                      <span className="text-purple-400 hover:underline cursor-pointer">
                        {loan.borrower}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Offer made on ${loan.id}`)}
                      className="bg-purple-600 mt-4 w-full hover:bg-purple-700 text-white py-2 px-4 rounded-full"
                    >
                      Offer Loan
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* My Loans */}
        {activeTab === "my-loans" && (
          <motion.div>
            {/* Active Loans */}
            <div className="mb-10">
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
                    <div className="text-sm text-gray-400">
                      Bored Ape #5678 • 10 ICP • 3 months
                    </div>
                  </div>
                  <div className="text-sm text-green-400 font-semibold">Repaid</div>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <div>
                    <div className="text-white font-medium">Loan #002</div>
                    <div className="text-sm text-gray-400">
                      Cool Cat #9012 • 8 ICP • 2 months
                    </div>
                  </div>
                  <div className="text-sm text-red-400 font-semibold">Liquidated</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Offers Sent */}
        {activeTab === "offers" && (
          <div className="grid md:grid-cols-2 gap-6">
            {offersSent.map((offer) => (
              <div
                key={offer.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={offer.asset.image} className="w-8 h-8 rounded" />
                  <div>
                    <div className="font-bold">{offer.asset.name}</div>
                    <div className="text-sm text-gray-400">Offer ID: {offer.id}</div>
                  </div>
                </div>
                <div className="text-gray-300 text-sm mb-2">
                  Amount: {offer.amount} {offer.currency} • Duration: {offer.duration}
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
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GiveLoanPage;
