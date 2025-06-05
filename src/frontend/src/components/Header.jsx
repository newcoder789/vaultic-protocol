import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 30px rgba(147, 51, 234, 0.8)", // Stronger purple glow on hover
    background: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect on hover
  },
  tap: { scale: 0.95 },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });
  const navigate = useNavigate(); // Add useNavigate hook

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

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
      {/* Logo and Title */}
      <motion.h1
        className="flex items-center gap-2 text-2xl md:text-3xl opacity-60 m-0 text-white"
        variants={navVariants}
      >
        <motion.img
          className="h-10 w-10 md:h-8 md:w-8 object-contain"
          src="/logo.png"
          alt="Vaultic Protocol Logo"
          variants={logoVariants}
          whileHover={{ opacity: 0.8, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        VAULTIC PROTOCOL
      </motion.h1>

      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex items-center gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {["COMPANY", "FEATURES", "RESOURCES", "DOCS"].map((item, index) => (
          <motion.a
            key={item}
            className="text-base tracking-wider text-white transition-colors hover:text-gray-300 z-50"
            href="#"
            variants={navVariants}
            whileHover={{ scale: 1.1, color: "#d1d5db" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>

      {/* Connect Wallet Button */}
      <motion.button
        className="hidden md:block relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-8 rounded-full border-2 border-purple-300/50 font-medium backdrop-blur-sm bg-opacity-30 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] z-50"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onTap={() => navigate("/loan-lend")} // Navigate to /loan-lend
      >
        CONNECT WALLET
      </motion.button>

      {/* Mobile Menu Toggle */}
      <motion.button
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 z-50 text-white"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className={`bx ${isMobileMenuOpen ? "bx-x" : "bx-menu"}`}></i>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="MobileMenu"
            className="fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <motion.nav
              className="flex flex-col gap-6 items-center"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {["COMPANY", "FEATURES", "RESOURCES", "DOCS"].map((item) => (
                <motion.a
                  key={item}
                  className="text-base tracking-wider text-white transition-colors hover:text-gray-300 z-50"
                  href="#"
                  variants={navVariants}
                  whileHover={{ scale: 1.1, color: "#d1d5db" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMobileMenu}
                >
                  {item}
                </motion.a>
              ))}
              {/* Connect Wallet in Mobile Menu */}
              <motion.button
                className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-8 rounded-full border-2 border-purple-300/50 font-medium backdrop-blur-sm bg-opacity-30 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] z-50"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onTap={() => {
                  navigate("/loan-lend");
                  toggleMobileMenu(); // Close menu after navigation
                }}
              >
                CONNECT WALLET
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
