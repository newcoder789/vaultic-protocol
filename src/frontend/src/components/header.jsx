import 'boxicons/css/boxicons.min.css'
import { useState } from 'react';

import { IdentityKitProvider, ConnectWallet } from "@nfid/identitykit/react";
// import "@nfid/identitykit/react/styles.css"
import { IdentityKitAuthType } from "@nfid/identitykit";
// import { useIdentity } from "@nfid/identitykit";


// import canisterIds from '../../../../.dfx/local/canisters';

import {
    ConnectWalletButton,
    ConnectedWalletButton,
    ConnectWalletDropdownMenu,
} from "@nfid/identitykit/react"


const Header = () => {
    const [isConnected, setIsConnected] = useState(false);
    //toggling
    const toggleMobileMenu = () => {
        const menu = document.getElementById("MobileMenu");
        menu.classList.toggle("hidden");
    };
    console.log("Header rendered");

    // const { identity, isAuthenticated } = useIdentity();

    // Manual connect handler for testing
    const handleManualConnect = () => {
        console.log("Manual connect button clicked");
        // Add any manual connect logic here if possible
        alert("Manual connect button clicked - implement connection logic");
    };

  return (
      <header className="relative z-20 flex justify-between items-center py-4 px-4 lg:px-20">

            <h1 data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500" className="text-2xl md:text-4xl lg:text-3xl font-light m-0">
            <img className='absolute top-0 left-0 opacity-60 -z-10 h-17 w-12 mt-5 ml-6' src='/logo.jpg' alt='logo'/>
                VAULTIC PROTOCOL
            </h1>
            {/*Destop nav */}
            <nav className="hidden md:flex items-center gap-12">
                <a data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000" className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    COMPANY
                </a>
                <a data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500" className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    FEATURES
                </a>
                <a data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="2000" className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    RESOURCES
                </a>
                <a data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="2500" className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    DOCS
                </a>
            </nav>  
                {/* CONNECT WALLET */}
                <ConnectWallet
                    className = "cursor-pointer"
                    onConnect={() => console.log("Wallet connected")}
                    onDisconnect={() => console.log("Wallet disconnected")}
                    onError={(error) => console.error("ConnectWallet error:", error)}
                />
        <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50'>
                <i className='bx bx-menu text-black'></i>
            </button>
            {/* sidebar */}
            <div id ='MobileMenu'className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md'>
                <nav className='flex flex-col gap-6 items-center'>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    COMPANY
                    </a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    FEATURES
                    </a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    RESOURCES
                    </a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                    DOCS
                    </a> 
                </nav>
            </div>

        </header>
  )
}

export default Header
