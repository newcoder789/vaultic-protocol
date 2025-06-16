import React from "react";
import { FaWallet, FaArrowDown, FaArrowUp, FaStar } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white px-6 py-12 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 p-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Avatar & Info */}
          <div className="flex items-center gap-6">
            <img
              src="/img/Nfts/male1.jpg"
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-purple-400">Ayush Rawat</h2>
              <p className="text-gray-400 text-sm">ayushrawat4404@gmail.com</p>
              <span className="inline-block mt-2 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                🛡️ Verified Lender & Borrower
              </span>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="bg-black/40 border border-purple-900 rounded-2xl p-5 w-full md:w-[280px] shadow-inner text-sm">
            <p className="text-gray-400 mb-1">Wallet Address</p>
            <p className="break-all font-mono text-purple-300 text-sm">
              0xAbC1234567890DEF456EFG1234567890ABCDEF12
            </p>
            <div className="mt-4 flex items-center gap-2">
              <FaWallet className="text-purple-400" />
              <span className="text-white font-semibold">ICP Balance: 115.37</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-purple-950/40 p-5 rounded-xl border border-purple-800 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Loans Taken</p>
              <h3 className="text-xl font-bold text-purple-300">₹5,000</h3>
            </div>
            <FaArrowDown className="text-pink-500 text-2xl" />
          </div>

          <div className="bg-purple-950/40 p-5 rounded-xl border border-purple-800 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Loans Given</p>
              <h3 className="text-xl font-bold text-purple-300">₹12,000</h3>
            </div>
            <FaArrowUp className="text-green-400 text-2xl" />
          </div>

          <div className="bg-purple-950/40 p-5 rounded-xl border border-purple-800 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Reputation Score</p>
              <h3 className="text-xl font-bold text-purple-300">4.9 / 5</h3>
            </div>
            <FaStar className="text-yellow-400 text-2xl" />
          </div>
        </div>

        {/* Activity Logs */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">
            📜 Recent Activity
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="bg-gray-800/60 p-3 rounded-lg border border-purple-800">
              ➤ You offered a loan of ₹2,000 to <span className="text-purple-300">0xD2...456</span> — 2 days ago
            </li>
            <li className="bg-gray-800/60 p-3 rounded-lg border border-purple-800">
              ➤ Repaid a loan of ₹3,000 — 5 days ago
            </li>
            <li className="bg-gray-800/60 p-3 rounded-lg border border-purple-800">
              ➤ Updated profile picture — 1 week ago
            </li>
          </ul>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition px-8 py-2 rounded-full text-white font-semibold shadow-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
