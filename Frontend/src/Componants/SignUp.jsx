// import { useState } from "react";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) setMessage("Signup successful! You can now login.");
//       else setMessage(data.error || "Signup failed");
//     } catch (error) {
//       setMessage("Network error");
//       console.log(error)
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-3xl mb-6">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 w-80">
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded w-full"
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded w-full"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded w-full"
//         />
//         <button type="submit" className="bg-indigo-600 text-white py-2 rounded w-full">
//           Sign Up
//         </button>
//       </form>
//       {message && <p className="mt-4 text-center">{message}</p>}
//     </div>
//   );
// }















import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-100 flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600 tracking-tight">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start your journey with us. It only takes a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
