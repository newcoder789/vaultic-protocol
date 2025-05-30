import ArrowRight from '@/assets/arrow-right.svg';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import MenuIcon from '@/assets/menu.svg';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm shadow-sm z-20">
      {/* Top Banner */}
      <div className="flex justify-center py-3 bg-black text-white text-sm gap-3">
        <p className='text-white/60 hidden md:block'>Streamline your workflow and boost your productivity</p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* Main Nav */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Image src={Logo} alt="logo" height={40} width={40} />

            {/* Menu Icon for Mobile */}
            <MenuIcon className="h-5 w-5 md:hidden" />

            {/* Nav Links (Hidden on small screens) */}
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Feature</a>
              <a href="#">Customer</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking -tight">
                Get for free
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
