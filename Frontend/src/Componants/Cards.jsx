// // "use client";
// import { cn } from "@/lib/utils";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import AnimatedLineText from "./AnimatedHeandling";

// function Cards() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/") // change to your actual route
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="p-4 text-lg">Loading...</p>;

//   return (
//     <>
//      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
//       <span className="animate-bounce">✨</span>
//       <AnimatedLineText>Trending Products</AnimatedLineText>
//     </h2>
//     <div className="w-full flex flex-wrap justify-center gap-6 px-4 md:px-8">
//       {products.map((product, index) => (
        
//         <div
//           key={index}
//           className={cn(
//             "group relative cursor-pointer overflow-hidden rounded-md shadow-xl flex flex-col justify-between p-4 transition-transform duration-300 hover:scale-105",
//             "h-80 sm:h-96 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-sm"
//           )}
//           style={{
//             backgroundImage: `url(${
//               product.imageURL || "https://via.placeholder.com/300"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Optional hover overlay */}
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 z-0" />

//           {/* Content stays on top */}
//           <div className="relative z-10 text-white">
//             <h1 className="font-bold text-xl md:text-2xl">{product.title}</h1>
//           </div>
//           <div className="relative z-0 text-white">
//             <p className="font-semibold text-sm my-4">{product.discription1}</p>
//             <p className="font-normal text-sm my-4">Price : {product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// }

// export default Cards;












import { cn } from "@/lib/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import AnimatedLineText from "./AnimatedHeandling";
import { Link } from "react-router-dom";

function Cards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/") // change to your actual route
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-lg">Loading...</p>;

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <span className="animate-bounce">✨</span>
        <AnimatedLineText>Trending Products</AnimatedLineText>
      </h2>

      <div className="w-full flex flex-wrap justify-center gap-6 px-4 md:px-8">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-md shadow-xl flex flex-col justify-between p-4 transition-transform duration-300 hover:scale-105",
              "h-80 sm:h-96 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] max-w-sm"
            )}
            style={{
              backgroundImage: `url(${product.imageURL || "https://via.placeholder.com/300"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Optional hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 z-0" />

            {/* Content stays on top */}
            <div className="relative z-10 text-white">
              <h1 className="font-bold text-xl md:text-2xl">{product.title}</h1>
            </div>
            <div className="relative z-10 text-white">
              <p className="font-semibold text-sm my-4">{product.discription1}</p>
              <p className="font-normal text-sm my-4">Price : {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Cards;
