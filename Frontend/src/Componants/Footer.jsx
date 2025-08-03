// import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

//         {/* Brand Info */}
//         <div>
//           <h2 className="text-3xl font-extrabold text-white mb-3">YoueStore</h2>
//           <p className="text-sm text-gray-400">
//             Premium products. Lightning fast delivery. Customer-first service. Experience online shopping the right way.
//           </p>
//         </div>

//         {/* Shop Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-blue-400 transition">Men</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Women</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Electronics</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Accessories</a></li>
//           </ul>
//         </div>

//         {/* Support Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Shipping & Returns</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
//             <li><a href="#" className="hover:text-blue-400 transition">Order Tracking</a></li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
//           <form className="flex flex-col space-y-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition text-white py-2 rounded font-medium"
//             >
//               Subscribe
//             </button>
//           </form>

//           {/* Social Media */}
//           <div className="flex items-center space-x-4 mt-5 text-xl text-gray-400">
//             <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
//             <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
//             <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
//             <a href="#" className="hover:text-blue-300 transition"><FaLinkedinIn /></a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} YoueStore. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// Footer.jsx
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <footer className="pulse-glow bg-gradient-to-r from-indigo-950 via-teal-800 to-purple-950 p-6 rounded-lg text-white py-12 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="opacity-0 animate-fadeIn delay-100">
          <h2 className="text-3xl font-extrabold text-white mb-3">YoueStore</h2>
          <p className="text-sm text-gray-400">
            Premium products. Lightning fast delivery. Customer-first service. Experience online shopping the right way.
          </p>
        </div>

        {/* Shop Links */}
        <div className="opacity-0 animate-fadeIn delay-200">
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Men</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Women</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Electronics</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Accessories</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="opacity-0 animate-fadeIn delay-300">
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Order Tracking</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="opacity-0 animate-fadeIn delay-400">
          <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className={`px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${emailFocused ? 'bg-gradient-to-r from-blue-500 to-purple-600 placeholder-transparent' : ''}`}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition text-white py-2 rounded font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Subscribe
            </button>
          </form>

          {/* Social Media */}
          <div className="flex items-center space-x-4 mt-5 text-xl text-gray-400">
            <a href="#" className="hover:text-blue-500 transition transform hover:scale-125"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-500 transition transform hover:scale-125"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition transform hover:scale-125"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-300 transition transform hover:scale-125"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} YoueStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
