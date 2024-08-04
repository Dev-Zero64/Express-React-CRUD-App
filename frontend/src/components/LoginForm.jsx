import axios from 'axios';
import { useState } from 'react';

export default function LoginForm({ onLoginSuccess }) {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        user_name,
        user_password,
      });
      
      console.log('Login successful:', response.data);
      onLoginSuccess(user_name);

    } catch (err) {
      console.error('Error during login:', err);
      setError('Incorrect username or password. Please try again.');
    }
  };

  return (
    <div>
      <form
        className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 rounded-3xl bg-gray-800 border-gray-800 mt-36 h-84'
        onSubmit={HandleLoginSubmit}>
        <h3 className='pb-6 text-2xl text-center text-white'>Login</h3>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            id='user_name'
            placeholder='Username'
            className='p-2 rounded-lg bg-gray-700 text-white'
            onChange={(e) => setUsername(e.target.value)}/>
          <input
            type='password'
            id='user_password'
            placeholder='Password'
            className='p-2 rounded-lg bg-gray-700 text-white'
            onChange={(e) => setPassword(e.target.value)}/>
          {error && <div className='text-red-500'>{error}</div>}
          <button type='submit' className='bg-blue-500 text-white rounded-lg p-2'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}