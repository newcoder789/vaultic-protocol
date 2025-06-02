import achmeLogo from '@/assets/logo-acme.png';
import quantumLogo from '@/assets/logo-quantum.png';
import celestialLogo from '@/assets/logo-celestial.png';
import pulseLogo from '@/assets/logo-pulse.png';
import apexLogo from '@/assets/logo-apex.png';
import Image from 'next/image';
export const LogoTicker = () => {
  return<div className='py-8 md:p-12 bg-white'>
   <div className='container'>
    <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
    <div className='flex gap-14 flex-none'>
      <Image src={achmeLogo} alt='Acme Logo'className='logo-ticker-image'/>
      <Image src={quantumLogo} alt='Quantum Logo' className='logo-ticker-image'/>
      <Image src={celestialLogo} alt='Celestial Logo'className='logo-ticker-image'/>
      <Image src={pulseLogo} alt='pulse Logo'className='logo-ticker-image'/>
      <Image src={apexLogo} alt='Apex Logo'className='logo-ticker-image'/>
    </div>
    </div>
    </div>
   </div> ;
};
