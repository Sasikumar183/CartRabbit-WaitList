import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../images/background.jpg';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin', { email, password })
      .then(res => {
        if (res.data.status === 'Success') {
          navigate('/adminhome', { state: { users: res.data.users } }); // Updated to `res.data.users`
        } else {
          setError(res.data.status || "Login failed");
        }
      })
      .catch(err => {
        console.error('Error during login request:', err);
        setError('Login failed');
      });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
      <div className="p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%]">
        <h1 className='text-3xl text-center font-semibold'>Admin Login</h1>
        <form onSubmit={handle} className="space-y-4">
          <label htmlFor="email" className='font-semibold'>Email</label><br />
          <input
            type="email"
            name='email'
            placeholder='Enter your email'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <label htmlFor="password" className='font-semibold'>Password</label><br />
          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-gray-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
