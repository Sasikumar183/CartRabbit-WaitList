import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from '../images/background.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await axios.post('http://localhost:3000/login', { email, password });
      console.log(result); 
      
      if (result.data.status === "Success") {
        navigate('/home', { state: { user: result.data.user } });
      } else {
        setError(result.data.status || "Login failed");
      }
    } catch (err) {
      console.error("Error during login request:", err);
      
      if (err.response) {
        setError(err.response.data.message || "An error occurred. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
      <div className="p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%]">
        <h1 className='text-3xl text-center font-semibold'>Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <label htmlFor="email" className='font-semibold'>Email</label><br />
          <input type="email" name='email' placeholder='Enter your email' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setEmail(e.target.value)} required /><br />
          <label htmlFor="password" className='font-semibold'>Password</label><br />
          <input type="password" name='password' placeholder='Enter your password' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setPassword(e.target.value)} required /><br />
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <p className='text-center'>Don't have an account? <Link to='/signup' className='font-semibold hover:underline'>Signup</Link></p>
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-gray-700" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
