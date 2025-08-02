import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {  useAuth } from "../AuthContext"; // Import your auth hook

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user} = useAuth(); // Get user and login state from context
  console.log("User in ProductPage:", user);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:3000/api/products/id/${id}`)
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
        console.error("Error fetching product details:", err);
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
      await axios.post("http://localhost:3000/api/cart", {
        userId: user._id, // Use logged in user's ID here
        productId: product._id,
        quantity: 1,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
      alert("Error adding product to cart");
    }
  };

  if (loading)
    return <p className="text-center p-4">Loading product details...</p>;
  if (error) return <p className="text-center p-4 text-red-600">{error}</p>;
  if (!product) return <p className="text-center p-4">Product not found</p>;

  const thumbnails = [
    product.imageURL,
    product.image1,
    product.image2,
    product.image3,
  ].filter(Boolean);

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <div className="flex flex-row md:flex-col w-full md:w-1/2 items-start gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:justify-center">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition duration-300 hover:opacity-70 ${
                  img === mainImage ? "border-blue-600" : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-4 md:mt-0 w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {product.title}
          </h1>
          <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base md:text-lg text-gray-700">
            {product.discription2 /* fix spelling if needed */}
          </pre>
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Price: {product.price} ₹
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!user}
            className={`mt-6 px-6 py-3 rounded-lg transition ${
              user
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {user ? "Add to Cart" : "Login to Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;











// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../AuthContext";
// import Cards from "./Cards"; // Import your Cards component

// function ProductPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [product, setProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mainImage, setMainImage] = useState(null);

//   useEffect(() => {
//     const fetchProductAndProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch single product
//         const productRes = await axios.get(`http://localhost:3000/api/products/id/${id}`);
//         const productData = productRes.data;
//         setProduct(productData);

//         const images = [productData.imageURL, productData.image1, productData.image2, productData.image3].filter(Boolean);
//         setMainImage(images[0] || "https://via.placeholder.com/400");

//         // Fetch all products
//         const allProductsRes = await axios.get(`http://localhost:3000/api/products`);
//         setAllProducts(allProductsRes.data);
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//         setError("Failed to load product.");
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductAndProducts();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!user) {
//       alert("Please login to add products to your cart.");
//       navigate("/login");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/api/cart", {
//         userId: user._id,
//         productId: product._id,
//         quantity: 1,
//       });
//       navigate("/cart");
//     } catch (err) {
//       console.error("Failed to add product to cart:", err);
//       alert("Error adding product to cart");
//     }
//   };

//   if (loading) return <p className="text-center p-4">Loading product details...</p>;
//   if (error) return <p className="text-center p-4 text-red-600">{error}</p>;
//   if (!product) return <p className="text-center p-4">Product not found</p>;

//   const thumbnails = [product.imageURL, product.image1, product.image2, product.image3].filter(Boolean);

//   // Exclude current product from "all products"
//   const filteredProducts = allProducts.filter((p) => p._id !== product._id);

//   return (
//     <div className="pt-20 max-w-7xl mx-auto px-4 py-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Image Gallery */}
//         <div className="flex flex-row md:flex-col w-full md:w-1/2 items-start gap-4">
//           <div className="flex flex-col md:flex-row gap-2 md:justify-center">
//             {thumbnails.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`Thumbnail ${idx + 1}`}
//                 className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition duration-300 hover:opacity-70 ${
//                   img === mainImage ? "border-blue-600" : "border-transparent"
//                 }`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>

//           <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
//             <img
//               src={mainImage}
//               alt={product.title}
//               className="w-full aspect-square object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="mt-4 md:mt-0 w-full md:w-1/2 space-y-4 text-center md:text-left">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.title}</h1>
//           <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base md:text-lg text-gray-700">
//             {product.discription2}
//           </pre>
//           <p className="text-base sm:text-lg md:text-xl font-semibold">
//             Price: ₹{product.price.toLocaleString("en-IN")}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             disabled={!user}
//             className={`mt-6 px-6 py-3 rounded-lg transition ${
//               user
//                 ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
//             }`}
//           >
//             {user ? "Add to Cart" : "Login to Add to Cart"}
//           </button>
//         </div>
//       </div>

//       {/* All Products Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
//         <Cards products={filteredProducts} />
//       </div>
//     </div>
//   );
// }

// export default ProductPage;
