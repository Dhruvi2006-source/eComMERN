// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext.jsx";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/login", {
//         email,
//         password,
//       });

//       if (res.status === 200 && res.data.user) {
//         setUser(res.data.user);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         setMessage("✅ Login successful");
//         setEmail("");
//         setPassword("");
//         navigate("/");
//       } else {
//         setMessage("❌ Login failed: No user returned");
//       }
//     } catch (err) {
//       setMessage("❌ Login failed");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-indigo-100 px-4 pt-20">
//       <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-teal-600">Welcome Back</h2>
//           <p className="text-sm text-gray-500 mt-2">Login to your account</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition duration-200"
//           >
//             Sign In
//           </button>
//         </form>

//         {message && (
//           <div
//             className={`mt-4 text-sm text-center font-medium ${
//               message.includes("✅") ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <p className="mt-6 text-sm text-center text-gray-500">
//           Don’t have an account?{" "}
//           <a
//             href="/signup"
//             className="text-teal-600 font-semibold hover:underline"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("✅ Login successful");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/"), 800);
      } else {
        setMessage("❌ Login failed: No user returned");
      }
    } catch (err) {
      console.log(err);
      setMessage("❌ Login failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-indigo-100 px-4 pt-20 relative overflow-x-hidden">
      {/* Subtle animated aura backgrounds */}
      <motion.div
        className="absolute bg-gradient-radial from-indigo-300 via-indigo-100/30 to-transparent rounded-full blur-3xl"
        style={{
          width: 420,
          height: 320,
          top: "15%",
          left: "-18%",
          zIndex: 0,
          opacity: 0.47,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.39, 0.68, 0.41] }}
        transition={{ repeat: Infinity, duration: 7.6, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bg-gradient-radial from-teal-200 via-transparent to-transparent rounded-full blur-3xl"
        style={{
          width: 340,
          height: 240,
          bottom: "-5%",
          right: "-12%",
          zIndex: 0,
          opacity: 0.38,
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.28, 0.59, 0.39] }}
        transition={{
          repeat: Infinity,
          duration: 8.3,
          repeatType: "mirror",
          delay: 1.1,
        }}
      />

      {/* Main Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl max-w-md w-full p-8 md:p-10 border-t-2 border-indigo-100 transition-all duration-300 hover:shadow-indigo-200 relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 70, delay: 0.1 }}
      >
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-extrabold text-teal-600 tracking-tight"
            initial={{ letterSpacing: "0.09em" }}
            animate={{ letterSpacing: "0.01em" }}
            transition={{ duration: 1, type: "tween" }}
          >
            Welcome Back
          </motion.h2>
          <div className="text-sm text-gray-500 mt-2">
            Login to your account
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <motion.input
              type="email"
              placeholder="you@example.com"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{
                scale: 1.025,
                boxShadow: "0px 0px 0px 1.9px #14b8a6",
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <motion.input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                whileFocus={{
                  scale: 1.025,
                  boxShadow: "0px 0px 0px 1.9px #14b8a6",
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
              />
              {/* Password show/hide button */}
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition"
                tabIndex="-1"
              >
                {showPass ? (
                  // Eye off icon
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A9.947 9.947 0 0 1 12 20c-5 0-9-4-9-8 0-1.54.61-3.01 1.66-4.27m5.7-2.6A4 4 0 0 1 12 8c2.21 0 4 1.79 4 4a4.01 4.01 0 0 1-6.6 3.1" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <ellipse cx="12" cy="12" rx="9" ry="5.2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            whileHover={{
              scale: submitting ? 1 : 1.03,
              backgroundColor: "#14b8a6",
            }}
            disabled={submitting}
            className={`w-full bg-gradient-to-tr from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-bold py-2.5 rounded-xl shadow-md transition
              transform active:scale-98 text-lg
              ${
                submitting ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"
              }
            `}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white inline"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-30"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-80"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Animated login result message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 16, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.98 }}
              className={`mt-4 flex gap-2 items-center justify-center text-sm font-medium 
                ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
            >
              {message.includes("✅") ? (
                <svg
                  width={16}
                  height={16}
                  className="text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="11" stroke="currentColor" />
                  <path
                    d="M7 13l3 3 5-5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width={16}
                  height={16}
                  className="text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="11" stroke="currentColor" />
                  <path
                    d="M9 9l6 6M15 9l-6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signup link */}
        <div className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-teal-600 font-bold hover:underline transition"
          >
            Sign up
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
