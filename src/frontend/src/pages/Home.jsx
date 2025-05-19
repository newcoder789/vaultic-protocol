import React from "react";
import LoanOfferCard from "../components/LoanOfferCard";

const Home = () => {
    return (
        <div className="p-6 flex flex-wrap gap-6 justify-center">
            <LoanOfferCard
                nftName="CyberPunk Cat #1203"
                loanAmount="15"
                interestRate="5"
                duration="30"
                imageUrl="https://via.placeholder.com/300x200.png?text=NFT"
            />
        </div>
    );
};

export default Home;
