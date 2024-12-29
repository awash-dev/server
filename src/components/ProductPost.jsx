import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Create image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Form validation
    if (!formData.name || !formData.price || !formData.category) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (formData.price <= 0) {
      setError("Price must be a positive number.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create product");
      }

      setSuccess("Product created successfully!");
      setTimeout(() => {
        navigate("/products"); // Redirect to product list after success
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      {/* Back to Product Link */}
      {/* <Link
        to="/product"
        className="mb-2 w-40 bg-blue-600 text-white rounded-lg p-2 text-center hover:bg-blue-500 transition duration-300"
      >
        Back to Product
      </Link> */}
      <div className="flex w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md w-full bg-white shadow-lg rounded-lg p-6 flex-col"
        >
          <h2 className="text-xl font-semibold text-center mb-6">
            Create Product
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-600 text-center mb-4">{success}</p>
          )}
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              onChange={handleChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="price" className="mb-1 text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Product price"
              onChange={handleChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
              required
              min="0" // Prevent negative values
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="category" className="mb-1 text-gray-700">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="toys">Toys</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description" className="mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Product description"
              onChange={handleChange}
              className="border rounded-lg p-2 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none resize-none overflow-hidden"
              rows={3}
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="image" className="mb-1 text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
              accept="image/*" // Accept only image files
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 rounded-full items-center flex w-32 h-32 object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
