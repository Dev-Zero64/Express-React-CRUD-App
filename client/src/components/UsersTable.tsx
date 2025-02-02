import { useEffect, useState } from "react";
import axios from "axios";

// Define a interface para os usuários
interface User {
  user_id: number;
  user_name: string;
}

export const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar os usuários
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>(
        "http://localhost:8080/user/data"
      );
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar um usuário
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/user/delete/${id}`);
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (err) {
      setError("Error deleting user. Please try again.");
      console.error(err);
    }
  };

  // Efeito para carregar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div className=" w-full mx-auto p-4 bg-gray-900 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white rounded-md shadow-md">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.user_id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.user_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(user.user_id)}
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
    </div>
  );
};
