import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function OrderProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify({ productId, quantity: 1 }), // Sending quantity as 1 for simplicity
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000); // Reset success message after 3 seconds
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Could not place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 p-2">
      <div className="mb-4">
    
      </div>
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-red-600 text-center">Error: {error}</p>}
      {orderSuccess && (
        <p className="text-green-600 text-center">Order placed successfully!</p>
      )}
      <div className="flex-grow rounded-lg shadow-lg h-[calc(100vh-120px)]">
        <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">#</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">Product Name</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">Price</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No products available</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">{p._id}</td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">{p.name}</td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">${p.price}</td>
                    <td className="py-3 px-4 border-b">
                      <button
                        className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-500 transition duration-200 flex items-center"
                        onClick={() => handleOrder(p._id)}
                        aria-label={`Order product ${p.name}`}
                      >
                        <ShoppingCartIcon className="mr-1" />
                        Order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
