
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!userId) return; // Just to be safe
    try {
      console.log("Fetching cart for userId:", userId);
      const res = await axios.get(`http://localhost:3000/api/cart?userId=${userId}`);
      console.log("Cart response:", res.data);
      const data = res.data;

      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.warn("Expected an array but got:", data);
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, delta) => {
    try {
      await axios.put("http://localhost:3000/api/cart", { userId, productId, delta });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:3000/api/cart", {
        data: { userId, productId },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  useEffect(() => {
    console.log("Cart component userId:", userId);
    if (userId) {
      fetchCart();
    } else {
      setLoading(false); // No user => no loading
    }
  }, [userId]);

  if (loading) return <div className="text-center py-10">Loading cart...</div>;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <div className="text-center py-10">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cartItems.map((item) => {
          const pid = item.productId._id || item.productId;
          const title = item.productId.title || item.productId.name || "Product";

          return (
            <div
              key={pid}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId.imageURL}
                  alt={title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <p className="text-gray-600">{item.productId.price} ₹</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(pid, -1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(pid, 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(pid)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
