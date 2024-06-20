import { useState } from 'react';
import axios from 'axios';

export default function ProductsForm() {
  const [product_name, setProductName] = useState('');
  const [product_price, setProductPrice] = useState('');
  const [product_category, setProductCategory] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/product/', {
        product_name,
        product_price,
        product_category,
      });

      setProductName('');
      setProductPrice('');
      setProductCategory('');

      console.log(response.data);
      console.log(`${new Date().toString()}: Data sent to server.`);

    } catch (err) {
      setError('Error sending data to server. Please try again.');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className='mx-auto border-2 p-9 md:p-12 w-72 md:w-96 rounded-3xl bg-gray-800 border-gray-800 mt-36 h-84'
        onSubmit={submitHandler}>
        <h3 className='pb-6 text-2xl text-center text-white'>
          New Product
        </h3>
        {error && <p className='text-red-500'>{error}</p>}
        <label className='block mb-1 text-xl text-white' htmlFor='product_name'>
          Name
        </label>
        <input
          className='w-full h-8 p-1 mb-6 focus:outline-none'
          type='text'
          id='product_name'
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}/>
        <label className='block mb-1 text-xl text-white' htmlFor='product_price'>
          Value
        </label>
        <input
          className='w-full h-8 p-1 mb-6 focus:outline-none'
          type='number'
          id='product_price'
          value={product_price}
          onChange={(e) => setProductPrice(e.target.value)}/>
        <label className='block mb-1 text-xl text-white' htmlFor='product_category'>
          Category
        </label>  
        <input
          className='w-full h-8 p-1 mb-6 focus:outline-none'
          type='text'
          id='product_category'
          value={product_category}
          onChange={(e) => setProductCategory(e.target.value)}/>
        <div className='float-right'>
          <button
            className='px-3 py-1 rounded bg-gray-600 text-white'
            type='submit'
            disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}