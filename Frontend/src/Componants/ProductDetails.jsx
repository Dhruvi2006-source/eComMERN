import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://ecommern-backend.onrender.com/api/products/id/${id}`)
      .then((res) => {
        setProduct(res.data);
        const images = [
          res.data.imageURL,
          res.data.image1,
          res.data.image2,
          res.data.image3,
        ].filter(Boolean);
        setMainImage(images[0] || "https://via.placeholder.com/400");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load product.");
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add products to your cart.");
      navigate("/login");
      return;
    }
    try {
      await axios.post("https://ecommern-backend.onrender.com/api/cart", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
      });
      navigate("/cart");
    } catch (err) {
      console.log(err);
      alert("Error adding product to cart");
    }
  };

  const thumbnails = product
    ? [product.imageURL, product.image1, product.image2, product.image3].filter(
        Boolean
      )
    : [];

  const AnimatedBadge = ({ children }) => (
    <motion.div
      className="absolute top-2 right-2 px-3 py-1 mb-0 rounded-full font-semibold text-xs tracking-wide text-indigo-900 bg-indigo-300 bg-opacity-90 shadow-lg z-20"
      initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
      animate={{ scale: 1.05, opacity: 1, rotate: [0, -6, 4, 0] }}
      transition={{
        type: "spring",
        stiffness: 190,
        damping: 16,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
    >
      {children}
      <motion.span
        className="ml-2 inline-block"
        style={{ filter: "blur(0.5px)" }}
        animate={{
          x: [0, 2, -3, 0],
          opacity: [0.9, 1, 0.8, 0.9],
        }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
      >
        ✨
      </motion.span>
    </motion.div>
  );

  const MobileFAB = () => (
    <motion.button
      className="fixed bottom-6 right-5 z-50 px-7 py-3 rounded-full text-lg font-bold shadow-xl 
                  bg-gradient-to-r from-indigo-600 to-blue-600 text-white outline-none border-2 border-white
                  animate-bounce transition-all"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.45 }}
      style={{ boxShadow: "0 6px 40px #1e3a8a66" }}
      onClick={handleAddToCart}
      whileHover={{ scale: 1.07, boxShadow: "0 12px 56px #4c51bf" }}
    >
      {user ? "Add to Cart" : "Login to Add to Cart"}
    </motion.button>
  );

  return (
    <div className="pt-20 max-w-7xl mx-auto px-3 py-6 min-h-screen relativerelative bg-gradient-to-r from-indigo-950 via-teal-800 to-purple-950">
      {/* Animated Loading & Error */}
      <AnimatePresence>
        {loading && (
          <motion.p
            className="text-center p-4 text-xl font-medium text-indigo-700"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key="loading"
          >
            Loading product details...
          </motion.p>
        )}
        {error && (
          <motion.p
            className="text-center p-4 text-xl text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key="error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && !error && product && (
          <motion.div
            className="flex flex-col md:flex-row gap-8 mt-4 items-center md:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            key="product"
          >
            {/* IMAGE GALLERY WITH GLOW + BADGE */}
            <div className="flex flex-col-reverse md:flex-col w-full md:w-1/2 items-center md:items-start gap-7 relative">
              <motion.div
                className="relative rounded-2xl w-full max-w-xs sm:max-w-md md:max-w-lg md:self-center shadow-lg mb-4 md:mb-0 bg-white/80"
                initial={{ scale: 0.94, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.45 }}
                style={{ zIndex: 1 }}
              >
                {/* Animated Aura Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl z-0"
                  style={{
                    background:
                      "radial-gradient(circle at 60% 48%, #5a67d855 10%, #7f9cf5bb 70%, #fff0 )",
                    filter: "blur(24px)",
                  }}
                  animate={{
                    opacity: [0.72, 1, 0.78],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                {/* Trending/Hot Badge */}
                {product.isTrending && <AnimatedBadge>Trending</AnimatedBadge>}
                {/* Main IMAGE: perspective swap on change */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={product.title}
                    className="relative z-10 w-full aspect-square object-cover rounded-2xl shadow-xl ring-2 ring-indigo-300"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      duration: 0.6,
                    }}
                    style={{ backfaceVisibility: "hidden" }}
                  />
                </AnimatePresence>
              </motion.div>
              {/* THUMBNAILS */}
              <div className="flex flex-row md:flex-row justify-center md:justify-start gap-3">
                {thumbnails.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-xl cursor-pointer
                      border-2 transition-all ${
                        img === mainImage
                          ? "border-indigo-500 shadow-lg"
                          : "border-transparent"
                      }`}
                    whileHover={{ scale: 1.18, boxShadow: "0 0 16px #c3dafe" }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 340 }}
                    onClick={() => setMainImage(img)}
                    style={{
                      filter:
                        img === mainImage
                          ? "drop-shadow(0px 0px 8px #5a67d8)"
                          : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS PANEL */}
            <motion.div
              className="w-full md:w-1/2 min-h-[22rem] space-y-6 justify-center relative
                rounded-2xl shadow-md px-6 py-6 md:py-10 bg-white/80 
                ring-1 ring-indigo-200 backdrop-blur-lg"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
            >
              <motion.h1
                className="text-2xl sm:text-4xl font-black text-indigo-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-900"
                initial={{ scale: 0.94, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.42 }}
                style={{
                  letterSpacing: "0.03em",
                  textShadow: "0 1px 6px #5a67d855",
                }}
              >
                {product.title}
              </motion.h1>
              <motion.pre
                className="whitespace-pre-wrap font-sans text-md sm:text-xl text-gray-900/90 leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.68, delay: 0.2 }}
              >
                {product.discription2}
              </motion.pre>
              <motion.div
                className="flex items-center justify-center md:justify-start gap-2 mt-2"
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <span className="text-lg md:text-xl font-semibold text-indigo-700">
                  Price:
                </span>
                <motion.span
                  className="text-2xl text-red-800 md:text-3xl  font-extrabold py-1 px-4 rounded-xl bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent shadow-inner"
                  initial={{ scale: 0.92, backgroundPosition: "0% 50%" }}
                  animate={{
                    scale: [1, 1.08, 1],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  {product.price} ₹
                </motion.span>
              </motion.div>
              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={!user}
                className={`mt-7 px-8 py-4 rounded-2xl text-white font-bold text-lg w-full md:w-auto shadow-xl
                  transition-colors duration-400
                  ${
                    user
                      ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 cursor-pointer"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                style={{
                  boxShadow: "0 2px 16px #5a67d866, 0 0px 64px #7f9cf566",
                }}
                whileTap={
                  user ? { scale: 0.97, backgroundColor: "#4c51bf" } : {}
                }
                animate={
                  user
                    ? {
                        boxShadow: [
                          "0 2px 16px #5a67d866",
                          "0 4px 24px #43419066",
                          "0 2px 16px #5a67d866",
                        ],
                      }
                    : undefined
                }
                transition={{
                  duration: 1,
                  repeat: user ? Infinity : 0,
                  repeatType: "mirror",
                }}
              >
                {user ? "Add to Cart" : "Login to Add to Cart"}
              </motion.button>

              {product.isLimited && (
                <motion.div
                  className="absolute -top-3 left-3 px-3 py-1 rounded-full text-white font-semibold bg-red-500 bg-opacity-90 shadow-lg"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  style={{ filter: "drop-shadow(0px 0px 8px #dc2626b6)" }}
                >
                  Limited Stock
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Mobile */}
      {!loading && !error && product && (
        <div className="block md:hidden">
          <MobileFAB />
        </div>
      )}

      {/* Custom pointer effect for desktop */}
      <style>
        {`
          @media (pointer: fine) {
            button:hover, img:hover {
              cursor: url('https://cdn.jsdelivr.net/gh/uxwing/cursor-flare/cursor-flare.svg') 32 16, pointer !important; 
            }
          }
        `}
      </style>
      <div className="mt-2.5 mb-0">
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
