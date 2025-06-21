import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  return (
    <motion.header
      ref={headerRef}
      className="flex justify-between items-center py-4 px-4 lg:px-20 bg-transparent relative z-50"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {/* Logo */}
      <motion.h1
        className="flex items-center gap-2 text-2xl md:text-3xl opacity-60 m-0 text-white"
        variants={navVariants}
      >
        <motion.img
          className="h-10 w-10 md:h-8 md:w-8 object-contain"
          src="/logo.png"
          alt="Logo"
          variants={navVariants}
        />
        VAULTIC PROTOCOL
      </motion.h1>

      {/* Desktop Nav */}
      <motion.nav className="hidden md:flex items-center gap-8" variants={navVariants}>
        {[
          { name: "Get a loan", path: "/loan" },
          { name: "Give a loan", path: "/lend" },
          { name: "Active Loans", path: "/active-loans" },
          { name: "Dashboard", path: "/dashboard" },
        ].map(({ name, path }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className="text-base text-white hover:text-gray-300" to={path}>
              {name}
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Right Side: Wallet + Profile */}
      <div className="flex items-center gap-4 relative z-50">
        <motion.button
          className="hidden md:block bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/loan-lend")}
        >
          CONNECT WALLET
        </motion.button>

        {/* Profile Icon */}
        <motion.div
          className="relative cursor-pointer"
          onClick={toggleProfile}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bx bx-user-circle text-white text-3xl" />
          {/* Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 text-black"
                >
                  <p className="font-semibold">Ayush Rawat</p>
                  <p className="text-sm text-gray-600">ayushrawat4404@gmail.com</p>
                  <hr className="my-2" />
                  <ul className="space-y-2 text-sm">
                    <li>
                      <button
                        onClick={() => alert("Go to Profile")}
                        className="hover:underline text-black w-full text-left"
                      >
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Go to Settings")}
                        className="hover:underline text-black w-full text-left"
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Go to Notifications")}
                        className="hover:underline text-black w-full text-left"
                      >
                        Notifications
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Help & Support")}
                        className="hover:underline text-black w-full text-left"
                      >
                        Help & Support
                      </button>
                    </li>
                    <li>
                      <hr className="my-2" />
                      <button
                        onClick={() => alert("Logged out")}
                        className="text-red-500 hover:underline w-full text-left"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>

        {/* Hamburger (Mobile) */}
        <motion.button
          onClick={toggleMobileMenu}
          className="md:hidden text-3xl text-white"
          aria-label="Menu"
        >
          <i className={`bx ${isMobileMenuOpen ? "bx-x" : "bx-menu"}`}></i>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden bg-black bg-opacity-80 backdrop-blur-lg z-40"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
          >
            <nav className="flex flex-col items-center gap-6 text-white">
              {["Get a loan", "Give a loan", "Dashboard"].map((item, i) => (
                <a key={i} href="#" className="text-lg">
                  {item}
                </a>
              ))}
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-500 py-2 px-6 rounded-full text-white"
                onClick={() => {
                  toggleMobileMenu();
                  navigate("/loan-lend");
                }}
              >
                CONNECT WALLET
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
