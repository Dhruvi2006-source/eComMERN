import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import Cards from "./Componants/Cards";
import BannerCarousel from "./Componants/Carousel";
import ImageGrid from "./Componants/ImageGrid";

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
    <div className="container mx-auto p-4">
      <BannerCarousel />
      <ImageGrid />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select product category"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          aria-label="Minimum price"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          aria-label="Maximum price"
        />
        <button
          onClick={clearFilters}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Cards */}
      <Cards products={products} loading={loading} error={error} />
    </div>
  );
}

export default Home;
