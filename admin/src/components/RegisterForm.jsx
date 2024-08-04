import axios from 'axios';
import { useState } from 'react';
import Navbar from './Navbar';

export default function RegisterForm() {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const HandleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        user_name,
        user_password,
      });

      console.log('New user sucessfully registered', response.data);
      window.location.reload();
     
    } catch (err) {
      console.error('Error sending data to server. Please try again.', err);
      setError('Error sending data to server. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
     <div>
      <form
        className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 rounded-3xl bg-gray-800 border-gray-800 mt-36 h-84'
        onSubmit={HandleRegisterSubmit}
      >
        <h3 className='pb-6 text-2xl text-center text-white'>Register new user</h3>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            id='user_name'
            placeholder='Username'
            className='p-2 rounded-lg bg-gray-700 text-white'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            id='user_password'
            placeholder='Password'
            className='p-2 rounded-lg bg-gray-700 text-white'
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className='text-red-500'>{error}</div>}
          <button type='submit' className='bg-blue-500 text-white rounded-lg p-2'>
            Register
          </button>
        </div>
      </form>
    </div>
    </>
  );
}