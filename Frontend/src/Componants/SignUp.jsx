// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) setMessage("✅ Signup successful! You can now login.");
//       else setMessage(data.error || "❌ Signup failed");
//     } catch (error) {
//       setMessage("❌ Network error");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-100 flex items-center justify-center px-4 pt-20">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-indigo-600 tracking-tight">
//             Create your account
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Start your journey with us. It only takes a minute.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               name="name"
//               type="text"
//               placeholder="John Doe"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email address
//             </label>
//             <input
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               placeholder="••••••••"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-[1.02]"
//           >
//             Create Account
//           </button>
//         </form>

//         {message && (
//           <div
//             className={`mt-4 text-center text-sm font-medium ${
//               message.includes("✅") ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }













import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setMessage("✅ Signup successful! You can now login.");
      else setMessage(data.error || "❌ Signup failed");
    } catch (error) {
      setMessage("❌ Network error");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-teal-50 to-indigo-200 flex items-center justify-center px-4 pt-20 relative overflow-x-hidden">
      {/* Subtle animated background aura */}
      <motion.div
        className="absolute bg-gradient-radial from-indigo-300 via-indigo-100/40 to-transparent rounded-full blur-3xl"
        style={{
          width: 500, height: 400, top: "10%", left: "-12%", zIndex: 0, opacity: 0.5,
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.49, 0.7, 0.44] }}
        transition={{ repeat: Infinity, duration: 8, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bg-gradient-radial from-teal-200 via-transparent to-transparent rounded-full blur-3xl"
        style={{
          width: 350, height: 260, bottom: "-6%", right: "-10%", zIndex: 0, opacity: 0.42,
        }}
        animate={{ scale: [1, 1.03, 1], opacity: [0.38, 0.62, 0.36] }}
        transition={{ repeat: Infinity, duration: 7.5, repeatType: "mirror", delay: 1.2 }}
      />
      {/* Main Card */}
      <motion.div
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-400 border-t-2 border-indigo-100 hover:shadow-indigo-200 relative z-10"
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 68, delay: 0.1 }}
      >
        <div className="text-center mb-7">
          <motion.h2
            className="text-3xl font-black text-indigo-600 tracking-tight"
            initial={{ letterSpacing: "0.08em" }}
            animate={{ letterSpacing: "0.01em" }}
            transition={{ duration: 1.35, type: "tween" }}
          >
            Create your account
          </motion.h2>
          <div className="text-sm text-gray-500 mt-1">
            Start your journey with us. It only takes a minute.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <motion.input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #818cf8" }}
              className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <motion.input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #818cf8" }}
              className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <motion.input
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #818cf8" }}
                className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                tabIndex="-1"
                onClick={() => setShowPass((p) => !p)}
              >
                {showPass ? (
                  // Eye off icon
                  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17.94 17.94A9.947 9.947 0 0 1 12 20c-5 0-9-4-9-8 0-1.54.61-3.01 1.66-4.27m5.7-2.6A4 4 0 0 1 12 8c2.21 0 4 1.79 4 4a4.01 4.01 0 0 1-6.6 3.1"/>
                    <path d="M1 1l22 22"/>
                  </svg>
                ) : (
                  // Eye icon
                  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <ellipse cx="12" cy="12" rx="9" ry="5.2"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: submitting ? 1 : 1.03, backgroundColor: "#6366f1" }}
            disabled={submitting}
            className={`w-full py-2.5 px-4 font-semibold rounded-xl shadow-md transition transform
              text-white bg-gradient-to-tr from-indigo-500 via-indigo-600 to-sky-400
              ${submitting ? "opacity-60 cursor-not-allowed" : "hover:from-indigo-600 hover:to-sky-600 hover:shadow-lg"}
            `}
          >
            {submitting ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin -ml-1 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-30" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>
        {/* Success/Error Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.98 }}
              className={`mt-5 flex items-center gap-2 text-center text-sm font-medium justify-center
                ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
            >
              {message.includes("✅") ? (
                <svg width={18} height={18} className="text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" stroke="currentColor"/>
                  <path d="M7 13l3 3 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width={18} height={18} className="text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" stroke="currentColor"/>
                  <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Login redirect */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:underline transition"
          >
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
