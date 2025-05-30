import achmeLogo from '@/assets/logo-acme.png';
import quantumLogo from '@/assets/logo-quantum.png';
import celestialLogo from '@/assets/logo-celestial.png';
import pulseLogo from '@/assets/logo-pulse.png';
import apexLogo from '@/assets/logo-apex.png';
import Image from 'next/image';
export const LogoTicker = () => {
  return<div>
   <div className='container'>
    <div>
      <Image src={achmeLogo} alt='Acme Logo'/>
      <Image src={quantumLogo} alt='Quantum Logo'/>
      <Image src={celestialLogo} alt='Celestial Logo'/>
      <Image src={pulseLogo} alt='pulse Logo'/>
      <Image src={apexLogo} alt='Apex Logo'/>
    </div>

    </div>
   </div> ;
};
