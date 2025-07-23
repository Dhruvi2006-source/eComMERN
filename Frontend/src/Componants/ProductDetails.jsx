// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/products/id/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         const images = [
//           res.data.imageURL,
//           res.data.image1,
//           res.data.image2,
//           res.data.image3,
//         ].filter(Boolean);
//         setMainImage(images[0] || "https://via.placeholder.com/400");
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching product details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="text-center p-4">Loading product details...</p>;
//   if (!product) return <p className="text-center p-4">Product not found</p>;

//   const thumbnails = [
//     product.imageURL,
//     product.image1,
//     product.image2,
//     product.image3,
//   ].filter(Boolean);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Layout container: changes at md breakpoint */}
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Image & Thumbnails wrapper */}
//         <div className="flex flex-row md:flex-col w-full md:w-1/2 items-start gap-4">
//           {/* Thumbnails: left on mobile, below image on desktop */}
//           <div className="flex flex-col md:flex-row gap-2 md:justify-center">
//             {thumbnails.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`Thumbnail ${idx + 1}`}
//                 className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition hover:opacity-70 ${
//                   img === mainImage ? "border-blue-500" : "border-transparent"
//                 }`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
//             <img
//               src={mainImage}
//               alt={product.title}
//               className="w-full aspect-square object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="mt-4 md:mt-0 w-full md:w-1/2 space-y-4 text-center md:text-left">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.title}</h1>
//           <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base md:text-lg text-gray-700">
//             {product.discription2}
//           </pre>
//           <p className="text-base sm:text-lg md:text-xl font-semibold">
//             Price: ${product.price}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;












import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function ProductPage() {
  const { user, isSignedIn } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/id/${id}`)
      .then((res) => {
        setProduct(res.data);
        const images = [
          res.data.imageURL,
          res.data.image1,
          res.data.image2,
          res.data.image3,
        ].filter(Boolean);
        setMainImage(images[0] || "https://via.placeholder.com/400");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/cart", {
        userId: user.id,
        productId: product._id,
        quantity: 1,
      });
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
      alert("Error adding product to cart");
    }
  };

  if (loading) return <p className="text-center p-4">Loading product details...</p>;
  if (!product) return <p className="text-center p-4">Product not found</p>;

  const thumbnails = [
    product.imageURL,
    product.image1,
    product.image2,
    product.image3,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-row md:flex-col w-full md:w-1/2 items-start gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:justify-center">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition hover:opacity-70 ${
                  img === mainImage ? "border-blue-500" : "border-transparent"
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

        <div className="mt-4 md:mt-0 w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.title}</h1>
          <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base md:text-lg text-gray-700">
            {product.discription2}
          </pre>
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Price: {product.price} ₹
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
