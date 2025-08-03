import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = ["Cart", "Orders"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false); // close mobile menu on route change
    setDropdownOpen(false); // close dropdown on route change
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-900/20 to-teal-900/20 backdrop-blur-2xl shadow-2xl z-50 border-b border-teal-300/30">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 flex items-center justify-between">
        {/* Animated Particle Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="particle"
            style={{ top: "10%", left: "10%", animationDelay: "0s" }}
          />
          <div
            className="particle"
            style={{ top: "20%", left: "80%", animationDelay: "1.5s" }}
          />
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300 relative animate-neon-glow"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            YourStore
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 lg:space-x-10 text-gray-200 font-semibold">
          {menuItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 10 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <Link
                to={`/${item.toLowerCase()}`}
                className={`relative px-3 py-2 group ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "text-teal-400 font-bold"
                    : "text-gray-200"
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.1, color: "#2DD4BF" }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.span>
                <span
                  className="absolute bottom-0 left-0 h-0.5 rounded bg-teal-500 transition-all duration-300 group-hover:w-full animate-neon-glow"
                  style={{
                    width:
                      location.pathname === `/${item.toLowerCase()}`
                        ? "100%"
                        : "0",
                  }}
                />
              </Link>
            </motion.li>
          ))}

          {/* Profile Dropdown (Desktop) */}
          {user && (
            <motion.li
              ref={dropdownRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 10 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.15 }}
              className="relative"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.3}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-200 hover:text-teal-400 font-semibold transition-all duration-300"
                >
                  <UserCircleIcon className="h-6 w-6 text-teal-400" />
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {user.name || "Profile"}
                  </motion.span>
                  <motion.svg
                    className={`w-4 h-4 transform ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
              </Tilt>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden fixed inset-x-0 top-16 bg-indigo-900 text-gray-200 text-center py-8 space-y-6 shadow-2xl border-b border-teal-300/30"
                >
                  <p className="font-semibold text-teal-300">{user.name}</p>
                  <p className="text-sm truncate text-gray-300">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full text-left text-red-400 hover:text-red-500 font-semibold hover:underline transition duration-300"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </motion.li>
          )}
        </ul>

        {/* Auth Buttons Desktop (if not signed in) */}
        {!user && (
          <div className="hidden md:flex space-x-4">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.3}
            >
              <Link
                to="/signup"
                className="relative px-5 py-2 rounded-full border-2 border-teal-400 text-teal-400 font-semibold hover:bg-teal-500/20 hover:border-teal-500 transition-all duration-300 animate-neon-glow group overflow-hidden"
              >
                <span className="absolute inset-0 bg-teal-500/30 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  Sign Up
                </motion.span>
              </Link>
            </Tilt>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.3}
            >
              <Link
                to="/login"
                className="relative px-5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-indigo-700 text-white font-semibold hover:from-teal-700 hover:to-indigo-800 transition-all duration-300 animate-pulse group overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  Login
                </motion.span>
              </Link>
            </Tilt>
          </div>
        )}

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-between w-8 h-8 focus:outline-none relative"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className={`block h-1 w-full bg-teal-400 rounded transition-all duration-300 origin-left ${
              mobileOpen ? "rotate-45 translate-y-3" : ""
            }`}
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 12 : 0 }}
          />
          <motion.span
            className={`block h-1 w-full bg-teal-400 rounded transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className={`block h-1 w-full bg-teal-400 rounded transition-all duration-300 origin-left ${
              mobileOpen ? "-rotate-45 -translate-y-3" : ""
            }`}
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -12 : 0 }}
          />
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className={`md:hidden fixed inset-x-0 top-16 bg-indigo-900/20 backdrop-blur-2xl text-gray-200 text-center py-8 space-y-6 shadow-2xl border-b border-teal-300/30 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ minHeight: "240px" }}
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 20 }}
            transition={{ duration: 0.4, delay: mobileOpen ? index * 0.1 : 0 }}
          >
            <Link
              to={`/${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`block text-xl font-semibold hover:text-teal-400 transition transform hover:scale-105 duration-300 ${
                location.pathname === `/${item.toLowerCase()}`
                  ? "text-teal-400 underline decoration-teal-400"
                  : ""
              }`}
            >
              {item}
            </Link>
          </motion.div>
        ))}

        {/* Profile Dropdown (Mobile) */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 20 }}
            transition={{
              duration: 0.4,
              delay: mobileOpen ? menuItems.length * 0.1 : 0,
            }}
            className="text-center space-y-2"
          >
            <div className="flex flex-col items-center space-y-1">
              <UserCircleIcon className="h-10 w-10 text-teal-400" />
              <p className="font-semibold text-teal-300">{user.name}</p>
              <p className="text-sm truncate text-gray-300">{user.email}</p>
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="mt-2 text-red-400 hover:text-red-500 font-semibold hover:underline transition duration-300"
            >
              Logout
            </button>
          </motion.div>
        )}

        {/* Auth Buttons Mobile (if not signed in) */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 20 }}
            transition={{
              duration: 0.4,
              delay: mobileOpen ? (menuItems.length + (user ? 1 : 0)) * 0.1 : 0,
            }}
            className="flex justify-center space-x-6 pt-4"
          >
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="relative px-6 py-2 rounded-full border-2 border-teal-400 text-teal-400 font-semibold hover:bg-teal-500/20 hover:border-teal-500 transition-all duration-300 animate-neon-glow group overflow-hidden"
            >
              <span className="absolute inset-0 bg-teal-500/30 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
              <span className="relative">Sign Up</span>
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="relative px-6 py-2 rounded-full bg-gradient-to-r from-teal-600 to-indigo-700 text-white font-semibold hover:from-teal-700 hover:to-indigo-800 transition-all duration-300 animate-pulse group overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
              <span className="relative">Login</span>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* CSS for Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
