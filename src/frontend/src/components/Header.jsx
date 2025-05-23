import 'boxicons/css/boxicons.min.css'

const Header = () => {
    //toggling
    const toggleMobileMenu=()=>{
        //get menu
        const MobileMenu =document.getElementById('MobileMenu')
        //if hidden
        if(MobileMenu.classList.contains('hidden')){
            MobileMenu.classList.remove('hidden');
        }else { MobileMenu.classList.add('hidden');

        }

    }
  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
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
            data-aos-duration="1000"className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                COMPANY
            </a>
            <a data-aos="fade-down"
             data-aos-easing="linear"
             data-aos-duration="1500"className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                FEATURES
            </a>
            <a data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="2000"className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                RESOURCES
            </a>
            <a data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="2500"className="text-base tracking-wider transition-colors hover:text-gray-300 x-50 " href="#">
                DOCS
            </a>
        </nav>
        <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
            CONNECT WALLET
        </button>
        {/*mobile menu */}
       <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50'>
            <i class='bx bx-menu'></i>
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
