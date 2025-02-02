import { useState } from "react";
import axios from "axios";

export const ProductsForm = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para validar o formulário
  const validateForm = () => {
    const { product_name, product_price, product_category } = formData;
    if (!product_name.trim()) {
      setError("Product name is required.");
      return false;
    }
    if (!product_price.trim() || isNaN(Number(product_price))) {
      setError("Product price must be a valid number.");
      return false;
    }
    if (!product_category.trim()) {
      setError("Product category is required.");
      return false;
    }
    setError("");
    return true;
  };

  // Função para enviar o formulário
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/product/",
        formData
      );
      console.log(response.data);
      console.log(`${new Date().toString()}: Data sent to server.`);
      setSuccessMessage("Product added successfully!");
      setFormData({
        product_name: "",
        product_price: "",
        product_category: "",
      });
    } catch (err) {
      setError("Error sending data to server. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md border border-gray-700"
        onSubmit={submitHandler}
      >
        <h3 className="text-2xl font-bold text-center text-white mb-6">
          New Product
        </h3>

        {/* Mensagens de erro ou sucesso */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {/* Campo de nome */}
        <label
          htmlFor="product_name"
          className="block text-white text-lg font-medium mb-2"
        >
          Name
        </label>
        <input
          id="product_name"
          name="product_name"
          type="text"
          value={formData.product_name}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
          required
        />

        {/* Campo de preço */}
        <label
          htmlFor="product_price"
          className="block text-white text-lg font-medium mb-2"
        >
          Value
        </label>
        <input
          id="product_price"
          name="product_price"
          type="number"
          value={formData.product_price}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product price"
          required
        />

        {/* Campo de categoria */}
        <label
          htmlFor="product_category"
          className="block text-white text-lg font-medium mb-2"
        >
          Category
        </label>
        <input
          id="product_category"
          name="product_category"
          type="text"
          value={formData.product_category}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product category"
          required
        />

        {/* Botão de envio */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};
