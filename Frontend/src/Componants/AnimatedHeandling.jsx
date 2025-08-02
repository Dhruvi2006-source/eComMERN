import React from "react";
import { motion } from "framer-motion";

 function AnimatedLineText({ children, className = "" }) {
  return (
    <motion.span
      className={`text-transparent bg-clip-text 
        bg-[linear-gradient(120deg,#6366f1,#ec4899,#fcd34d,#10b981)] 
        bg-[length:300%_300%] 
        animate-gradient-shimmer font-extrabold ${className}`}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "100% 50%" }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export default AnimatedLineText;