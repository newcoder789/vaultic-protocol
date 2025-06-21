import React from "react";
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaStar,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

const Profile = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("0xAbC1234567890DEF456EFG1234567890ABCDEF12");
    alert("Wallet address copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white px-6 py-12 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Avatar + Info */}
          <div className="flex items-center gap-6">
            <img
              src="/img/Nfts/male1.jpg"
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-purple-400">Ayush Rawat</h2>
              <p className="text-gray-400 text-sm">ayushrawat4404@gmail.com</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  🛡️ Verified Lender & Borrower
                </span>
                <span className="bg-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ✅ KYC Approved
                </span>
              </div>
            </div>
          </div>

          {/* Wallet Box */}
          <div className="bg-black/40 border border-purple-900 rounded-2xl p-5 w-full md:w-[300px] shadow-inner text-sm">
            <p className="text-gray-400 mb-1">Wallet Address</p>
            <div className="flex items-center justify-between gap-2">
              <p className="break-all font-mono text-purple-300 text-xs">
                0xAbC1234567890DEF456EFG1234567890ABCDEF12
              </p>
              <FaCopy
                onClick={handleCopy}
                className="text-purple-400 hover:text-purple-200 cursor-pointer"
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <FaWallet className="text-purple-400" />
              <span className="text-white font-semibold">ICP Balance: 115.37</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <StatCard label="Total Loans Taken" value="₹5,000" icon={<FaArrowDown />} color="text-pink-500" />
          <StatCard label="Total Loans Given" value="₹12,000" icon={<FaArrowUp />} color="text-green-400" />
          <StatCard label="Reputation Score" value="4.9 / 5" icon={<FaStar />} color="text-yellow-400" />
          <StatCard label="Trust Level" value="Gold Tier" icon={<FaCheckCircle />} color="text-blue-400" />
        </div>

        {/* Activity Logs */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">📜 Recent Activity</h3>
          <ul className="space-y-3 text-sm">
            <ActivityItem text="You offered a loan of ₹2,000 to" address="0xD2...456" time="2 days ago" />
            <ActivityItem text="Repaid a loan of ₹3,000" time="5 days ago" />
            <ActivityItem text="Updated profile picture" time="1 week ago" />
          </ul>
        </div>

        {/* NFT Holdings Placeholder */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">🎨 Your NFTs</h3>
          <div className="text-gray-400 text-sm bg-gray-800/50 p-5 rounded-xl border border-purple-800">
            NFT holdings will appear here once connected.
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition px-8 py-2 rounded-full text-white font-semibold shadow-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Stat Card Component ---
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-purple-950/40 p-5 rounded-xl border border-purple-800 shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-xl font-bold text-purple-300">{value}</h3>
    </div>
    <div className={`text-2xl ${color}`}>{icon}</div>
  </div>
);

// --- Reusable Activity Item ---
const ActivityItem = ({ text, address, time }) => (
  <li className="bg-gray-800/60 p-3 rounded-lg border border-purple-800">
    ➤ {text}
    {address && <span className="text-purple-300 mx-1">{address}</span>} — {time}
  </li>
);

export default Profile;
