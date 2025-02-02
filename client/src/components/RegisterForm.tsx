import { useState } from "react";
import axios from "axios";

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    const { user_name, user_password } = formData;
    if (!user_name.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!user_password.trim() || user_password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(null);
    return true;
  };

  // Função para enviar o formulário
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        formData
      );
      console.log("New user successfully registered", response.data);
      setSuccessMessage("User registered successfully!");
      setFormData({ user_name: "", user_password: "" });
    } catch (err) {
      console.error("Error sending data to server. Please try again.", err);
      setError("Error sending data to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md border border-gray-700"
        onSubmit={handleRegisterSubmit}
      >
        <h3 className="text-2xl font-bold text-center text-white mb-6">
          Register New User
        </h3>

        {/* Mensagens de erro ou sucesso */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {/* Campo de nome de usuário */}
        <label
          htmlFor="user_name"
          className="block text-white text-lg font-medium mb-2"
        >
          Username
        </label>
        <input
          id="user_name"
          name="user_name"
          type="text"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter username"
          required
        />

        {/* Campo de senha */}
        <label
          htmlFor="user_password"
          className="block text-white text-lg font-medium mb-2"
        >
          Password
        </label>
        <input
          id="user_password"
          name="user_password"
          type="password"
          value={formData.user_password}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          required
        />

        {/* Botão de envio */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
