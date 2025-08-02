// import PropTypes from "prop-types";
// import { cn } from "@/lib/utils";
// import AnimatedLineText from "./AnimatedHeandling";
// import { Link } from "react-router-dom";

// function Cards({ products, loading, error }) {
//   if (loading) {
//     return (
//       <p className="p-4 text-lg text-center text-gray-600">
//         Loading products...
//       </p>
//     );
//   }

//   if (error) {
//     return <p className="p-4 text-lg text-center text-red-600">{error}</p>;
//   }

//   if (!products.length) {
//     return (
//       <p className="p-4 text-lg text-center text-gray-600">
//         No products found.
//       </p>
//     );
//   }

//   return (
//     <section className="flex flex-col items-center">
//       {/* Heading */}
//       <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
//         <span className="animate-bounce">✨</span>
//         <AnimatedLineText>Trending Products</AnimatedLineText>
//       </h2>

//       {/* Products Grid */}
//       <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-2 md:px-6">
//         {products.map((product) => (
//           <Link
//             to={`/products/${product._id}`}
//             key={product._id}
//             className={cn(
//               "group relative cursor-pointer overflow-hidden rounded-lg shadow-lg flex flex-col justify-end p-4 transition-transform duration-300 hover:scale-105 bg-gray-900",
//               "aspect-[3/4] max-w-full"
//             )}
//             style={{
//               backgroundImage: `url(${
//                 product.imageURL ||
//                 "https://via.placeholder.com/300?text=No+Image"
//               })`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             {/* Dark overlay */}
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 z-0" />

//             {/* Product Info */}
//             <div className="relative z-10 text-white">
//               <h1 className="font-bold text-lg md:text-xl">{product.name}</h1>
//               <p className="text-sm my-2 line-clamp-2">
//                 {product.discription1 || "No description available"}
//               </p>
//               <p className="font-semibold text-base mt-2">
//                 ₹ {product.price?.toLocaleString() || "N/A"}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

// Cards.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       price: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string,
// };

// export default Cards;
















import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";
import AnimatedLineText from "./AnimatedHeandling";
import { Link } from "react-router-dom";

function Cards({ products, loading, error }) {
  if (loading) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 text-lg sm:text-xl text-center text-teal-300"
      >
        Loading products...
      </motion.p>
    );
  }

  if (error) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 text-lg sm:text-xl text-center text-red-400"
      >
        {error}
      </motion.p>
    );
  }

  if (!products.length) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 text-lg sm:text-xl text-center text-teal-300"
      >
        No products found.
      </motion.p>
    );
  }

  return (
    <section className="relative flex flex-col items-center">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle" style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className="particle" style={{ top: '40%', left: '85%', animationDelay: '1s' }} />
        <div className="particle" style={{ top: '70%', left: '30%', animationDelay: '2s' }} />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300 animate-neon-glow"
      >
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          className="text-teal-400"
        >
          ✨
        </motion.span>
        <AnimatedLineText>Trending Products</AnimatedLineText>
      </motion.h2>

      {/* Products Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 xl:px-12">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3}>
              <Link
                to={`/products/${product._id}`}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-xl flex flex-col justify-end p-4 sm:p-5 transition-all duration-300 bg-indigo-900/20 backdrop-blur-xl border border-teal-300/30 hover:border-teal-500 animate-neon-glow",
                  "aspect-[3/4] max-w-full"
                )}
                style={{
                  backgroundImage: `url(${
                    product.imageURL ||
                    "https://via.placeholder.com/300?text=No+Image"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 z-0" />

                {/* Product Info */}
                <div className="relative z-10 text-teal-300">
                  <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
                    {product.name}
                  </h1>
                  <p className="text-sm sm:text-base my-2 sm:my-3 line-clamp-2">
                    {product.discription1 || "No description available"}
                  </p>
                  <p className="font-semibold text-base sm:text-lg">
                    ₹ {product.price?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

Cards.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Cards;