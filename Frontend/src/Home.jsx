// import { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import Tilt from "react-parallax-tilt";
// import debounce from "lodash.debounce";
// import Cards from "./Componants/Cards";
// import BannerCarousel from "./Componants/Carousel";
// import ImageGrid from "./Componants/ImageGrid";
// import {
//   MagnifyingGlassIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/outline";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/products/category"
//       );
//       if (!response.ok) {
//         const text = await response.text();
//         console.error("Categories response:", text);
//         throw new Error(
//           `Failed to fetch categories: ${response.status} ${response.statusText}`
//         );
//       }
//       const data = await response.json();
//       console.log("Categories fetched:", data);
//       setCategories(data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setError(err.message);
//     }
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams();
//       if (category !== "all") query.append("category", category);
//       if (minPrice) query.append("minPrice", minPrice);
//       if (maxPrice) query.append("maxPrice", maxPrice);

//       console.log("Fetching with query:", query.toString());
//       const response = await fetch(
//         `http://localhost:3000/api/products?${query.toString()}`
//       );
//       if (!response.ok) {
//         const text = await response.text();
//         console.error("Products response:", text);
//         throw new Error(
//           `Failed to fetch products: ${response.status} ${response.statusText}`
//         );
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [
//     category,
//     minPrice,
//     maxPrice,
//   ]);

//   useEffect(() => {
//     fetchCategories();
//     debouncedFetchProducts();
//     return () => debouncedFetchProducts.cancel();
//   }, [category, minPrice, maxPrice, debouncedFetchProducts]);

//   const clearFilters = () => {
//     setCategory("all");
//     setMinPrice("");
//     setMaxPrice("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-teal-100 to-purple-100">
//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="relative bg-gradient-to-r from-indigo-900 via-teal-700 to-purple-800 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 text-center overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15 animate-pulse" />
//         <motion.h1
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg"
//         >
//           Elevate Your Shopping
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-8"
//         >
//           Discover premium products with unmatched style and quality.
//         </motion.p>
//         <motion.button
//           whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
//           whileTap={{ scale: 0.9 }}
//           className="px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:from-teal-600 hover:to-indigo-700 transition-all duration-300"
//         >
//           Shop the Future
//         </motion.button>
//       </motion.section>

//       {/* Banner Carousel */}
//       <motion.section
//         initial={{ opacity: 0, x: -30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//         className="my-10 sm:my-14 px-4 sm:px-6 lg:px-8 xl:px-12"
//       >
//         <BannerCarousel />
//       </motion.section>

//       {/* Image Grid */}
//       <motion.section
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, delay: 0.5 }}
//         className="my-10 sm:my-14 px-4 sm:px-6 lg:px-8 xl:px-12"
//       >
//         <ImageGrid />
//       </motion.section>

//       {/* Filter Bar */}
//       <motion.section
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.7 }}
//         className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 my-10 sm:my-14"
//       >
//         <Tilt
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           glareEnable={true}
//           glareMaxOpacity={0.3}
//           glareColor="#ffffff"
//         >
//           <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 p-5 sm:p-6 bg-gradient-to-br from-white/20 to-indigo-100/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-200/50">
//             <div className="relative flex-1">
//               <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
//               <motion.select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-gray-800 text-sm sm:text-base transition-all duration-300 hover:bg-indigo-50/30 hover:border-indigo-400"
//                 aria-label="Select product category"
//                 whileHover={{ scale: 1.03 }}
//                 whileFocus={{
//                   scale: 1.03,
//                   boxShadow: "0 0 10px rgba(79,70,229,0.5)",
//                 }}
//               >
//                 <option value="all">All Categories</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </motion.select>
//             </div>
//             <div className="relative flex-1">
//               <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
//               <motion.input
//                 type="number"
//                 placeholder="Min Price"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-gray-800 text-sm sm:text-base transition-all duration-300 hover:bg-indigo-50/30 hover:border-indigo-400"
//                 min="0"
//                 aria-label="Minimum price"
//                 whileHover={{ scale: 1.03 }}
//                 whileFocus={{
//                   scale: 1.03,
//                   boxShadow: "0 0 10px rgba(79,70,229,0.5)",
//                 }}
//               />
//             </div>
//             <div className="relative flex-1">
//               <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
//               <motion.input
//                 type="number"
//                 placeholder="Max Price"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-gray-800 text-sm sm:text-base transition-all duration-300 hover:bg-indigo-50/30 hover:border-indigo-400"
//                 min="0"
//                 aria-label="Maximum price"
//                 whileHover={{ scale: 1.03 }}
//                 whileFocus={{
//                   scale: 1.03,
//                   boxShadow: "0 0 10px rgba(79,70,229,0.5)",
//                 }}
//               />
//             </div>
//             <motion.button
//               onClick={clearFilters}
//               className="px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-full font-medium text-sm sm:text-base shadow-lg hover:from-indigo-700 hover:to-teal-600 transition-all duration-300 animate-pulse"
//               aria-label="Clear all filters"
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 8px 16px rgba(79,70,229,0.4)",
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Clear Filters
//             </motion.button>
//           </div>
//         </Tilt>
//       </motion.section>

