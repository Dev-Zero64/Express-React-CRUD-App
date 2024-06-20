import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default function UsersTable(){
    
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    setUsers(users.filter(users => users.user_id !== id));
    fetch(`http://localhost:8080/user/delete/${id}`, { method: 'DELETE' }); 
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/data'); 
        setUsers(response.data);
    
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  };

  return (
    <>
    <Navbar/>
    <div className='container mx-auto p-4'>
    <table className='min-w-full divide-y divide-gray-200 bg-gray-800 text-white rounded-md'>
      <thead>
        <tr>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>ID</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Username</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-700'>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.user_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="px-3 py-1 rounded bg-red-600 text-white">
                      Delete
                    </button>
                  </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
};

