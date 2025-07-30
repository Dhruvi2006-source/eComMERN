// // import { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";

// // function Navbar({ isSignedIn }) {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [isMounted, setIsMounted] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   const location = useLocation();

// //   useEffect(() => {
// //     setMobileOpen(false); // close menu on route change
// //   }, [location]);

// //   const menuItems = ["Cart", "Orders", "Products"];

// //   return (
// //     <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 mb-20">
// //       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// //         {/* Logo */}
// //         <Link
// //           to="/"
// //           className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-teal-600 transition relative overflow-hidden"
// //         >
// //           <span className="bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 bg-[length:200%_100%] bg-left-bottom animate-shimmer inline-block text-transparent bg-clip-text">
// //             YourStore
// //           </span>
// //         </Link>

// //         {/* Desktop Menu */}
// //         <ul className="hidden md:flex space-x-10 text-gray-700 font-semibold">
// //           {menuItems.map((item, index) => (
// //             <li
// //               key={item}
// //               className={`transform transition-opacity transition-transform duration-500 ease-out
// //         ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
// //               style={{
// //                 transitionDelay: `${index * 150}ms`,
// //               }}
// //             >
// //               <Link
// //                 to={`/${item.toLowerCase()}`}
// //                 className={`relative px-2 py-1 group ${
// //                   location.pathname === `/${item.toLowerCase()}`
// //                     ? "text-teal-600 font-bold"
// //                     : "text-gray-700"
// //                 }`}
// //               >
// //                 <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
// //                   {item}
// //                 </span>
// //                 <span
// //                   className="absolute bottom-0 left-0 w-0 h-0.5 rounded bg-teal-500 transition-all duration-300 group-hover:w-full"
// //                   style={{
// //                     width:
// //                       location.pathname === `/${item.toLowerCase()}`
// //                         ? "100%"
// //                         : "0",
// //                   }}
// //                 />
// //               </Link>
// //             </li>
// //           ))}

// //           {isSignedIn && (
// //             <li
// //               className={`transform transition-opacity transition-transform duration-500 ease-out
// //         ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
// //               style={{
// //                 transitionDelay: `${menuItems.length * 150}ms`,
// //               }}
// //             >
// //               <Link
// //                 to="/profile"
// //                 className={`relative px-2 py-1 group ${
// //                   location.pathname === "/profile"
// //                     ? "text-teal-600 font-bold"
// //                     : "text-gray-700"
// //                 }`}
// //               >
// //                 <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
// //                   Profile
// //                 </span>
// //                 <span
// //                   className="absolute bottom-0 left-0 w-0 h-0.5 rounded bg-teal-500 transition-all duration-300 group-hover:w-full"
// //                   style={{
// //                     width: location.pathname === "/profile" ? "100%" : "0",
// //                   }}
// //                 />
// //               </Link>
// //             </li>
// //           )}
// //         </ul>

// //         {/* Auth Buttons Desktop */}
// //         <div className="hidden md:flex space-x-5">
// //           {!isSignedIn && (
// //             <>
// //               <Link
// //                 to="/signup"
// //                 className="relative inline-block px-5 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
// //               >
// //                 Sign Up
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="relative inline-block px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
// //               >
// //                 Login
// //               </Link>
// //             </>
// //           )}
// //         </div>

