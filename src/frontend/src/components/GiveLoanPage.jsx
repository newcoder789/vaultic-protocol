import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaListUl, FaThLarge } from "react-icons/fa";
// Import dip721_nft_container actor
import { createActor, canisterId as dip721CanisterId } from "../../../declarations/dip721_nft_container";

const GiveLoanPage = () => {
  const [availableLoans, setAvailableLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("new-loan");
  const [viewMode, setViewMode] = useState("list");
  const [offersSent, setOffersSent] = useState([]); // Placeholder for future real data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const host =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:4943"
            : "https://ic0.app";
        const actor = createActor(dip721CanisterId, { agentOptions: { host } });
        // Get total supply to enumerate tokenIds
        const totalSupply = await actor.totalSupply();
        const loans = [];
        for (let i = 0n; i < totalSupply; i++) {
          try {
            const res = await actor.getLoan(i);
            if (res && "Ok" in res) {
              const loan = res.Ok;
              // Only show loans that are active or have ever existed
              if (loan.amount > 0n) {
                loans.push({ ...loan, id: loan.tokenId });
              }
            }
          } catch (e) {
            // Ignore missing/invalid loans
          }
        }
        if (isMounted) setAvailableLoans(loans);
      } catch (err) {
        if (isMounted)
          setError("Failed to fetch loans: " + (err.message || err));
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLoans();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper: Format principal
  const formatPrincipal = (p) => {
    if (!p || typeof p !== "object" || !p.toText) return String(p);
    try {
      return p.toText();
    } catch {
      return String(p);
    }
  };

  // Helper: Format ICP (amount is bigint)
  const formatICP = (amount) => {
    if (typeof amount === "bigint") return amount.toString();
    return String(amount);
  };

  // Helper: Format duration (seconds to days)
  const formatDuration = (duration) => {
    if (typeof duration === "bigint" || typeof duration === "number") {
      const days = Number(duration) / (24 * 60 * 60);
      if (days >= 1) return days.toFixed(1) + " days";
      const hours = Number(duration) / (60 * 60);
      if (hours >= 1) return hours.toFixed(1) + " hrs";
      return Number(duration).toLocaleString() + " s";
    }
    return String(duration);
  };

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
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  <FaListUl />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded ${
                    viewMode === "card" ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  <FaThLarge />
                </button>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-10 text-purple-300">
                Loading loans...
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-400">{error}</div>
            ) : availableLoans.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No loans available.
              </div>
            ) : viewMode === "list" ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4">Loan ID</th>
                      <th className="py-3 px-4">Token ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Interest Rate (bps)</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Lender</th>
                      <th className="py-3 px-4">Borrower</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableLoans.map((loan) => (
                      <tr
                        key={loan.id.toString()}
                        className="border-b border-gray-800 hover:bg-gray-800"
                      >
                        <td className="py-3 px-4">{loan.id.toString()}</td>
                        <td className="py-3 px-4">{loan.tokenId.toString()}</td>
                        <td className="py-3 px-4">{formatICP(loan.amount)}</td>
                        <td className="py-3 px-4">
                          {formatICP(loan.interestRate)}
                        </td>
                        <td className="py-3 px-4">{formatDuration(loan.duration)}</td>
                        <td className="py-3 px-4">{formatPrincipal(loan.lender)}</td>
                        <td className="py-3 px-4">{formatPrincipal(loan.borrower)}</td>
                        <td className="py-3 px-4">
                          {loan.isActive
                            ? "Active"
                            : loan.isRepaid
                            ? "Repaid"
                            : loan.isLiquidated
                            ? "Liquidated"
                            : "Unknown"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {availableLoans.map((loan) => (
                  <div
                    key={loan.id.toString()}
                    className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition"
                  >
                    <div className="mb-2 text-purple-300 text-xs">
                      Loan ID: {loan.id.toString()}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Token ID: {loan.tokenId.toString()}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Amount: {formatICP(loan.amount)} ICP
                      <br />
                      Interest Rate: {formatICP(loan.interestRate)} bps
                      <br />
                      Duration: {formatDuration(loan.duration)}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Lender: {formatPrincipal(loan.lender)}
                      <br />
                      Borrower: {formatPrincipal(loan.borrower)}
                    </div>
                    <div className="text-gray-400 text-xs mb-2">
                      Status:{" "}
                      {loan.isActive
                        ? "Active"
                        : loan.isRepaid
                        ? "Repaid"
                        : loan.isLiquidated
                        ? "Liquidated"
                        : "Unknown"}
                    </div>
                    <button
                      onClick={() =>
                        alert(`Offer made on loan ${loan.id.toString()}`)
                      }
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
            {/* TODO: Replace with real canister data for user's loans */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">Active Loans</h2>
              <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300">
                No active loans to display.
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Past Loans</h2>
              <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300">
                No past loans to display.
              </div>
            </div>
          </motion.div>
        )}
        {/* Offers Sent */}
        {activeTab === "offers" && (
          <div className="bg-gray-900 p-5 rounded-lg shadow-md text-gray-300 text-center">
            Offers sent feature coming soon.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GiveLoanPage;
