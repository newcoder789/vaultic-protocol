// TokenRewards.jsx
import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const rewards = [
  {
    title: "💎 Staking Rewards",
    desc: "Stake your $VAULT to earn passive returns and help secure the Vaultic ecosystem.",
  },
  {
    title: "🌊 Liquidity Mining",
    desc: "Provide liquidity to Vaultic pools and receive token incentives in return.",
  },
  {
    title: "🎁 Community Airdrops",
    desc: "Participate in governance, complete quests, or hold NFTs to qualify for periodic airdrops.",
  },
];

const TokenRewards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-purple-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 px-6 lg:px-20 py-16 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          Token Rewards
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400 mb-12 text-center max-w-2xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          Earn rewards through staking, liquidity mining, or airdrops as part of our token distribution strategy. Support the protocol and benefit from your participation.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-3">
          {rewards.map((reward, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-purple-500/30"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">{reward.title}</h3>
              <p className="text-gray-300 text-sm">{reward.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TokenRewards;
