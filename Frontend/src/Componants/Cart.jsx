import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer"

function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?._id;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart?userId=${userId}`
        );
        setCartItems(res.data);
      } catch (err) {
        console.log(err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user, userId, navigate]);

  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/api/cart", {
        data: { userId, productId },
      });
      const res = await axios.get(
        `http://localhost:5000/api/cart?userId=${userId}`
      );
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to remove item from cart.");
    }
  };

  const updateQuantity = async (productId, delta) => {
    if (!userId) return;
    try {
      await axios.put("http://localhost:5000/api/cart", {
        userId,
        productId,
        delta,
      });
      const res = await axios.get(
        `http://localhost:5000/api/cart?userId=${userId}`
      );
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to update item quantity.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.quantity * (parseFloat(item.productId.price) || 0),
    0
  );

  // Animation for the list
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.4, staggerChildren: 0.12 },
    },
  };
  const itemAnim = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", bounce: 0.38 },
    },
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-80 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        />
        <span className="text-blue-700/90 text-xl font-semibold tracking-wide">
          Loading cart...
        </span>
      </motion.div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-28 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <svg width="96" height="96" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#e0e7ff" />
            <path
              d="M9.97 24.5a1.6 1.6 0 0 1-1.34-2.45l5.44-9.02A2.4 2.4 0 0 1 16.89 11h4.22c.87 0 1.67.47 2.08 1.21l5.43 9.02A1.6 1.6 0 0 1 27.03 24.5H9.97z"
              fill="#6366f1"
            />
            <circle cx="15" cy="28" r="1.1" fill="#6366f1" />
            <circle cx="24" cy="28" r="1.1" fill="#6366f1" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="text-2xl md:text-3xl font-bold text-gray-700 mt-4">
            Your cart is empty
          </div>
        </motion.div>
        <div className="text-gray-400 font-medium mt-1">
          Start adding amazing things!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 py-8 pt-24 min-h-screen min-w-full relative bg-gradient-to-r from-indigo-950 via-teal-800 purple-950">
      {/* Header */}
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-white bg-gradient-to-r from-blue-700 via-sky-800 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.15 }}
      >
        Your Cart
      </motion.h2>
      {/* Cart Items List */}
      <motion.div
        className="space-y-7"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.productId._id}
              variants={itemAnim}
              className="flex flex-col sm:flex-row sm:items-center justify-between
                border rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl bg-white/80
                backdrop-blur transition-shadow duration-300 relative overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              layout
            >
              {/* Decorative glow */}
              <motion.div
                className="absolute -left-12 bottom-0 w-44 h-32 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 55% 55%, #6366f133 40%, transparent 80%)",
                }}
                animate={{ scale: [1, 1.07, 1], opacity: [0.55, 0.85, 0.62] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.3,
                  repeatType: "mirror",
                }}
              />
              {/* Item Info */}
              <div className="flex items-center space-x-4 z-10">
                <motion.img
                  src={
                    item.productId.imageURL || "https://via.placeholder.com/80"
                  }
                  alt={item.productId.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-lg border border-blue-200"
                  layoutId={`cart-img-${item.productId._id}`}
                  initial={{ scale: 0.94 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {item.productId.title}
                  </div>
                  <div className="text-gray-600">
                    Price: ₹{item.productId.price}
                  </div>
                  <div className="flex items-center mt-3 space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => updateQuantity(item.productId._id, -1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 border rounded flex items-center justify-center text-lg font-extrabold 
                        bg-slate-50 hover:bg-blue-100 active:bg-blue-200
                        disabled:opacity-30 disabled:cursor-not-allowed shadow"
                    >
                      –
                    </motion.button>
                    <span className="text-gray-800 font-semibold px-2">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => updateQuantity(item.productId._id, 1)}
                      className="w-8 h-8 border rounded flex items-center justify-center text-lg font-extrabold 
                        bg-slate-50 hover:bg-blue-100 active:bg-blue-200 shadow"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* Subtotal and Remove */}
              <div className="flex flex-row sm:flex-col items-end sm:items-end justify-between sm:space-y-3 space-x-3 sm:space-x-0 mt-3 sm:mt-0 z-10">
                <div className="text-lg font-semibold text-sky-700">
                  Subtotal: ₹{(item.quantity * item.productId.price).toFixed(2)}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ color: "#dc2626", scale: 1.05 }}
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 hover:underline font-medium text-sm py-1 px-2"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Total and Checkout */}
      <motion.div
        className="mt-12 flex flex-col items-end border-t pt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.34 }}
      >
        <motion.div
          className="text-2xl font-bold text-indigo-800 mb-2"
          initial={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          Total: ₹{totalPrice.toFixed(2)}
        </motion.div>
        <motion.button
          onClick={() => alert("Proceed to checkout - implement your flow")}
          whileTap={{ scale: 0.97 }}
          whileHover={{
            background: "linear-gradient(90deg,#0ea5e9,#6366f1 80%,#a21caf)",
            boxShadow: "0 2px 32px #6366f1bb,0 1px 12px #38bdf891",
          }}
          className="mt-5 px-9 py-4 text-lg sm:text-xl font-bold rounded-xl
            text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500
            hover:from-sky-700 hover:via-indigo-700 active:opacity-90 shadow-xl
            ring-2 ring-blue-200 ring-opacity-60 transition"
          style={{ filter: "drop-shadow(0 8px 24px #38bdf880)" }}
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
      <div className="mt-2.5 mb-0">
        <Footer />
      </div>
    </div>
  );
}
export default Cart;
