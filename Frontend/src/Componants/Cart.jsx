import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

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
          `http://localhost:3000/api/cart?userId=${userId}`
        );
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, userId, navigate]);

  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:3000/api/cart", {
        data: { userId, productId },
      });
      // Refresh
      const res = await axios.get(
        `http://localhost:3000/api/cart?userId=${userId}`
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item from cart.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600 text-lg font-medium">
        Loading cart...
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="text-center py-10 pt-20 text-gray-500 text-xl font-semibold">
        Your cart is empty
      </div>
    );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Cart
      </h2>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  item.productId.imageURL || "https://via.placeholder.com/80"
                }
                alt={item.productId.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.productId.title}
                </h3>
                <p className="text-gray-600">Price: {item.productId.price} ₹</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <p className="text-lg font-semibold text-gray-900">
                Subtotal: ₹{item.quantity * item.productId.price}
              </p>
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right border-t pt-6">
        <p className="text-2xl font-bold text-gray-900">Total: ₹{totalPrice}</p>
        <button
          onClick={() => alert("Proceed to checkout - implement your flow")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