//       {/* Product Cards */}
//       <motion.section
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.9 }}
//         className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-12 sm:mb-16"
//       >
//         {loading && (
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity }}
//             className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto my-8"
//           />
//         )}
//         <Cards products={products} loading={loading} error={error} />
//       </motion.section>
//     </div>
//   );
// }

// export default Home;








import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import debounce from 'lodash.debounce';
import Cards from './Componants/Cards';
import BannerCarousel from './Componants/Carousel';
import ImageGrid from './Componants/ImageGrid';
import { MagnifyingGlassIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/category"
      );
      if (!response.ok) {
        const text = await response.text();
        console.error("Categories response:", text);
        throw new Error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Categories fetched:", data);
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (category !== "all") query.append("category", category);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);

      console.log("Fetching with query:", query.toString());
      const response = await fetch(
        `http://localhost:3000/api/products?${query.toString()}`
      );
      if (!response.ok) {
        const text = await response.text();
        console.error("Products response:", text);
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [
    category,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchCategories();
    debouncedFetchProducts();
    return () => debouncedFetchProducts.cancel();
  }, [category, minPrice, maxPrice, debouncedFetchProducts]);

  const clearFilters = () => {
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-purple-900 overflow-hidden">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle" style={{ top: '10%', left: '20%', animationDelay: '0s' }} />
        <div className="particle" style={{ top: '30%', left: '70%', animationDelay: '1s' }} />
        <div className="particle" style={{ top: '60%', left: '40%', animationDelay: '2s' }} />
        <div className="particle" style={{ top: '80%', left: '90%', animationDelay: '3s' }} />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-indigo-950 via-teal-800 to-purple-950 text-white py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-20 animate-pulse" />
        <motion.h1
          initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300"
        >
          Redefine Your Shopping
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-8 text-gray-200"
        >
          Immerse yourself in a curated collection of cutting-edge products.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.15, boxShadow: "0 12px 24px rgba(79,70,229,0.5)" }}
          whileTap={{ scale: 0.9 }}
          className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-teal-600 to-indigo-700 text-white font-semibold rounded-full shadow-2xl hover:from-teal-700 hover:to-indigo-800 transition-all duration-300 animate-pulse"
        >
          Dive In
        </motion.button>
      </motion.section>

      {/* Banner Carousel */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="my-12 sm:my-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-teal-500/10 rounded-xl" />
        <BannerCarousel />
      </motion.section>

      {/* Image Grid */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="my-12 sm:my-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-xl" />
        <ImageGrid />
      </motion.section>

      {/* Filter Bar */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 my-12 sm:my-16"
      >
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.4} glareColor="#ffffff">
          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 p-5 sm:p-6 bg-gradient-to-br from-indigo-900/20 to-teal-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-teal-300/30 overflow-hidden">
            <div className="absolute inset-0 border-2 border-transparent rounded-3xl animate-neon-glow" />
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-teal-400" />
              <motion.select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-teal-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-indigo-900/10 text-gray-200 text-sm sm:text-base placeholder-teal-300/50 transition-all duration-300 hover:bg-teal-500/10 hover:border-teal-400"
                aria-label="Select product category"
                whileHover={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
                whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
              >
                <option value="all" className="text-gray-800">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-800">
                    {cat}
                  </option>
                ))}
              </motion.select>
            </div>
            <div className="relative flex-1">
              <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-teal-400" />
              <motion.input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-teal-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-indigo-900/10 text-gray-200 text-sm sm:text-base placeholder-teal-300/50 transition-all duration-300 hover:bg-teal-500/10 hover:border-teal-400"
                min="0"
                aria-label="Minimum price"
                whileHover={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
                whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
              />
            </div>
            <div className="relative flex-1">
              <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-teal-400" />
              <motion.input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border border-teal-300/50 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-indigo-900/10 text-gray-200 text-sm sm:text-base placeholder-teal-300/50 transition-all duration-300 hover:bg-teal-500/10 hover:border-teal-400"
                min="0"
                aria-label="Maximum price"
                whileHover={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
                whileFocus={{ scale: 1.03, boxShadow: "0 0 12px rgba(45,212,191,0.5)" }}
              />
            </div>
            <motion.button
              onClick={clearFilters}
              className="px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-indigo-700 text-white rounded-full font-medium text-sm sm:text-base shadow-2xl hover:from-teal-700 hover:to-indigo-800 transition-all duration-300 animate-pulse relative overflow-hidden"
              aria-label="Clear all filters"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(45,212,191,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full" />
              <span className="relative z-10">Clear Filters</span>
            </motion.button>
          </div>
        </Tilt>
      </motion.section>

      {/* Product Cards */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 mb-12 sm:mb-16"
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto my-8"
          />
        )}
        <Cards products={products} loading={loading} error={error} />
      </motion.section>
    </div>
  );
}

export default Home;