import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, SignUpButton, SignInButton } from "@clerk/clerk-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500
            bg-clip-text text-transparent animate-shimmer cursor-pointer select-none"
          aria-label="MyStore Home"
        >
          YourStore
        </Link>

        {/* NAV LINKS DESKTOP */}
        <div className="hidden md:flex space-x-8 lg:space-x-12 font-semibold text-gray-700 text-sm sm:text-base md:text-lg">
          {["Cart", "Orders", "Products"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative group px-2 py-2 cursor-pointer text-gray-700 hover:text-indigo-600 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 rounded-md"
            >
              {item}
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500
                  rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"
              />
            </Link>
          ))}

          {isSignedIn && (
            <Link
              to="/profile"
              className="relative group px-2 py-2 cursor-pointer text-gray-700 hover:text-indigo-600 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 rounded-md"
            >
              Profile
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500
                  rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"
              />
            </Link>
          )}
        </div>

        {/* AUTH BUTTONS DESKTOP */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 text-sm sm:text-base md:text-lg">
          {!isSignedIn && (
            <>
              <SignUpButton mode="redirect" asChild>
                <button
                  className="relative px-5 sm:px-6 py-2 font-semibold text-indigo-600 border-2 border-indigo-600 rounded-full
                  overflow-hidden group focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
                  <span
                    className="absolute -left-20 top-0 w-12 h-full bg-white opacity-30 rounded-full
                    transform -skew-x-12 animate-shine pointer-events-none"
                  ></span>
                </button>
              </SignUpButton>

              <SignInButton mode="redirect" asChild>
                <button
                  className="relative px-5 sm:px-6 py-2 font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600
                  rounded-full overflow-hidden group focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <span className="relative z-10">Login</span>
                  <span
                    className="absolute -left-20 top-0 w-12 h-full bg-white opacity-30 rounded-full
                    transform -skew-x-12 animate-shine pointer-events-none"
                  ></span>
                </button>
              </SignInButton>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden relative w-8 h-8 flex flex-col justify-between items-center focus:outline-none"
        >
          <span
            className={`block h-1 w-full rounded-full bg-indigo-700 transform transition duration-300 ease-in-out
              ${isMobileMenuOpen ? "rotate-45 translate-y-3" : ""}`}
          />
          <span
            className={`block h-1 w-full rounded-full bg-indigo-700 transition-opacity duration-300 ease-in-out
              ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-1 w-full rounded-full bg-indigo-700 transform transition duration-300 ease-in-out
              ${isMobileMenuOpen ? "-rotate-45 -translate-y-3" : ""}`}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white/70 backdrop-blur-lg border-t border-white/30 overflow-hidden
          transition-[max-height,opacity,transform] duration-500 ease-in-out
          ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
      >
        <nav className="flex flex-col px-6 py-6 space-y-6 font-semibold text-indigo-700 text-base sm:text-lg">
          {["Cart", "Orders", "Products"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            >
              {item}
            </Link>
          ))}

          {isSignedIn && (
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            >
              Profile
            </Link>
          )}

          <div className="pt-4 border-t border-indigo-300 space-y-4">
            {!isSignedIn && (
              <>
                <SignUpButton mode="redirect" asChild>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center rounded-full py-3 font-semibold text-indigo-600 border-2 border-indigo-600
                      hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-600 hover:to-indigo-500 transition-colors duration-400"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
                <SignInButton mode="redirect" asChild>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center rounded-full py-3 font-semibold text-white
                      bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600
                      hover:from-pink-600 hover:via-indigo-700 hover:to-indigo-600 transition-colors duration-400"
                  >
                    Login
                  </button>
                </SignInButton>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* EXTRA ANIMATIONS CSS */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .animate-shimmer {
          background-size: 400% 100%;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-20deg);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 2.5s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
