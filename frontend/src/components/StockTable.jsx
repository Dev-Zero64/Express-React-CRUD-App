import axios from "axios";
import { useEffect, useState } from "react";

export default function StockTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterText, setFilterText] = useState('');

  const [editFormData, setEditFormData] = useState({
    product_name: '',
    product_price: '',
    product_category: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/product/data")  
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.product_id !== id));
    fetch(`http://localhost:8080/product/delete/${id}`, { method: 'DELETE' }); 
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      product_name: product.product_name,
      product_price: product.product_price,
      product_category: product.product_category
    });
  };

  const handleDeleteAll = () => {
    setProducts([]);
    axios.delete('http://localhost:8080/product/delete');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { product_name, product_price, product_category } = editFormData;
    fetch(`http://localhost:8080/product/update/${editingProduct.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_name, product_price, product_category })
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProducts(products.map(product =>
          product.product_id === updatedProduct.product_id ? updatedProduct : product
        ));
        setEditingProduct(null);
        window.location.reload()
      })
      .catch((err) => console.error("Failed to update product", err));
  };

  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <table className="min-w-full divide-y divide-gray-200 bg-gray-800 text-white rounded-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map(product => (
                <tr key={product.product_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.product_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.product_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.product_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.product_category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="px-3 py-1 rounded bg-blue-600 text-white">
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="px-3 py-1 rounded bg-red-600 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button 
              onClick={handleDeleteAll}
              className="px-3 py-1 rounded bg-gray-600 text-white"
            >
              Clear
            </button>
            <a href="http://localhost:8080/product/save"> 
              <button
                className="px-3 py-1 rounded bg-gray-600 text-white"
              >
                Download CSV
              </button>
            </a>
          </div>
        </div>
      )}
      {editingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit</h2>
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
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="px-3 py-1 rounded bg-green-600 text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1 rounded bg-gray-600 text-white ml-2"
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
}