// //         {/* Mobile Hamburger */}
// //         <button
// //           onClick={() => setMobileOpen(!mobileOpen)}
// //           className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none"
// //           aria-label="Toggle menu"
// //         >
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
// //               mobileOpen ? "rotate-45 translate-y-2" : ""
// //             }`}
// //           />
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transition-opacity duration-300 ${
// //               mobileOpen ? "opacity-0" : "opacity-100"
// //             }`}
// //           />
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
// //               mobileOpen ? "-rotate-45 -translate-y-2" : ""
// //             }`}
// //           />
// //         </button>
// //       </nav>

// //       {/* Mobile Menu */}
// //       <div
// //         className={`md:hidden fixed inset-x-0 top-16 bg-white bg-opacity-95 backdrop-blur-md text-gray-800 text-center py-8 space-y-6 shadow-lg transition-all duration-500 ease-in-out transform ${
// //           mobileOpen
// //             ? "translate-y-0 opacity-100 pointer-events-auto"
// //             : "-translate-y-10 opacity-0 pointer-events-none"
// //         }`}
// //         style={{ minHeight: "240px" }}
// //       >
// //         {menuItems.map((item, index) => (
// //           <Link
// //             key={item}
// //             to={`/${item.toLowerCase()}`}
// //             onClick={() => setMobileOpen(false)}
// //             className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
// //               location.pathname === `/${item.toLowerCase()}`
// //                 ? "underline decoration-teal-600"
// //                 : ""
// //             }`}
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen ? `${index * 100}ms` : "0ms",
// //             }}
// //           >
// //             {item}
// //           </Link>
// //         ))}

// //         {/* Profile Link */}
// //         {isSignedIn && (
// //           <Link
// //             to="/profile"
// //             onClick={() => setMobileOpen(false)}
// //             className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
// //               location.pathname === "/profile"
// //                 ? "underline decoration-teal-600"
// //                 : ""
// //             }`}
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen
// //                 ? `${menuItems.length * 100}ms`
// //                 : "0ms",
// //             }}
// //           >
// //             Profile
// //           </Link>
// //         )}

// //         {/* Auth Buttons */}
// //         {!isSignedIn && (
// //           <div
// //             className="flex justify-center space-x-6 pt-4"
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen
// //                 ? `${(menuItems.length + (isSignedIn ? 1 : 0)) * 100}ms`
// //                 : "0ms",
// //             }}
// //           >
// //             <Link
// //               to="/signup"
// //               onClick={() => setMobileOpen(false)}
// //               className="px-6 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-lg duration-300"
// //             >
// //               Sign Up
// //             </Link>
// //             <Link
// //               to="/login"
// //               onClick={() => setMobileOpen(false)}
// //               className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-lg duration-300"
// //             >
// //               Login
// //             </Link>
// //           </div>
// //         )}
// //       </div>

// //       {/* EXTRA ANIMATIONS */}
// //       <style>{`
// //         @keyframes shimmer {
// //           0% {
// //             background-position: 200% center;
// //           }
// //           100% {
// //             background-position: -200% center;
// //           }
// //         }
// //         .animate-shimmer {
// //           background-size: 200% 100%;
// //           animation: shimmer 3s linear infinite;
// //         }
// //       `}</style>
// //     </header>
// //   );
// // }

// // export default Navbar;
   












// // import React, { useState, useContext, useRef, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import { AuthContext } from "../AuthContext.jsx"; // Assuming you have AuthContext

// // function Navbar({ isSignedIn, user }) {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [isMounted, setIsMounted] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);

// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   const location = useLocation();

// //   useEffect(() => {
// //     setMobileOpen(false); // close menu on route change
// //     setDropdownOpen(false); // close dropdown on route change
// //   }, [location]);

// //   // Close dropdown if clicked outside
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (
// //         dropdownRef.current &&
// //         !dropdownRef.current.contains(event.target)
// //       ) {
// //         setDropdownOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   // Logout logic (you can also move this to separate component)
// //   const { setUser } = useContext(AuthContext);

// //   const handleLogout = async () => {
// //     try {
// //       // Call your backend logout API here if needed
// //       // await axios.post("/api/logout", { userId: user._id });

// //       // Clear user from context/localStorage
// //       setUser(null);
// //       setDropdownOpen(false);
// //     } catch (error) {
// //       console.log(error);
// //       alert("Logout failed, try again.");
// //     }
// //   };

// //   const menuItems = ["Cart", "Orders", "Products"];

// //   return (
// //     <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 mb-20">
// //       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// //         {/* Logo */}
// //         <Link
// //           to="/"
// //           className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-teal-600 transition relative overflow-hidden"
// //         >
// //           <span className="bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 bg-[length:200%_100%] bg-left-bottom animate-shimmer inline-block text-transparent bg-clip-text">
// //             YourStore
// //           </span>
// //         </Link>

// //         {/* Desktop Menu */}
// //         <ul className="hidden md:flex space-x-10 text-gray-700 font-semibold">
// //           {menuItems.map((item, index) => (
// //             <li
// //               key={item}
// //               className={`transform transition-opacity transition-transform duration-500 ease-out
// //                 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
// //               style={{ transitionDelay: `${index * 150}ms` }}
// //             >
// //               <Link
// //                 to={`/${item.toLowerCase()}`}
// //                 className={`relative px-2 py-1 group ${
// //                   location.pathname === `/${item.toLowerCase()}`
// //                     ? "text-teal-600 font-bold"
// //                     : "text-gray-700"
// //                 }`}
// //               >
// //                 <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
// //                   {item}
// //                 </span>
// //                 <span
// //                   className="absolute bottom-0 left-0 w-0 h-0.5 rounded bg-teal-500 transition-all duration-300 group-hover:w-full"
// //                   style={{
// //                     width:
// //                       location.pathname === `/${item.toLowerCase()}` ? "100%" : "0",
// //                   }}
// //                 />
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Auth Buttons Desktop */}
// //         <div className="hidden md:flex items-center space-x-5 relative">
// //           {!isSignedIn && (
// //             <>
// //               <Link
// //                 to="/signup"
// //                 className="relative inline-block px-5 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
// //               >
// //                 Sign Up
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="relative inline-block px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
// //               >
// //                 Login
// //               </Link>
// //             </>
// //           )}

// //           {isSignedIn && (
// //             <div ref={dropdownRef} className="relative">
// //               <button
// //                 onClick={() => setDropdownOpen((open) => !open)}
// //                 className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition shadow-md"
// //               >
// //                 <span>{user?.name || user?.email || "Profile"}</span>
// //                 <svg
// //                   className={`w-4 h-4 transition-transform duration-300 ${
// //                     dropdownOpen ? "rotate-180" : "rotate-0"
// //                   }`}
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="2"
// //                   viewBox="0 0 24 24"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
// //                 </svg>
// //               </button>

// //               {dropdownOpen && (
// //                 <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-3 z-50">
// //                   <div className="px-4 pb-3 border-b border-gray-100">
// //                     <p className="text-sm font-semibold text-gray-900">
// //                       {user?.name || user?.email}
// //                     </p>
// //                     <p className="text-xs text-gray-500 truncate">{user?.email}</p>
// //                   </div>
// //                   <button
// //                     onClick={handleLogout}
// //                     className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 font-semibold"
// //                   >
// //                     Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Mobile Hamburger */}
// //         <button
// //           onClick={() => setMobileOpen(!mobileOpen)}
// //           className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none"
// //           aria-label="Toggle menu"
// //         >
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
// //               mobileOpen ? "rotate-45 translate-y-2" : ""
// //             }`}
// //           />
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transition-opacity duration-300 ${
// //               mobileOpen ? "opacity-0" : "opacity-100"
// //             }`}
// //           />
// //           <span
// //             className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
// //               mobileOpen ? "-rotate-45 -translate-y-2" : ""
// //             }`}
// //           />
// //         </button>
// //       </nav>

// //       {/* Mobile Menu */}
// //       <div
// //         className={`md:hidden fixed inset-x-0 top-16 bg-white bg-opacity-95 backdrop-blur-md text-gray-800 text-center py-8 space-y-6 shadow-lg transition-all duration-500 ease-in-out transform ${
// //           mobileOpen
// //             ? "translate-y-0 opacity-100 pointer-events-auto"
// //             : "-translate-y-10 opacity-0 pointer-events-none"
// //         }`}
// //         style={{ minHeight: "240px" }}
// //       >
// //         {menuItems.map((item, index) => (
// //           <Link
// //             key={item}
// //             to={`/${item.toLowerCase()}`}
// //             onClick={() => setMobileOpen(false)}
// //             className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
// //               location.pathname === `/${item.toLowerCase()}`
// //                 ? "underline decoration-teal-600"
// //                 : ""
// //             }`}
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen ? `${index * 100}ms` : "0ms",
// //             }}
// //           >
// //             {item}
// //           </Link>
// //         ))}

// //         {isSignedIn && (
// //           <Link
// //             to="/profile"
// //             onClick={() => setMobileOpen(false)}
// //             className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
// //               location.pathname === "/profile"
// //                 ? "underline decoration-teal-600"
// //                 : ""
// //             }`}
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen
// //                 ? `${menuItems.length * 100}ms`
// //                 : "0ms",
// //             }}
// //           >
// //             Profile
// //           </Link>
// //         )}

// //         {!isSignedIn && (
// //           <div
// //             className="flex justify-center space-x-6 pt-4"
// //             style={{
// //               opacity: mobileOpen ? 1 : 0,
// //               transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
// //               transitionProperty: "opacity, transform",
// //               transitionDuration: "400ms",
// //               transitionTimingFunction: "ease-out",
// //               transitionDelay: mobileOpen
// //                 ? `${(menuItems.length + (isSignedIn ? 1 : 0)) * 100}ms`
// //                 : "0ms",
// //             }}
// //           >
// //             <Link
// //               to="/signup"
// //               onClick={() => setMobileOpen(false)}
// //               className="px-6 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-lg duration-300"
// //             >
// //               Sign Up
// //             </Link>
// //             <Link
// //               to="/login"
// //               onClick={() => setMobileOpen(false)}
// //               className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-lg duration-300"
// //             >
// //               Login
// //             </Link>
// //           </div>
// //         )}
// //       </div>

// //       {/* EXTRA ANIMATIONS */}
// //       <style>{`
// //         @keyframes shimmer {
// //           0% {
// //             background-position: 200% center;
// //           }
// //           100% {
// //             background-position: -200% center;
// //           }
// //         }
// //         .animate-shimmer {
// //           background-size: 200% 100%;
// //           animation: shimmer 3s linear infinite;
// //         }
// //       `}</style>
// //     </header>
// //   );
// // }

// // export default Navbar;











// import { useState, useRef, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext.jsx"; // Adjust import if needed

// function Navbar() {
//   const { user, setUser } = useContext(AuthContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     // Clear user context
//     setUser(null);
//     // Also clear localStorage or cookies if you have any
//     localStorage.removeItem("user");
//     setDropdownOpen(false);
//     // Redirect to home or login page
//     navigate("/login");
//   };

//   return (
//     <nav className="p-4 bg-gray-100 flex justify-between items-center max-w-7xl mx-auto">
//       <Link to="/" className="font-bold text-xl text-teal-600">
//         YourStore
//       </Link>

//       <div ref={dropdownRef} className="relative">
//         {user ? (
//           <>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
//             >
//               <span>{user.name || "Profile"}</span>
//               <svg
//                 className={`w-4 h-4 transform transition-transform ${
//                   dropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-4 text-gray-700 z-50">
//                 <p className="font-semibold">{user.name}</p>
//                 <p className="text-sm truncate">{user.email}</p>
//                 <button
//                   onClick={handleLogout}
//                   className="mt-3 w-full text-left text-red-600 hover:underline"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="space-x-4">
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 rounded-md border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
//             >
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;






































import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = ["Cart", "Orders", "Products"];

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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 mb-20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-teal-600 transition relative overflow-hidden"
        >
          <span className="bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 bg-[length:200%_100%] bg-left-bottom animate-shimmer inline-block text-transparent bg-clip-text">
            YourStore
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-gray-700 font-semibold">
          {menuItems.map((item, index) => (
            <li
              key={item}
              className={`transform transition-opacity transition-transform duration-500 ease-out
              ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <Link
                to={`/${item.toLowerCase()}`}
                className={`relative px-2 py-1 group ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "text-teal-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
                  {item}
                </span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 rounded bg-teal-500 transition-all duration-300 group-hover:w-full"
                  style={{
                    width:
                      location.pathname === `/${item.toLowerCase()}` ? "100%" : "0",
                  }}
                />
              </Link>
            </li>
          ))}

          {/* Profile Dropdown (Desktop) */}
          {user && (
            <li
              ref={dropdownRef}
              className={`relative transform transition-opacity transition-transform duration-500 ease-out
              ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: `${menuItems.length * 150}ms`,
              }}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative px-2 py-1 group flex items-center gap-1 text-gray-700 hover:text-teal-600 font-semibold"
              >
                <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
                  {user.name || "Profile"}
                </span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-30 w-48 h-20 bg-white border rounded-md shadow-lg p-4 text-gray-700 z-50">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm truncate">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full text-left text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </button>
            </li>
          )}
        </ul>

        {/* Auth Buttons Desktop (if not signed in) */}
        {!user && (
          <div className="hidden md:flex space-x-5">
            <Link
              to="/signup"
              className="relative inline-block px-5 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="relative inline-block px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-sm hover:shadow-lg duration-300"
            >
              Login
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-900 rounded transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-900 rounded transform transition duration-300 origin-left ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-white bg-opacity-95 backdrop-blur-md text-gray-800 text-center py-8 space-y-6 shadow-lg transition-all duration-500 ease-in-out transform ${
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ minHeight: "240px" }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
              location.pathname === `/${item.toLowerCase()}`
                ? "underline decoration-teal-600"
                : ""
            }`}
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "400ms",
              transitionTimingFunction: "ease-out",
              transitionDelay: mobileOpen ? `${index * 100}ms` : "0ms",
            }}
          >
            {item}
          </Link>
        ))}

        {/* Profile Link (Mobile) */}
        {user && (
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className={`block text-xl font-semibold hover:text-teal-600 transition transform hover:scale-110 duration-300 ${
              location.pathname === "/profile"
                ? "underline decoration-teal-600"
                : ""
            }`}
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "400ms",
              transitionTimingFunction: "ease-out",
              transitionDelay: mobileOpen
                ? `${menuItems.length * 100}ms`
                : "0ms",
            }}
          >
            Profile
          </Link>
        )}

        {/* Auth Buttons Mobile (if not signed in) */}
        {!user && (
          <div
            className="flex justify-center space-x-6 pt-4"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "400ms",
              transitionTimingFunction: "ease-out",
              transitionDelay: mobileOpen
                ? `${(menuItems.length + (user ? 1 : 0)) * 100}ms`
                : "0ms",
            }}
          >
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-2 rounded-full border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition transform hover:scale-105 shadow-lg duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition transform hover:scale-105 shadow-lg duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* EXTRA ANIMATIONS */}
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
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
