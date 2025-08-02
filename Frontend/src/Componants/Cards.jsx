import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import AnimatedLineText from "./AnimatedHeandling";
import { Link } from "react-router-dom";

function Cards({ products, loading, error }) {
  if (loading) {
    return (
      <p className="p-4 text-lg text-center text-gray-600">
        Loading products...
      </p>
    );
  }

  if (error) {
    return <p className="p-4 text-lg text-center text-red-600">{error}</p>;
  }

  if (!products.length) {
    return (
      <p className="p-4 text-lg text-center text-gray-600">
        No products found.
      </p>
    );
  }

  return (
    <section className="flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <span className="animate-bounce">✨</span>
        <AnimatedLineText>Trending Products</AnimatedLineText>
      </h2>

      {/* Products Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-2 md:px-6">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-lg shadow-lg flex flex-col justify-end p-4 transition-transform duration-300 hover:scale-105 bg-gray-900",
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 z-0" />

            {/* Product Info */}
            <div className="relative z-10 text-white">
              <h1 className="font-bold text-lg md:text-xl">{product.name}</h1>
              <p className="text-sm my-2 line-clamp-2">
                {product.discription1 || "No description available"}
              </p>
              <p className="font-semibold text-base mt-2">
                ₹ {product.price?.toLocaleString() || "N/A"}
              </p>
            </div>
          </Link>
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
