import axios from "axios";
import { useEffect, useState } from "react";

// Define a interface para os produtos
interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_category: string;
}

export const DatabaseTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterText, setFilterText] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Omit<Product, "product_id">>(
    {
      product_name: "",
      product_price: 0,
      product_category: "",
    }
  );

  // Função para carregar os produtos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:8080/product/data"
      );
      setProducts(response.data);
    } catch (err) {
      setError("Error fetching products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para deletar um produto
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/product/delete/${id}`);
      setProducts(products.filter((product) => product.product_id !== id));
    } catch (err) {
      setError("Error deleting product. Please try again.");
      console.error(err);
    }
  };

  // Função para deletar todos os produtos
  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:8080/product/delete");
      setProducts([]);
    } catch (err) {
      setError("Error deleting all products. Please try again.");
      console.error(err);
    }
  };

  // Função para iniciar a edição de um produto
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      product_name: product.product_name,
      product_price: product.product_price,
      product_category: product.product_category,
    });
  };

  // Função para atualizar os dados do formulário de edição
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === "product_price" ? parseFloat(value) : value,
    });
  };

  // Função para enviar os dados editados
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/product/update/${editingProduct.product_id}`,
        editFormData
      );
      const updatedProduct: Product = response.data;
      setProducts(
        products.map((product) =>
          product.product_id === updatedProduct.product_id
            ? updatedProduct
            : product
        )
      );
      setEditingProduct(null);
    } catch (err) {
      setError("Error updating product. Please try again.");
      console.error(err);
    }
  };

  // Filtragem dos produtos pelo nome
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  // Exibe mensagem de erro se ocorrer algum problema na requisição
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4 bg-gray-900 min-h-screen">
      {/* Barra de filtro */}
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tabela de produtos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white rounded-md shadow-md">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.product_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.product_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.product_category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.product_id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botões de ação */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleDeleteAll}
          className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
        >
          Clear All
        </button>
        <a href="http://localhost:8080/product/save">
          <button className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 transition duration-200">
            Download CSV
          </button>
        </a>
      </div>

      {/* Modal de edição */}
      {editingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Name:
                  <input
                    type="text"
                    name="product_name"
                    value={editFormData.product_name}
                    onChange={handleEditChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Price:
                  <input
                    type="number"
                    name="product_price"
                    value={editFormData.product_price}
                    onChange={handleEditChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Category:
                  <input
                    type="text"
                    name="product_category"
                    value={editFormData.product_category}
                    onChange={handleEditChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
