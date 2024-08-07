import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from '../images/background.jpg';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/adminadd', { name, email, password })
      .then(res => {
        if (res.data.status === 'Success') {
          navigate('/adminhome', { state: { users: res.data.users } });
        } else {
          setError('Failed to create user');
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred while creating the user. Please try again.');
      });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
      <div className="p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%]">
        <h1 className='text-3xl text-center font-semibold'>Create User</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className='font-semibold'>Email</label><br />
          <input
            type="email"
            id="email"
            placeholder='Enter your email'
            name='email'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <label htmlFor="name" className='font-semibold'>Name</label><br />
          <input
            type="text"
            id="name"
            name='name'
            placeholder='Enter your name'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          <label htmlFor="password" className='font-semibold'>Password</label><br />
          <input
            type="password"
            id="password"
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
