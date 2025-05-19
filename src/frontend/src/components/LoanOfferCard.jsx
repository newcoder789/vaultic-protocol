import React from "react";

const LoanOfferCard = ({ nftName, loanAmount, interestRate, duration, imageUrl }) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md max-w-xs">
            <img src={imageUrl} alt={nftName} className="rounded-lg w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold mt-2">{nftName}</h3>
            <p>💰 Loan: {loanAmount} ICP</p>
            <p>📈 Interest: {interestRate}%</p>
            <p>⏳ Duration: {duration} days</p>
            <button className="mt-3 w-full bg-indigo-600 text-white rounded-xl px-4 py-2">
                Accept Offer
            </button>
        </div>
    );
};

export default LoanOfferCard;
