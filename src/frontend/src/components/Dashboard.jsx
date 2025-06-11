import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";
import Header from "./Header2";
import Footer from "./Footer";

const dataLoans = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 600 },
  { month: "Mar", value: 800 },
  { month: "Apr", value: 200 },
  { month: "May", value: 1000 },
];

const pieData = [
  { name: "Loans Given", value: 300 },
  { name: "Loans Taken", value: 500 },
  { name: "Risk Buffer", value: 200 },
];

const COLORS = ["#a855f7", "#ec4899", "#8b5cf6"];

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#0e0e2c] via-[#1a1039] to-[#150622] p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1e1e3f] p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-purple-300">Wallet Balance</h2>
            <p className="text-2xl font-bold mt-2">ICP 2.796</p>
          </div>
          <div className="bg-[#1e1e3f] p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-pink-300">Total Loans Taken</h2>
            <p className="text-2xl font-bold mt-2">ICP 4.213</p>
          </div>
          <div className="bg-[#1e1e3f] p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-indigo-300">Total Loans Given</h2>
            <p className="text-2xl font-bold mt-2">ICP 3.126</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-[#1e1e3f] p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-200">Loan Activity Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataLoans}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f5e" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f1f3d", borderColor: "#8b5cf6" }} />
                <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 6 }} isAnimationActive={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#1e1e3f] p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-pink-200">Loan Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: "#fff" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1f1f3d", borderColor: "#ec4899" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1e3f] mt-12 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-200">Loan Stats by Type</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#a855f7" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1e1e3f] mt-12 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-200">Risk Engine Insights</h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-300">Credit Score:</span>
              <span className="text-white font-bold">782</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-300">Risk Level:</span>
              <span className="text-yellow-400 font-bold flex items-center gap-1">Low <span className="h-2 w-2 bg-yellow-400 rounded-full inline-block" /></span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-300">Liquidation Threshold:</span>
              <span className="text-white font-bold">78%</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-300">Default Probability:</span>
              <span className="text-red-400 font-bold">1.2%</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
