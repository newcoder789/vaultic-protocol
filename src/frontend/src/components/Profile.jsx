import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/img/avatar.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-pink-500"
          />
          <h2 className="text-2xl font-bold">Ayush Rawat</h2>
          <p className="text-gray-400">ayushrawat4404@gmail.com</p>

          <div className="w-full text-left mt-6 space-y-2">
            <div className="bg-gray-700 p-3 rounded-md">
              <p className="text-sm text-gray-400">Wallet Address:</p>
              <p className="text-sm break-words">0xAbC123...456EfG</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <p className="text-sm text-gray-400">Total Loans Taken:</p>
              <p className="text-sm">₹5,000</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <p className="text-sm text-gray-400">Total Loans Given:</p>
              <p className="text-sm">₹12,000</p>
            </div>
          </div>

          <button className="mt-6 bg-pink-600 hover:bg-pink-700 transition px-6 py-2 rounded-full text-white font-semibold">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
